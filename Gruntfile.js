module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        wiredep: {

            task: {

                // Point to the files that should be updated when
                // you run `grunt wiredep`
                src: [
                    'src/index.html'
                ],

                options: {
                    // See wiredep's configuration documentation for the options
                    // you may pass:

                    // https://github.com/taptapship/wiredep#configuration

                }
            }
        },

        injector: {
            options: {},
            local_dependencies: {
                files: {
                    'src/index.html': ['src/js/**/*.js', 'src/**/*.css']
                }
            }
        },

        watch: {
            scripts: {
                files: 'src/js/**/*.js',
                tasks: ['injector'],
                options: {
                    interrupt: true
                }
            }
        },

        less: {
            development: {
                options: {
                },
                files: {
                    "src/style/style.css": "src/style/main.less"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['wiredep', 'injector', 'watch']);
    grunt.registerTask('build', ['wiredep', 'injector']);

};


