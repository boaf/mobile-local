var LIVERELOAD_PORT = 35729,
    lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT}),
    mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        watch: {
            options: {
                nospawn: true
            },
            compass: {
                files: [ 'dev/assets/sass/*.scss' ],
                tasks: [ 'compass:server' ]
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'dev/index.html',
                    'dev/assets/css/*.css',
                    'dev/assets/js/*.js',
                    'dev/assets/img/{,*/}*.{gif,png,jpg,jpeg,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 8080,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, 'dev')
                        ];
                    }
                }
            }
        },
        jasmine: {
            mobileLocal: {
                src: 'dev/assets/js/*.js',
                options: {
                    specs: 'test/spec/*Spec.js'
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        compass: {
            /*options: {
                sassDir: 'dev/assets/sass',
                cssDir: 'dev/assets/css',
                generatedImagesDir: '.tmp/img/generated',
                imagesDir: 'dev/img',
                javascriptsDir: 'dev/js',
                fontsDir: 'dev/assets/fonts',
                httpImagesPath: '/img',
                httpGeneratedImagesPath: '/img/generated',
                relativeAssets: false
            },*/
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        }
    });

    grunt.registerTask('server', [
        'compass:server',
        'connect:livereload',
        'open',
        'watch'
    ]);

};
