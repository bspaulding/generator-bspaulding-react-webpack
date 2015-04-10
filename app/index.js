'use strict';
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.title = _.titleize(this.appname);
    this.appnameSlug = _.dasherize(this.appname);
    this.appnameClass = _.classify(this.appname);
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copyTpl(
        this.templatePath('dist/_index.html'),
        this.destinationPath('dist/index.html'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('src/main.jsx'),
        this.destinationPath('src/main.jsx'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('src/components/main-component.jsx'),
        this.destinationPath('src/components/' + this.appnameSlug + '.jsx'),
        this
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.npmInstall(['react', 'webpack', 'jsx-loader', 'webpack-dev-server'], { 'saveDev': true });
  }
});
