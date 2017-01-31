module.exports = function (grunt) {
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: [
          {
            "expand": true,
            "cwd": "src/",
            "src": ["**/*.js"],
            "dest": "dist/",
            "ext": ".js"
          }
        ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-babel');
  grunt.registerTask('default',['babel']); 
};
