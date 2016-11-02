var assert = require('assert');

function HtmlWebpackEventPlugin(options) {
  assert.equal(options, undefined, 'The HtmlWebpackEventPlugin does not accept any options');
}

HtmlWebpackEventPlugin.prototype.apply = function (compiler) {
  var self = this;

  compiler.plugin('compilation', function (compilation) {
    // Let plugins alter the chunks and the chunk sorting
    compilation.plugin('html-webpack-plugin-alter-chunks', function (chunks, htmlPluginData) {
      var eventFun = htmlPluginData ? htmlPluginData.plugin.options.alterChunks : null;
      var ret = self.callEventFun(eventFun, htmlPluginData, chunks);
      return ret.data;
    });

    // Allow plugins to make changes to the assets before invoking the template
    // This only makes sense to use if `inject` is `false`    
    compilation.plugin('html-webpack-plugin-before-html-generation', function (htmlPluginData, callback) {
      var eventFun = htmlPluginData ? htmlPluginData.plugin.options.beforeHtmlGeneration : null;
      var ret = self.callEventFun(eventFun, htmlPluginData, htmlPluginData);
      callback(ret.error, ret.data);
    });
    
    // Allow plugins to change the html before assets are injected
    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
      var eventFun = htmlPluginData ? htmlPluginData.plugin.options.beforeHtmlProcessing : null;
      var ret = self.callEventFun(eventFun, htmlPluginData, htmlPluginData);
      callback(ret.error, ret.data);
    });
    
    // Allow plugins to change the assetTag definitions
    compilation.plugin('html-webpack-plugin-alter-asset-tags', function (htmlPluginData, callback) {
      var eventFun = htmlPluginData ? htmlPluginData.plugin.options.alterAssetTags : null;
      var ret = self.callEventFun(eventFun, htmlPluginData, htmlPluginData);
      callback(ret.error, ret.data);
    });
    
    // Allow plugins to change the html after assets are injected
    compilation.plugin('html-webpack-plugin-after-html-processing', function (htmlPluginData, callback) {
      var eventFun = htmlPluginData ? htmlPluginData.plugin.options.afterHtmlProcessing : null;
      var ret = self.callEventFun(eventFun, htmlPluginData, htmlPluginData);
      callback(ret.error, ret.data);
    });
    
    // Let other plugins know that we are done:
    compilation.plugin('html-webpack-plugin-after-emit', function (htmlPluginData, callback) {
      // htmlPluginData === undefined Why?
      var eventFun = htmlPluginData ? htmlPluginData.plugin.options.afterEmit : null;
      var ret = self.callEventFun(eventFun, htmlPluginData, htmlPluginData);
      callback(ret.error, ret.data);
    });
  });
};

HtmlWebpackEventPlugin.prototype.callEventFun = function (eventFun, htmlPluginData, defaultData) {
  var ret = {
    error: null,
    data: null
  };
  if (typeof eventFun === 'function') {
    try {
      ret.data = eventFun(htmlPluginData, defaultData);
    } catch(error) {
      ret.error = error;
    }
  } else {
    ret.data = defaultData;
  }
  return ret;
};

module.exports = HtmlWebpackEventPlugin;