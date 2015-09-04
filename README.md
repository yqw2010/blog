### 小胡子个人网站

[![小胡子哥](http://barretlee.com/avatar150.png)](http://barretlee.com)

博客在 `gh-pages` 分支上，`master` 分支博客静态资源的生成程序。博客基于 [hexo](https://hexo.io) 构建，用到的相关 `hexo` 组件如下所示：

```
"hexo": "^3.1.0",
"hexo-deployer-ftpsync": "~0.1.1",
"hexo-deployer-git": "0.0.4",
"hexo-deployer-heroku": "0.0.3",
"hexo-deployer-rsync": "~0.1.1",
"hexo-generator-archive": "^0.1.2",
"hexo-generator-category": "^0.1.2",
"hexo-generator-feed": "~1.0.3",
"hexo-generator-index": "^0.1.2",
"hexo-generator-sitemap": "~1.0.1",
"hexo-generator-tag": "^0.1.1",
"hexo-migrator-rss": "~0.1.2",
"hexo-renderer-ejs": "^0.1.0",
"hexo-renderer-marked": "^0.2.4",
"hexo-renderer-stylus": "^0.3.0",
"hexo-server": "^0.1.2"
```

为了能够满足我自己的需求，在本地对其中部分 `generator` 插件做了改造。

由于 `github` 的访问速度在国内比较慢，所以网站部署在 `gitcafe` 上，这个可以在 `/_config.yml` 文件下看到具体配置。