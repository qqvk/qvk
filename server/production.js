const Application = require('thinkjs');

const instance = new Application({
  ROOT_PATH: __dirname,
  proxy: true, // use proxy
  env: 'production',
  APP_PATH: __dirname + '/src'
});

instance.run();
