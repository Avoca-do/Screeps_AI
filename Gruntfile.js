module.exports = function(grunt) {

    //grunt.loadNpmTasks('grunt-screeps')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')

    grunt.initConfig({
        screeps: {
            dist: {
                src: ['*.js']
            }
        },

        test: {
            log: function(){
                console.log('test s');
            },
        },
        // Remove all files from the dist folder.
        clean: {
            options: {
                force: true
            },
          'dist': ['../sBot1']
        },

        // Copy all source files into the dist folder, flattening the folder structure by converting path delimiters to underscores
        copy: {
          // Pushes the game code to the dist folder so it can be modified before being send to the screeps server.
          screeps: {
            files: [{
              expand: true,
              cwd: 'src/',
              src: '**',
              dest: '../sBot1/',
              filter: 'isFile',
              rename: function (dest, src) {
                // Change the path name utilize underscores for folders
                let path = dest + src.replace(/\//g,'.');
                console.log(path);
                return path;
              }
            }],
          }
        },
    })

    grunt.registerTask('default',  ['copy:screeps']);
    grunt.registerTask('build', ['clean', 'copy:screeps'])
}