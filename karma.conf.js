var webpackCfg = require('./webpack.test.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    browsers: ['jsdom'],
    files: [
      'test/index.js'
    ],
    port: 8000,
    captureTimeout: 60000,
    browserNoActivityTimeout: 60000,
    frameworks: ['mocha', 'chai'],
    client: {
      mocha: {}
    },
    singleRun: true,
    reporters: ['progress', 'coverage'],
    mochaReporter: {
      showDiff: true,
      divider: '*'
    },
    preprocessors: {
      'test/index.js': ['webpack']
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'html'},
        {type: 'text'},
        {type: 'text-summary'}
      ],
    },
  });
};
