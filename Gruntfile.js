'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);

    grunt.initConfig({

        mochaTest: {
            all: {
                options: {reporter: 'spec'},
                src: ['test/spec.js']
            }
        }

    });

    // Load all grunt tasks matching the `grunt-*` pattern.
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('default', ['test']);
};