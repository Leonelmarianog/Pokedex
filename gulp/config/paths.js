const publicRoot = './docs';

const cssOutputFolder = `${publicRoot}/css`;
const jsOutputFolder = `${publicRoot}/js`;
const imgOutputFolder = `${publicRoot}/img`;

const htmlInputFile = './index.html';

const jsInputFile = `./src/js/index.js`;
const jsOutputFiles = `${jsOutputFolder}/*.js`;

const sassInputFiles = './src/sass/**/*.scss';
const cssOutputFiles = `${cssOutputFolder}/*.css`;
const cssAndSassOutputFiles = [`${cssOutputFolder}/*`];

const imgInputFiles = ['./src/img/*.jpg', './src/img/*.png'];
const imgOutputFiles = [`${imgOutputFolder}/*.jpg`, `${imgOutputFolder}/*.png`];

const paths = {
  publicRoot,
  cssOutputFolder,
  jsOutputFolder,
  imgOutputFolder,
  htmlInputFile,
  jsInputFile,
  jsOutputFiles,
  sassInputFiles,
  cssOutputFiles,
  cssAndSassOutputFiles,
  imgInputFiles,
  imgOutputFiles,
};

module.exports = paths;
