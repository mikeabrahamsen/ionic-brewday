module.exports = function(config) {
    config.set({

        basePath: '',

        frameworks: ['browserify', 'jasmine'],

        files: [
          'node_modules/zone.js/dist/zone.js',
          'node_modules/zone.js/dist/long-stack-trace-zone.js',
          'node_modules/zone.js/dist/jasmine-patch.js',
          'node_modules/reflect-metadata/Reflect.js',
          'app/**/*.js',


          { pattern: 'node_modules/angular2/**/*.js', included: false, watched: false },
          { pattern: 'node_modules/ionic-angular/**/*.js', included: false, watched: false },
          { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
          //{ pattern: 'www/build/**/*.js', included: false, watched: true },
        ],
        // list of files to exclude
        exclude: [
        'node_modules/angular2/**/*_spec.js',
        'node_modules/ionic-angular/**/*spec*',
        'node_modules/ionic-angular/decorators/app.js',
        'www/build/**/*.js'
        ],

        // proxied base paths
        proxies: {
            // required for component assests fetched by Angular's compiler
            '/src/': '/base/src/'
        },

        port: 9876,

        logLevel: config.LOG_INFO,

        colors: true,

        autoWatch: true,

        browsers: ['PhantomJS'],

        // Karma plugins loaded
        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-phantomjs-launcher',
            'karma-browserify',
            'karma-notify-reporter'
        ],

        // Coverage reporter generates the coverage
        reporters: ['progress', 'coverage', 'notify'],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
          'app/**/*.js': ['browserify'],
          'app/**/!(*.spec|*.stub).js': 'coverage',
        },
        browserify: {
            transform: [
              ['babelify', {
                plugins: ['transform-decorators-legacy'],
                presets: ['babel-preset-es2015']} ]
            ]
        },

        coverageReporter: {
            reporters:[
                {type: 'json', subdir: '.', file: 'coverage-final.json'}
            ]
        },
        notifyReporter: {
          reportEachFailure: true, // Default: false, Will notify on every failed sepc
          reportSuccess: true, // Default: true, Will notify when a suite was successful
        },

        singleRun: true
    })
};
