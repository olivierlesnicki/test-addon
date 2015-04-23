/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var JSCSFilter = require('broccoli-jscs');
var temp = require('temp');

module.exports = {
  name: 'test-addon',

  /**
   * Add jscs as a linter and
   * pass a config file
   * @param {Object} type
   * @param {Object} tree
   */
  lintTree: function (type, tree) {

    var jscsOptions = this.app.options.jscsOptions || {};
    var jscsConfig = require('./lib/jscsrc');

    // Store the config file
    // in a temp location
    var info = temp.openSync('ember-commons');
    fs.writeSync(info.fd, JSON.stringify(jscsConfig));
    fs.closeSync(info.fd);

    jscsOptions.configPath = info.path;
    return new JSCSFilter(tree, jscsOptions);

  }
};
