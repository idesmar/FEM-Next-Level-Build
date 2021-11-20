'use strict'

// require statement tells node to look into node_modules for gulp package
const { src, dest, series, parallel } = require('gulp')
const rename = require('gulp-rename')

// requires both gulp-sass and sass installed
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')

// function to get from src [app], output compressed style (minified css) and log error
// function format (es5) and arrow function format (es6) both works
// using synchronous rendering as advised in docs [https://www.npmjs.com/package/gulp-sass]
const _css = () => {
	return src('app/sass/*.scss')
	.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(autoprefixer({ cascade: false }))
		.pipe(rename({ extname: '.min.css' }))
		.pipe(dest('dist/css')) // if subfolder css does not exist. gulp creates one
}
// exports allow you tu run gulp _css [public task]
exports._css = _css

const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const _js = () => {
	return src('app/js/*.js')
		.pipe(concat('all.js'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(dest('dist/js'))
}
exports._js = _js

const del = require('del')
const clean = (cb) => {
	return del(['./dist/*']) // delete dist contents only (use ./dist/ for entire folder)
	cb() // required since del is NOT a gulp plugin
}
exports.clean = clean

const image = require('gulp-image')
const _images = () => {
	return src('./app/images/*')
		.pipe(image())
		.pipe(dest('./dist/images/'))
}
exports._images = _images

const htmlmin = require('gulp-htmlmin')
const _html = () => {
	return src('./app/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(dest('dist/'))
}
exports._html = _html

exports.build = series(clean, _html, _images, parallel(_css, _js))