import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import prompt from 'prompt';
import slugify from 'slugify';

const createMarkdownFile = async (data) => {
  try {
    // Get blog post template.
    let markdownContent = readFileSync('newpost/post-template.md', 'utf-8');
    markdownContent = markdownContent.split('\n');

    const blogPostData = {
      title: data.title || '',
      date: data.dateString || '',
      slug: data.slug || '',
      path: data.path || '',
      showGallery: data.showGallery || 'false',
      heroImage: data.heroImage || '',
      thumbnail: data.thumbnail || '',
      categories: data.categories || '',
      tags: data.tags || '',
      description: data.description || '',
    };

    const targetFolder = 'src/routes/blog/_content';
    const staticContentFolder = 'static/content';

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

    // Creating year and month sub folders if they doesn't exists.
    // Creating the year sub folder.
    if (!existsSync(`${targetFolder}/${data.year}`)) {
      mkdirSync(`${targetFolder}/${data.year}`);
    }

    // Creating the month sub folder.
    if (!existsSync(`${targetFolder}/${data.year}/${data.month}`)) {
      mkdirSync(`${targetFolder}/${data.year}/${data.month}`);
    }

    // Creating the slug folder.
    if (!existsSync(`${targetFolder}/${data.year}/${data.month}/${data.slug}`)) {
      mkdirSync(`${targetFolder}/${data.year}/${data.month}/${data.slug}`);
    }

    // Creating the markdown blog post file.
    let markdownFile = `${targetFolder}/${data.year}/${data.month}/${data.slug}/index.md`;

    // If index.md exists, add index number.
    if (existsSync(markdownFile)) {
      let i = 1;
      while (existsSync(markdownFile)) {
        i += 1;
        markdownFile = `${targetFolder}/${data.year}/${data.month}/${data.slug}/index-${i}.md`;
      }
    }

    console.log(`Blog post created: "${markdownFile}"`);

    // Add static/content folder if selected.
    if (data.addStaticFolder) {
      // Creating year and month sub folders if they doesn't exists.
      // Creating the year sub folder.
      if (!existsSync(`${staticContentFolder}/${data.year}`)) {
        mkdirSync(`${staticContentFolder}/${data.year}`);
      }

      // Creating the month sub folder.
      if (!existsSync(`${staticContentFolder}/${data.year}/${data.month}`)) {
        mkdirSync(`${staticContentFolder}/${data.year}/${data.month}`);
      }

      // Creating the slug folder.
      if (!existsSync(`${staticContentFolder}/${data.year}/${data.month}/${data.slug}`)) {
        mkdirSync(`${staticContentFolder}/${data.year}/${data.month}/${data.slug}`);
      }

      // Creating the image folder.
      if (!existsSync(`${staticContentFolder}/${data.year}/${data.month}/${data.slug}/images`)) {
        mkdirSync(`${staticContentFolder}/${data.year}/${data.month}/${data.slug}/images`);
      }

      console.log(`Content folder created: "${`${staticContentFolder}/${data.year}/${data.month}/${data.slug}`}"`);
    }

    writeFileSync(markdownFile, markdownContent.join('\n'));
  } catch (err) {
    console.error(`Error: Markdown file could not be created. Maybe the post already exists?`);
    // console.error(err);
  }
};

// Current date, year and month.
const date = new Date();
// const dateString = date.toISOString().slice(0, 10);
const currentYYYY = date.getFullYear();
let currentMM = date.getMonth() + 1;
currentMM = String('0' + currentMM).slice(-2);
let currentDD = date.getDate();
currentDD = String('0' + currentDD).slice(-2);

prompt.start();

const schema = {
  properties: {
    title: {
      default: 'Min bloggpost',
      required: true,
    },
    year: {
      description: `Year (${currentYYYY})`,
      pattern: /^\d{4}$/,
      message: 'YYYY',
      default: currentYYYY,
      required: true,
    },
    month: {
      pattern: /^\d{2}$/,
      message: 'MM',
      default: currentMM,
      required: true,
    },
    date: {
      pattern: /^\d{2}$/,
      message: 'DD',
      default: currentDD,
      required: true,
    },
    slug: {
      required: true,
      default: function () {
        return slugify(prompt.history('title').value, {
          lower: true,
          strict: true,
        });
      },
    },
    categories: {
      description: 'Add a category as string or multiple categories as an array',
      required: false,
      default: 'Fotografering',
    },
    tags: {
      description: 'Add a tag as string or multiple tags as an array',
      required: false,
      default: '[]',
    },
    addStaticFolder: {
      description: 'Add a static content folder for blog files?',
      type: 'boolean',
      message: 't/f (true or false)',
      required: true,
      default: 'f',
    },
  },
};

prompt.get(schema, (err, result) => {
  // Datestring.
  result['dateString'] = `${result.year}-${result.month}-${result.date}`;

  // Content path.
  result['path'] = `/content/${currentYYYY}/${currentMM}/${result.slug}`;

  // Create the markdown file.
  createMarkdownFile(result);
});
