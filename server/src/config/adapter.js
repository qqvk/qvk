
const nunjucks = require("think-view-nunjucks");
const fileSession = require("think-session-file");
const dbSession = require("think-session-mysql");
const path = require("path");

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
  type: "nunjucks",
  common: {
    viewPath: path.join(think.ROOT_PATH, "view"),
    sep: "_",
    extname: ".html"
  },
  nunjucks: {
    handle: nunjucks,
    options: {
      // autoescape: false // 这个转义太过宽泛
    },
    beforeRender: (env, nunjucks, config) => {
      env.addFilter("md5", str => {
        return think.md5(str);
      });
      env.addFilter("console", param => {
        console.log("********************************************");
        console.log(param);
        console.log("********************************************");
      });

      env.addFilter("datetime", (param, onlyToDay) => {
        const fillZero = num => {
          return num < 10 ? "0" + num : num;
        };

        const date = new Date(param);

        const dateStr = [
          date.getFullYear(),
          "年",
          fillZero(date.getMonth() + 1),
          "月",
          fillZero(date.getDate()),
          "日"
        ].join("");
        const timeStr = [
          fillZero(date.getHours()),
          fillZero(date.getMinutes()),
          fillZero(date.getSeconds())
        ].join(":");
        if (onlyToDay) return dateStr;
        return [dateStr, timeStr].join(" ");
      });

      env.addFilter("flipnumber", param => {
        let result = "";
        param += "";
        param.split("").forEach((digit, index) => {
          //  not a digit
          if (isNaN(parseInt(digit))) {
            result += "<em>" + digit + "</em>";
          } else {
            result += '<em class="flip-number" data-num="' + digit + '"></em>';
          }
        });

        return result;
      });
      // 向上取整
      env.addFilter("ceil", number => {
        return Math.ceil(number);
      });
      // 给数值添加千分位分隔符
      env.addFilter("addcomma", number => {
        number += "";
        return (number + "").replace(/(\d)(?=(\d{3})+$)/g, "$1,");
      });
      // 格式化日期时间为User-Friendly字符串
      env.addFilter("timestring", time => {
        if (!time) {
          return "";
        }
        const diff = new Date() - new Date(time);
        let timeStr = "";

        if (diff > 6 * 24 * 3600 * 1000) {
          timeStr = think.datetime(time, "YYYY-MM-DD");
        } else if (diff > 24 * 3600 * 1000) {
          timeStr = Math.floor(diff / (24 * 3600 * 1000)) + "天前";
        } else if (diff > 12 * 3600 * 1000) {
          timeStr = "半天前";
        } else if (diff > 3600 * 1000) {
          timeStr = Math.floor(diff / (3600 * 1000)) + "小时前";
        } else if (diff > 1800 * 1000) {
          timeStr = "半小时前";
        } else if (diff > 60 * 1000) {
          timeStr = Math.floor(diff / (60 * 1000)) + "分钟前";
        } else {
          timeStr = "刚刚";
        }
        return timeStr;
      });

      env.addFilter("truncate", (str, length, ellipsis) => {
        length = length || 50;
        str = str ? str : "";
        if (str.length <= length) return str;
        ellipsis = ellipsis || "...";
        return str.substring(0, length) + "" + ellipsis;
      });

      env.addFilter("xss", str => {
        const xss = require("xss");
        return xss(str);
      });
      // 返回内存中的用户名
      env.addFilter("name", (id, users) => {
        return users.findById[id] ? users.findById[id].name : "";
      });
      // 返回内存中的昵称
      env.addFilter("nick_name", (id, users) => {
        return users.findById[id] ? users.findById[id].nick_name : "";
      });
      // 返回内存中的用户头像
      env.addFilter("photo_url", (id, users) => {
        return users.findById[id] ? users.findById[id].photo_url : "";
      });
      // 返回详情页链接
      env.addFilter("seo_url", (base, type) => {
        return `/${type}/${base}`;
      });
      env.addFilter("seo_title", (id, urls) => {
        return urls.id2url[id];
      });
      env.addFilter("original_title", (id, urls) => {
        return urls.getItemById[id].title;
      });
      env.addFilter("original_url", (id, urls) => {
        return urls.getItemById[id].url;
      });
      env.addFilter("original_url_domain", url => {
        return url.match(/^(https?:\/\/)*([^/]+)/)[2];
      });
      // 返回内存中的用户名
      env.addFilter("user_name", (id, users) => {
        return users.findById[id].name;
      });

      // 中文年月转英文
      env.addFilter("timezh2eng", str => {
        const month = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];

        return str.replace(/(\d+?)年(\d+?)月/, function() {
          return `${month[parseInt(arguments[2], 10) - 1]}, ${arguments[1]}`;
        });
      });

      env.addFilter("objectKeyValue", (str, key) => {
        const obj = JSON.parse(str);
        return obj[key];
      });
    }
  }
};
