const path = require('path');
const isDev = think.env === 'development';

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    endable: true,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'resource',
    endable: true,
    options: {
      root: path.join(think.ROOT_PATH),
      publicPath: /^\/public/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev,
      error(err, ctx) {
        const errmsg = "抱歉, 出错了~";
        return ctx.fail(err);
      },
      templates: path.join(think.ROOT_PATH, 'view/error')
    }
  },
  {
    handle: 'payload',
    options: {}
  },
  // {
  //   handle: 'koa-execTime',
  //   options: {}
  // },
  // {
  //   handle: history,
  //   options: {
  //     rewrites: [
  //       {
  //         from: /\/admin/,
  //         to: '/admin'
  //       }
  //     ],
  //     verbose: true
  //   }
  // },
  {
    handle: 'router',
    options: {}
  },
  'logic',
  {
    handle: 'controller',
    options: {
      emptyController: 'base'
    }
  }
];
