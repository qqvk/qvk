## 什么是qvk

qvk是一个集成现代前端工程化最佳实践的通用Web开发环境，可用于开发传统C/S架构的Web应用、SPA（单页应用）、H5（App内嵌页）等。

qvk初始版集成以下Web框架和打包工具。

- [ThinkJS](https://thinkjs.org/)：基于MVC模式的简单易用、功能强大的Node.js开发框架。
- [Vue.js](https://cn.vuejs.org/index.html)：渐进式JavaScript框架，前端组件式开发主流选择。
- [Webpack](https://webpack.js.org/)：目前使用最广泛的前端资源模块打包工具。


## 用法 

### 1. 克隆代码

```
git clone git@github.com:qqvk/qvk.git [PROJECT]
```

把`[PROJECT]`替换成你的项目名。

### 2. 安装依赖

**打开两个终端窗口**，分别进入server和client目录，分别运行`npm install`安装依赖。

### 3. 构建模板

进入client目录，运行`npm run build`构建模板和静态文件。

### 4. 启动服务

启动命令：`npm start`

启动顺序：先启动服务端，再启动前端。就是先在server目录中运行`npm start`，再在client目录中运行`npm start`。

## 计划

- 核心配置优化
- 更新到Webpack 4.x
- 部分人工操作的自动化
- 高级特性：HTTPS及部署等
- 丰富的文档及示例站点

## 团队

- [cncuckoo](https://github.com/cncuckoo)
- [makeco](https://github.com/makeco)