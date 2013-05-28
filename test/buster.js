var config = module.exports;

config['mlocal tests'] = {
    rootPath: '../',
    environment: 'browser',
    sources: [
        'assets/js/jquery.1.9.1.min.js',
        'assets/js/mlocal.js'
    ],
    tests: [
        'test/*-test.js'
    ]
};
