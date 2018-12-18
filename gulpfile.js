const gulp = require('gulp');
// const {exec} = require('child_process');
const nodemon = require('gulp-nodemon');

const watchedFiles = [
  'server/**/*.js',
  '.env'
];

const watch = () => {
  return gulp.watch(watchedFiles, startServer);
};

const startServer = () => {
  return nodemon({
    script: 'server/server.js',
    // Use watch instead of ignore: ignore: ['src/*']
    // Only watch server side code change
    // .env could also be watched via this option
    // https://github.com/JacksonGariety/gulp-nodemon/issues/24#issuecomment-42739389
    watch: [
      'server/**',
      '.env'
    ]
  });
};

const watchAndStart = gulp.parallel(watch, startServer);

module.exports = {
  watchAndStart,
  startServer
};
