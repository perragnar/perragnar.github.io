const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const shell = require('gulp-shell');
const fs = require('fs');
const exif = require('gulp-exif');
const slug = require('slug');
const recursiveReadSync = require('recursive-readdir-sync');
const exifPrsr = require('exif-parser');
const resize = require('gulp-image-resize');
const imgsize = require('image-size');
const yaml = require('js-yaml');
const plumber = require('gulp-plumber');
const del = require('del');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const merge = require('merge-stream');

const slugOptions = {
    lower: true
};

/**
 * Handles content files such as html, markdown and text files
 */
function content() {
    // HTML
    const html = gulp.src('./src/**/*.{htm,html}')
        .pipe(plumber())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
        }))
        .pipe(gulp.dest('./_site/'));

    // Other
    const misc = gulp.src('./src/**/*.{md,markdown,txt,json}')
        .pipe(plumber())
        .pipe(gulp.dest('./_site/'));

    return merge(html, misc);
}

/**
 * Handles javascript files
 */
function javascript() {
    // Building vendors file
    const vendorJs = gulp.src('./src/assets/js/vendor/**/*.js')
        .pipe(plumber())
        .pipe(concat('vendor.js'))
        .on('error', function (err) {
            console.log(err.toString());
        })
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(gulp.dest('./_site/assets/js/'));

    // Building app file
    const appJs = gulp.src('./src/assets/js/app/**/*.js')
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .on('error', function (err) {
            console.log(err.toString());
        })
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(gulp.dest('./_site/assets/js/'));

    return merge(vendorJs, appJs);
}

/**
 * Handles Sass files and compiles them to CSS
 */
function css() {
    return gulp.src('./src/assets/scss/**/*.scss')
        .pipe(plumber({
            errorHandler(err) {
                this.emit('end');
            },
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: true,
        }))
        .pipe(sourcemaps.write())
        .pipe(concatCss('bundle.css'))
        .pipe(gulp.dest('./src/assets/css/'))
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(gulp.dest('./_site/assets/css/'))
        .pipe(browsersync.stream());
}

/**
 * Fonts
 */
function fonts(done) {
    return gulp.src('./src/assets/fonts/**/*.*')
        .pipe(gulp.dest('./_site/assets/fonts/'));
}

/**
 * Handles images
 */
function images() {
    return gulp.src('./src/assets/img/**/*.{jpg,jpeg,gif,png,svg}')
        .pipe(plumber())
        .pipe(imagemin([imagemin.jpegtran({
            progressive: true
        })]))
        .pipe(gulp.dest('./_site/assets/img/'));
}

/**
 * Browser sync browser(s) reloading
 */
function browsersyncReload(done) {
    browsersync.reload();
    done();
}

/**
 * Gulp watch
 * Watching for file changes
 */
function siteWatch() {
    gulp.watch('./src/assets/scss/**/*.scss', css);
    gulp.watch('./src/assets/js/**/*.js', javascript);
    gulp.watch('./src/assets/img/**/*.{jpg,jpeg,gif,png,svg}', images);
    gulp.watch('./src/**/*.{htm,html,md,markdown,txt}', content);
}

/**
 * Gulp serve
 * Watching for file changes and running browser sync
 */
function siteServe() {
    browsersync.init({
        notify: false,
        port: 3000,
        directory: false,
        server: {
            baseDir: './_site/'
        },
    });

    gulp.watch('./src/assets/scss/**/*.scss', gulp.series(css, browsersyncReload));
    gulp.watch('./src/assets/js/**/*.js', gulp.series(javascript, browsersyncReload));
    gulp.watch('./src/assets/img/**/*.{jpg,jpeg,gif,png,svg}', gulp.series(images, browsersyncReload));
    gulp.watch('./src/**/*.{htm,html,md,markdown,txt}', gulp.series(content, browsersyncReload));
}

/**
 * Cleanup
 * Deletes the _site folder
 */
function cleanup() {
    return del(['./_site/', './src/assets/css/']);
}

/**
 * Deletes all photos in inbox
 */
function clearInbox() {
    return del(['./assets/photos/inbox/**/*']);
}

/**
 * Removing .DS_Store files
 */
function prepareInbox() {
    return shell.task(['find . -name .DS_Store -type f -delete']);
}

/**
 * Building photo gallery from the files in the inbox
 */
function handleInbox() {
    return gulp.src('./assets/photos/inbox/**/*.{jpg,jpeg}', {
            nocase: true
        })

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
        .pipe(resize({
            width: 1500
        }))
        .pipe(imagemin([imagemin.jpegtran({
            progressive: true
        })]))
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
};

/**
 * Scanning all original photos and creating data files
 */
function walkPhotos(path, index) {
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
            if (fs.statSync(photo).isDirectory()) {
                continue;
            }

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
        if (!index.hasOwnProperty(album)) {
            continue;
        }
        index[album].contents = index[album].contents.sort((a, b) => {
            if (a.date < b.date) {
                return -1;
            }
            if (a.date > b.date) {
                return 1;
            }
            return 0;
        });

        // Writing each gallery data file
        fs.writeFileSync('./_data/galleries/' + album + '.yml', yaml.safeDump(index[album]));

        // Creating blog posts for each album
        let postContent = [];
        postContent.push('---');
        postContent.push('title: ' + index[album].title);
        postContent.push('date: ' + index[album].date);
        postContent.push('layout: post');
        postContent.push('categories:');
        postContent.push('  - Foto');
        postContent.push('tags:');
        postContent.push('  - Tag');
        postContent.push('galleries:');
        postContent.push('  - ' + album);
        postContent.push('---');
        postContent.push('');

        fs.writeFileSync('./_posts/' + album + '.markdown', postContent.join('\n'));
    }

    return true;
};

/**
 * Building gallery index
 */
function buildGalleryIndex(done) {
    let index = {};
    const generatedIndex = {};

    walkPhotos('./assets/photos/inbox/', generatedIndex);

    done();
};

/**
 * Adds a sub folder to the path object
 */
function createImgPath(path) {
    path.dirname = slug(path.dirname.split('/').pop(), slugOptions);
    path.basename = slug(path.basename, slugOptions);
    path.extname = path.extname.toLowerCase();

    return path;
}

const build = gulp.series(cleanup, gulp.parallel(content, javascript, css, images, fonts));
const watch = gulp.series(build, siteWatch);
const serve = gulp.series(build, siteServe);
const inbox = gulp.series(buildGalleryIndex, handleInbox);

exports.css = css;
exports.content = content;
exports.javascript = javascript;
exports.images = images;
exports.fonts = fonts;
exports.watch = watch;
exports.serve = serve;
exports.build = build;
exports.cleanup = cleanup;
exports.prepareInbox = prepareInbox;
exports.handleInbox = handleInbox;
exports.buildGalleryIndex = buildGalleryIndex;
exports.inbox = inbox;
exports.clearInbox = clearInbox;
exports.default = build;
