const gulp = require('gulp');
const del = require('del');
const sequence = require('run-sequence');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const stylus = require('gulp-stylus');
const clean = require('gulp-clean-css');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const {compiler, toCDN} = require('reveal-markdown-compiler');
const PATH_REG = /\.\/node_modules\/([\w.\-]+)\//g;
const DOC = 'docs/';

gulp.task('clear', () => {
  return del(`${DOC}*`);
});

gulp.task('js', () => {
  return gulp.src('app/main.js')
    .pipe(webpackStream(require('./webpack.config.prod'), webpack))
    .pipe(replace(PATH_REG, toCDN))
    .pipe(uglify())
    .pipe(gulp.dest(`${DOC}js/`))
});

gulp.task('stylus', () => {
  return gulp.src('styl/screen.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(clean({
      level: 2
    }))
    .pipe(gulp.dest(`${DOC}css/`));
});

gulp.task('copy', () => {
  return gulp.src('img/**')
    .pipe(gulp.dest(`${DOC}img/`));
});

gulp.task('html', () => {
  return compiler('index.dev.html', 'content.md', `${DOC}index.html`);
});

gulp.task('default', taskDone => {
  sequence(
    'clear',
    ['html', 'stylus', 'js', 'copy'],
    taskDone
  );
});