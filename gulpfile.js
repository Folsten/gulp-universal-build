'use strict'

const GulpClient = require('gulp');
const { series, parallel, src, dest, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const minify = require('gulp-minify');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');

function scssCompiler() {
  return src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(dest('build/css'))
    .pipe(dest('src/css'))
    .pipe(browserSync.stream())
    // .pipe(cb())
}

function jsCompiler() {
  return src('src/js/**/*.js')
    .pipe(minify())
    .pipe(dest('build/js'))
    // .pipe(cb())
}

function imgCompiler() {
  return src('src/img/**/*')
  .pipe(imagemin())
  .pipe(dest('build/img'))
  // .pipe(cb())
}

function devServer() {
  browserSync.init({server: './src'})
  watch('src/scss/**/*.scss', scssCompiler)
  watch('src/*.html').on('change', browserSync.reload)
  watch('src/js/**/*.js').on('change', browserSync.reload)
}


exports.build = series(devServer)