'use strict'

const { series, parallel, src, dest, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

function scssCompiler() {
  return src('src/scss/**/*.{scss,sass,css}')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(postcss())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(dest('src/css'))
    .pipe(dest('build/css'))
    .pipe(browserSync.stream())
}

function jsCompiler() {
  return src('src/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(minify({
      ext: {
        min: '.js'
      },
      noSource: true
    }))
    .pipe(dest('build/js'))
}

function imgCompiler() {
  return src('src/img/**/*.{png,jpg,jpeg,gif,svg,webp}')
    .pipe(imagemin())
    .pipe(dest('build/img'))
}

function fontsCompiler() {
  return src('src/fonts/**/*.{woff,woff2,ttf,otf,eot}')
    .pipe(dest('build/fonts'))
}

// Never change directory to your source files (src directory)
function cleanFiles() {
  return src('build/*', { read: false })
    .pipe(clean())
}

function makeCssEmpty() {
  return src('src/css/**/*', {read: false})
    .pipe(clean())
}

function devServer() {
  browserSync.init({ server: './src' })
  watch('src/scss/**/*.scss', scssCompiler)
  watch('src/*.html').on('change', browserSync.reload)
  watch('src/js/**/*.js').on('change', browserSync.reload)
}

exports.clean = series(cleanFiles, makeCssEmpty)
exports.dev = series(devServer)
exports.build = series(cleanFiles, makeCssEmpty, scssCompiler, jsCompiler, imgCompiler, fontsCompiler)