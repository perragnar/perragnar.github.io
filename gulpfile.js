const gulp = require('gulp');
const shell = require('gulp-shell');
const del = require('del');
const slug = require('slug');
const exif = require('gulp-exif');
const exifPrsr = require('exif-parser');
const fs = require('fs');
const recursiveReadSync = require('recursive-readdir-sync');
const merge = require('deepmerge');
const imgsize = require('image-size');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const resize = require('gulp-image-resize');
const yaml = require('js-yaml');
const browserSync = require('browser-sync').create();

const slugOptions = {
    lower: true
};

// Task for building blog when something changed:
gulp.task('build', shell.task(['bundle exec jekyll build --watch --drafts']));

// Cleaning up
gulp.task('cleanup', () => {
    return del(['./_site/']);
});

// Building photo gallery from the files in the inbox
gulp.task('handleInbox', () => {
    return gulp.src('./assets/photos/inbox/**/*.jpg', { nocase: true })
        // Reading photo data
        .pipe(exif())

        // Originial size
        // .pipe(rename((path) => {
        //     createImgPath(path);
        // }))
        // .pipe(imagemin([imagemin.jpegtran({ progressive: true })]))
        // .pipe(gulp.dest('./assets/photos/galleries/original/'))

        // Large size
        .pipe(rename((path) => {
            createImgPath(path);
        }))
        .pipe(resize({ width: 1500 }))
        .pipe(imagemin([imagemin.jpegtran({ progressive: true })]))
        .pipe(gulp.dest('./assets/photos/galleries/'))

        // Medium size
        // .pipe(rename((path) => {
        //     createImgPath(path);
        // }))
        // .pipe(resize({ width: 800 }))
        // .pipe(imagemin([imagemin.jpegtran({ progressive: true })]))
        // .pipe(gulp.dest('./assets/photos/galleries/medium/'))

        // Thumb
        // .pipe(rename((path) => {
        //     createImgPath(path);
        // }))
        // .pipe(resize({ width: 600, height: 600, crop: true, upscale: true }))
        // .pipe(imagemin([imagemin.jpegtran({ progressive: true })]))
        // .pipe(gulp.dest('./assets/photos/galleries/thumbs/'))
        
        ;
});

// Clearing the inbox
gulp.task('clearInbox', () => {
    // Cleaning up the inbox
    // return del(['./assets/photos/inbox/**/*']);
});

// Scanning all original photos and creating data files
const walkPhotos = (path, index) => {
    const directory = fs.readdirSync(path);

    // Directory is going to be an array of album directories
    for (var i = 0; i < directory.length; i++) {
        // This is the directory name from Lightroom ('2015-12-31 New Years Eve' style)
        const album = directory[i];

        // This is the directory shortname Gulp is using for image output.
        const dirname = slug(album, slugOptions);

        // This will be the image contents and any subdirectories
        const photos = recursiveReadSync(path + '/' + album);

        const contains = [];

        for (var j = 0; j < photos.length; j++) {
            // recursiveReadSync returns the path relative to the CWD, not just the name
            // like fs.readdirSync so this will be /source/Photography/.../whatever.img
            const photo = photos[j];

            // So split on / and take the last component for the filename.
            let file = photo.split('/').pop();
            const filePath = file.split('.');
            file = slug(filePath[0], slugOptions) + '.' + filePath[1];

            // Original images are sometimes in subdirectories by day or activity, which
            // is why we recused the whole thing. Don't try to get stats on a directory,
            // just skip it.
            if (fs.statSync(photo).isDirectory()) { continue; }

            const dimensions = imgsize(photo);

            const photoBuffer = fs.readFileSync(photo);
            const exifParser = exifPrsr.create(photoBuffer);
            const exifResult = exifParser.parse();

            contains.push({
                filename: file,
                width: dimensions.width || null,
                height: dimensions.height || null,
                // The D7000 writes 'NIKON CORPORATION / NIKON D7000' across these fields.
                // The X-E1 writes 'FUJIFILM / XE-1'. So we do this stupid thing to normalize
                // as 'Make Model' which is what they should be in the first place...
                camera: [(exifResult.tags.Make.split(' ')[0] || null), (exifResult.tags.Model.split(' ').pop()) || null].join(' '),
                lens: exifResult.tags.LensModel || null,
                focal: exifResult.tags.FocalLength || null,
                aperture: exifResult.tags.FNumber || null,
                // EXIF shutter speed is written in decimal seconds, which isn't how that is
                // actually written. For times over 1 second, write as is with an "s" to signify
                // full seconds. Otherwise, turn it into a fraction 1/x which is what people
                // will be used to seeing. Yay math.
                shutter: (exifResult.tags.ExposureTime > 1 ? (exifResult.tags.ExposureTime + 's') : ('1/' + (1 / exifResult.tags.ExposureTime))) || null,
                iso: exifResult.tags.ISO || null,
                date: exifResult.tags.DateTimeOriginal || null
            });
        }

        index[dirname] = {
            title: album.replace(/.+? /, ''),
            date: album.split(/ /, 1)[0],
            contents: contains
        };
    }

    // Now sort all photos in each album by the date of the exposure instead
    // of the name. We do this here because:
    // - The existing index file (which has custom data) is already sorted
    // - Sorted albums are arrays, not objects. So if the order here doesn't
    //   match what's in the generated file, custom attributes will be applied
    //   to the wrong image when merging (because arrays are indexed, not keyed).
    //   ^^ @TODO: That'll fix most of the issue, but inserting/deleting within
    //      an existing album will still cause attributes to shift. :(
    for (var album in index) {
        if (!index.hasOwnProperty(album)) { continue; }
        index[album].contents = index[album].contents.sort((a, b) => {
            if (a.date < b.date) { return -1; }
            if (a.date > b.date) { return 1; }
            return 0;
        });

        // Writing each gallery data file
        fs.writeFileSync('./_data/galleries/' + album + '.yml', yaml.safeDump(index[album]));
    }

    return true;
};

gulp.task('buildGalleryIndex', (done) => {
    let index = {};
    const generatedIndex = {};
    
    walkPhotos('./assets/photos/inbox/', generatedIndex);

    done();
});

/**
 * Adds a sub folder to the path object
 * 
 * @param {obj} path
 * @param {string} target
 */
function createImgPath(path) {
    path.dirname = slug(path.dirname.split('/').pop(), slugOptions);
    path.basename = slug(path.basename, slugOptions);
    path.extname = path.extname.toLowerCase();

    return path;
}

// Processing the inbox photos, then deletes them
gulp.task('inbox', ['buildGalleryIndex', 'handleInbox', 'clearInbox']);

// Task for serving blog with Browsersync
gulp.task('serve', function () {
    browserSync.init({ server: { baseDir: '_site/' }, notify: false });
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['build', 'serve']);
