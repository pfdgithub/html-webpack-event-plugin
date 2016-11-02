# html-webpack-event-plugin

[![npm version](https://badge.fury.io/js/html-webpack-event-plugin.svg)](http://badge.fury.io/js/html-webpack-event-plugin) [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)]()

the [events](https://github.com/ampedandwired/html-webpack-plugin#events) of [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)  

Async:  

 * `html-webpack-plugin-before-html-generation`
 * `html-webpack-plugin-before-html-processing`
 * `html-webpack-plugin-alter-asset-tags`
 * `html-webpack-plugin-after-html-processing`
 * `html-webpack-plugin-after-emit`

Sync:  

 * `html-webpack-plugin-alter-chunks`

## Installation

``` bash
npm install html-webpack-event-plugin
```

## Usage
```javascript
new HtmlWebpackPlugin({
  alterChunks: function (htmlPluginData, chunks) {
    return chunks;
  },
  beforeHtmlGeneration: function (htmlPluginData) {
    return htmlPluginData;
  },
  beforeHtmlProcessing: function (htmlPluginData) {
    return htmlPluginData;
  },
  alterAssetTags: function (htmlPluginData) {
    return htmlPluginData;
  },
  afterHtmlProcessing: function (htmlPluginData) {
    return htmlPluginData;
  },
  afterEmit: function (htmlPluginData) {
    return htmlPluginData;
  }
})
```

## License

This project is licensed under MIT.