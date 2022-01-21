import { readdirSync, promises, existsSync, mkdirSync, rmdir, rmdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { lookup } from 'mime-types';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';
import sharp from 'sharp';
import pkg from 'exifreader';

const { load } = pkg;

// The source folder to check for content.
const sourceFolder = './blog-posts/inbox';
const targetFolder = '../src/routes/blog/_content';
const targetFolderImages = '../static/content';
const targetFolderImagesAbsolute = '/content';
const archiveFolder = './blog-posts/archive';
const failedFolder = './blog-posts/failed';

// The image format.
const imageFormat = 'webp';
const imageFormatExtension = 'webp';

// If the imported should be archived in archiveFolder.
const archiveImports = false;

// If the import should try to read date from import folder name.
// The folder name must be the date and the title, e.g.
// 20210707 My blog post.
const readImportFolderDate = true;

// Let's get todays date.
const now = new Date();

// Slugify configs.
const slugifyFolderConfig = {
  lower: true,
  strict: true,
};
const slugifyFileConfig = {
  lower: true,
};

console.clear();

/**
 * Getting a list of inbox folders.
 */
const getFolders = () =>
  readdirSync(sourceFolder, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

/**
 * Handle the folder content.
 */
const handleFolderContent = async (folder) => {
  try {
    const sourceFiles = await promises.readdir(folder);
    let blogPostFolder;
    let blogPostFolderTitle = folder.split('/').pop();
    const blogPostFiles = {
      images: [],
      markdown: [],
    };
    const acceptedFileTypes = {
      images: ['image/jpeg'],
      markdown: ['text/markdown'],
    };

    // Creates target folder if it doesn't exists.
    if (!existsSync(targetFolder)) {
      mkdirSync(targetFolder);
    }

    // Creating the archive folder if it doesn't exists.
    if (!existsSync(archiveFolder)) {
      mkdirSync(archiveFolder);
    }

    // Creating the failed folder if it doesn't exists.
    if (!existsSync(failedFolder)) {
      mkdirSync(failedFolder);
    }

    for (const file of sourceFiles) {
      const fromPath = join(folder, file);
      const stat = await promises.stat(fromPath);

      if (stat.isFile()) {
        const mimeType = lookup(file);

        // Check if file is an accepted image.
        if (acceptedFileTypes.images.includes(mimeType)) {
          blogPostFiles.images.push(fromPath);
        }

        // Check if file is an accepted file.
        if (acceptedFileTypes.markdown.includes(mimeType)) {
          blogPostFiles.markdown.push(fromPath);
        }
      }
    }

    // If the blog post has the content to be created.
    const blogPostValidated = blogPostFiles.images.length > 0 && blogPostFiles.markdown.length <= 1;

    // Checking if at least images exists in order to make blog post work.
    // If no markdown file exists, one will be created automatically.
    if (blogPostValidated) {
      // Blog post data.
      let blogPostData;

      console.log(`• Importing folder "${blogPostFolderTitle}".`);
      console.log(`\b`);

      // Trying to read the date from import folder name.
      // In order to make this work, the first part (before the first space)
      // of the folder name must be the date.
      if (readImportFolderDate) {
        try {
          blogPostData = await handleImportFolderData(blogPostFolderTitle);

          // Remove the date part of the import folder name.
          blogPostFolderTitle = blogPostFolderTitle.split(' ');
          blogPostFolderTitle.shift();
          blogPostFolderTitle = blogPostFolderTitle.join(' ').trim();
        } catch (err) {
          console.error(`❌ Import folder date could not be read.`);
          console.error(err);
        }
      }

      // Setting the correct blog post folter name.
      blogPostFolder = slugify(blogPostFolderTitle, slugifyFolderConfig);

      if (readImportFolderDate === false || typeof blogPostData !== 'object') {
        blogPostData = {
          date: now.toISOString().slice(0, 10),
          dateParts: {
            y: now.toISOString().slice(0, 4),
            m: now.toISOString().slice(5, 7),
            d: now.toISOString().slice(8, 10),
          },
        };

        console.log(`• Setting the blog post date to: ${blogPostData.date}.`);
      }

      // If the blog post title is empty, let's set the date as title.
      if (!blogPostData.title || blogPostData.title === '') {
        blogPostData.title = blogPostFolderTitle;
        console.log(`• Setting the blog post title to: "${blogPostData.title}".`);
        console.log(`\b`);
      }

      // Creating year and month sub folders if they doesn't exists.
      // Creating the year sub folder.
      if (!existsSync(`${targetFolder}/${blogPostData.dateParts.y}`)) {
        mkdirSync(`${targetFolder}/${blogPostData.dateParts.y}`);
      }

      // Creating the month sub folder.
      if (!existsSync(`${targetFolder}/${blogPostData.dateParts.y}/${blogPostData.dateParts.m}`)) {
        mkdirSync(`${targetFolder}/${blogPostData.dateParts.y}/${blogPostData.dateParts.m}`);
      }

      // The destination folder of the imported blog post.
      let targetBlogPostFolder = `${targetFolder}/${blogPostData.dateParts.y}/${blogPostData.dateParts.m}/${blogPostFolder}`;

      // The destination folder of the imported blog post images.
      let targetBlogPostImagesFolder = `${targetFolderImages}/${blogPostData.dateParts.y}/${blogPostData.dateParts.m}/${blogPostFolder}/images`;

      // Setting the target folder as path in blogPostData.
      blogPostData.path = `${targetFolderImagesAbsolute}/${blogPostData.dateParts.y}/${blogPostData.dateParts.m}/${blogPostFolder}`;

      // Setting the post slug.
      blogPostData.slug = blogPostFolder;

      // Setting the blog post thumbnail.
      // This is the first image in the gallery by default.
      blogPostData.thumbnail = `1-s.${imageFormatExtension}`;

      // Create blog post folder.
      rmdir(targetBlogPostFolder, { recursive: true }, async () => {
        mkdirSync(targetBlogPostFolder);

        // Create blog post image folder.
        if (!existsSync(targetBlogPostImagesFolder)) {
          mkdirSync(targetBlogPostImagesFolder, { recursive: true });
        }

        // The markdown file.
        if (blogPostFiles.markdown.length > 0) {
          // Markdown file exists.
          await promises.copyFile(blogPostFiles.markdown.toString(), `${targetBlogPostFolder}/index.md`);
          console.log(`• Markdown file found: "${blogPostFiles.markdown.toString()}".`);
          console.log(`\b`);
        } else {
          // Let's create a markdown file.
          blogPostData = await createMarkdownFile(targetBlogPostFolder, blogPostData);
        }

        // Images.
        if (blogPostFiles.images.length > 0) {
          await handleImages(blogPostFiles.images, targetBlogPostFolder, targetBlogPostImagesFolder, blogPostData.path);
        } else {
          console.log(`• No images found.`);
          console.log(`\b`);
        }

        // Archive the import folder.
        if (archiveImports) {
          // Creating year and month sub folders if they doesn't exists.
          // Creating the year sub folder.
          if (!existsSync(`${archiveFolder}/${blogPostData.dateParts.y}`)) {
            mkdirSync(`${archiveFolder}/${blogPostData.dateParts.y}`);
          }

          // Creating the month sub folder.
          if (!existsSync(`${archiveFolder}/${blogPostData.dateParts.y}/${blogPostData.dateParts.m}`)) {
            mkdirSync(`${archiveFolder}/${blogPostData.dateParts.y}/${blogPostData.dateParts.m}`);
          }

          const archiveTargetFolder = `${archiveFolder}/${blogPostData.dateParts.y}/${blogPostData.dateParts.m}/${folder
            .split('/')
            .pop()}`;

          // Removing the archive folder if it exists in the archive folder.
          if (existsSync(archiveTargetFolder)) {
            rmdirSync(archiveTargetFolder, { recursive: true });
          }

          await promises.rename(folder, archiveTargetFolder);
          console.log(`• Archived the folder.`);
        } else {
          // Deletes the import folder.
          // rmdirSync(folder, { recursive: true });
          console.log(`• Cleaning up!`);
        }

        console.log(`👍 Blog post created!`);
      });
    } else {
      console.error(`❌ Blog post folder "${blogPostFolder}" insn't valid and can't be created.`);

      // Move the import folder to failed folder.
      const failedTargetFolder = `${failedFolder}/${folder.split('/').pop()}`;
      if (!existsSync(failedTargetFolder)) {
        await promises.rename(folder, failedTargetFolder);
        console.log(`• Moved the import files to the failed folder.`);
      }
    }
  } catch (err) {
    console.error(`❌ Blog post could not be created.`);
    console.error(err);
  }
};

/**
 * Create a new markdown blog post file.
 */
const createMarkdownFile = async (targetBlogPostFolder, blogPostData) => {
  try {
    // Get blog post template.
    let markdownContent = readFileSync('post-template.md', 'utf-8');
    markdownContent = markdownContent.split('\n');

    markdownContent.forEach(async (line, i) => {
      const pattern = /\{(.*?)\}/gm;
      const patternValue = /(?<=\{).+?(?=\})/gm;
      const hasTemplateData = pattern.test(line);

      if (hasTemplateData) {
        const templateDataContent = line.match(patternValue)[0].trim();

        if (blogPostData[templateDataContent]) {
          markdownContent[i] = line.replace(pattern, blogPostData[templateDataContent]);
        }
      }
    });

    // Creating the markdown blog post file.
    writeFileSync(`${targetBlogPostFolder}/index.md`, markdownContent.join('\n'));
    console.log(`• Created the Markdown file.`);
    console.log(`\b`);

    return blogPostData;
  } catch (err) {
    console.error(`❌ Markdown file could not be created.`);
    console.error(err);
  }
};

/**
 * Handle import folder data such as date and title.
 */
const handleImportFolderData = async (blogPostFolderTitle) => {
  let blogPostData;

  // First of all, let's get the folder name first part.
  const importFolderDateTry = blogPostFolderTitle.split(' ').shift().trim();

  // Now, let's check if the string contains the required characters.
  const match = /^\d+(d+)*$/.test(importFolderDateTry);

  console.log(`• Trying to get the date and title from the import folder.`);

  // If the string matches.
  if (match) {
    // Let's see if the string can be converted to a date.
    // The string should be either 6 or 8 characters long to match
    // YYYYMMDD or YYMMDD format.
    if (importFolderDateTry.length >= 6 && importFolderDateTry.length <= 8) {
      let importFolderDate = {
        y: '',
        m: '',
        d: '',
        string: '',
      };
      if (importFolderDateTry.length === 6) {
        importFolderDate.y = `${now.toISOString().slice(0, 2)}${importFolderDateTry.substring(0, 2)}`;
        importFolderDate.m = importFolderDateTry.substring(2, 4);
        importFolderDate.d = importFolderDateTry.substring(4, 6);
        importFolderDate.string = `${importFolderDate.y}-${importFolderDate.m}-${importFolderDate.d}`;
      } else if (importFolderDateTry.length === 8) {
        importFolderDate.y = importFolderDateTry.substring(0, 4);
        importFolderDate.m = importFolderDateTry.substring(4, 6);
        importFolderDate.d = importFolderDateTry.substring(6, 8);
        importFolderDate.string = `${importFolderDate.y}-${importFolderDate.m}-${importFolderDate.d}`;
      }

      if (new Date(importFolderDate.string) !== 'Invalid Date' && !isNaN(new Date(importFolderDate.string))) {
        blogPostData = {
          date: importFolderDate.string,
          dateParts: importFolderDate,
        };

        // Since the date is found and set,
        // let's get the rest of the folder name as the blog post title.
        let blogPostTitle = blogPostFolderTitle.split(' ');
        blogPostTitle.shift();
        blogPostTitle = blogPostTitle.join(' ').trim();
        blogPostData.title = blogPostTitle;

        console.log(`  • Date found: ${blogPostData.date}.`);
        console.log(`  • Title found: ${blogPostData.title}.`);
        console.log(`\b`);
      }
    }
  }

  return blogPostData;
};

/**
 * Resizing, optimizing and moving images.
 * Also add image data to exif file.
 */
const handleImages = async (images, targetBlogPostFolder, targetBlogPostImagesFolder, fullPath) => {
  let imageCounter = 1;

  // The image config.
  const imageSets = [
    // {
    //   type: 'large',
    //   title: 'Large',
    //   prefix: '',
    //   suffix: '-l',
    //   width: 3000,
    //   quality: 90,
    // },
    {
      type: 'medium',
      title: 'Medium',
      prefix: '',
      suffix: '-m',
      width: 1500,
      quality: 80,
    },
    {
      type: 'small',
      title: 'Small',
      prefix: '',
      suffix: '-s',
      width: 900,
      quality: 70,
    },
    {
      type: 'thumbnail',
      title: 'Thumbnail',
      prefix: '',
      suffix: '-t',
      width: 100,
      quality: 30,
    },
  ];

  // An array containing the EXIF data for each image.
  let imagesData = {
    fullPath: fullPath,
    images: [],
  };

  console.log(`• ${images.length} image(s) found.`);

  console.log(images);

  // Handle each image.
  for (const image of images) {
    const fileName = slugify(image.split('/').pop(), slugifyFileConfig);
    let targetFileCounter = `${imageCounter}`;
    const targetPath = `${targetBlogPostImagesFolder}`;

    console.log(`  🏞  "${fileName}"`);

    // The image data.
    let imageData = {};

    // Image ID.
    imageData.id = uuidv4();

    // Image index.
    imageData.index = imageCounter;

    // Create an array to store set images in.
    imageData.files = {};

    // Read the image data (EXIF) and add it to imageData.
    imageData.exif = await getImageData(image);

    // Pushing image data to images.
    imagesData.images.push(imageData);

    // Processing the image for each image set.
    imageSets.forEach(async (set) => {
      const targetFileName = `${set.prefix}${targetFileCounter}${set.suffix}.${imageFormatExtension}`;
      const targetFilePath = `${targetPath}/${targetFileName}`;

      imageData.files[set.type] = targetFileName;

      console.log(`    • Resize and optimize with the set "${set.title}".`);
      console.log(`      • Size: ${set.width}px, quality: ${set.quality}%.`);

      try {
        if (imageFormat === 'jpg') {
          await sharp(image)
            .withMetadata()
            .resize({
              width: set.width,
            })
            .jpeg({
              quality: set.quality,
            })
            .toFile(targetFilePath);
        } else if (imageFormat === 'webp') {
          await sharp(image)
            .withMetadata()
            .resize({
              width: set.width,
            })
            .webp({
              quality: set.quality,
            })
            .toFile(targetFilePath);
        }
      } catch (err) {
        console.error(`❌ Image could not be resized and optimized.`);
        console.error(err);
      }
    });

    console.log(`\b`);

    imageCounter++;
  }

  try {
    // Creating the post-data.json file.
    writeFileSync(`${targetBlogPostFolder}/_post-data.json`, JSON.stringify(imagesData));
    console.log(`• Created the post data file.`);
  } catch (err) {
    console.error(`❌ Post data file could not be created.`);
    console.error(err);
  }

  console.log(`\b`);
};

/**
 * Get image data such as EXIF.
 * @param photoSrc
 */
const getImageData = async (photoSrc) => {
  let imageData;

  await load(photoSrc, { expanded: true })
    .then((res) => {
      // The MakerNote tag can be really large. Remove it to lower
      // memory usage if you're parsing a lot of files and saving the
      // tags.
      if (res['MakerNote']) {
        delete res['MakerNote'];
      }

      // Camera and lens data
      imageData = {
        camera: res.exif.Model ? res.exif.Model.description : null,
        focalLength: res.exif.FocalLength
          ? res.exif.FocalLength.value.length > 1
            ? res.exif.FocalLength.value[0] / res.exif.FocalLength.value[1]
            : res.exif.FocalLength.value
          : null,
        focalLengthEq: res.exif.FocalLengthIn35mmFilm ? res.exif.FocalLengthIn35mmFilm.value : null,
        aperture: res.exif.FNumber ? res.exif.FNumber.description : null,
        exposureTime: res.exif.ExposureTime ? res.exif.ExposureTime.description : null,
        iso: res.exif.ISOSpeedRatings ? res.exif.ISOSpeedRatings.description : null,
        lens: res.exif.LensModel ? res.exif.LensModel.description : null,
        description: res.xmp.description ? res.xmp.description.value : null,
      };
    })
    .catch((err) => {
      console.error(`❌ EXIF data could not be read.`);
      console.error(err);
      imageData = {};
    });

  return imageData;
};

// Do the magic!
(async () => {
  const folders = getFolders();

  try {
    if (folders.length > 0) {
      console.log(`• Starting import of ${folders.length} ${folders.length > 1 ? 'folders' : 'folder'}.`);

      folders.forEach((folder) => {
        handleFolderContent(`${sourceFolder}/${folder}`);
      });
    } else {
      console.log(`• Nothing to import! Move or copy your import folder to the "${sourceFolder}" folder.`);
    }
  } catch (err) {
    console.error(`❌ CRASH!`);
    console.error(err);
  }
})();
