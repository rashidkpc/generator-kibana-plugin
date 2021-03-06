var _ = require('lodash');
var generator = require('yeoman-generator');
module.exports = generator.Base.extend({

  constructor: function () {
    generator.Base.apply(this, arguments);
    this.appname = this.appname.replace(/\s+/, '-');
  },

  promptingName: function () {
    var done = this.async();
    this.prompt({
      type: 'input',
      name: 'name',
      message: 'Your Plugin Name',
      default: this.appname
    }, function (answers) {
      this.appname = answers.name;
      done();
    }.bind(this));
  },

  promptingDescription: function () {
    var done = this.async();
    this.prompt({
      type: 'input',
      name: 'description',
      message: 'Short Description',
      default: 'An awesome Kibana plugin'
    }, function (answers) {
      this.description = answers.description;
      done();
    }.bind(this));
  },

  installingDevDeps: function () {
    var deps = [
      'gulp',
      'bluebird',
      'babel-eslint',
      'babel-preset-es2015',
      'babel-register',
      'eslint-plugin-mocha',
      'gulp-eslint',
      'gulp-gzip',
      'gulp-tar',
      'gulp-util',
      'lodash',
      'mkdirp',
      'rimraf',
      'rsync'
    ];
    this.npmInstall(deps, { saveDev: true });
  },

  writing: function () {
    var vars = {
      name: this.appname,
      description: this.description,
      title: _.startCase(this.appname),
      camelCaseName: _.camelCase(this.appname)
    };
    this.fs.copyTpl(
      this.templatePath('public/app.js'),
      this.destinationPath('public/app.js'),
      vars
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      vars
    );
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('index.js'),
      vars
    );
    this.fs.copyTpl(
      this.templatePath('public/templates/index.html'),
      this.destinationPath('public/templates/index.html'),
      vars
    );
    this.fs.copy(
      this.templatePath('public/less/main.less'),
      this.destinationPath('public/less/main.less')
    );
    this.fs.copyTpl(
      this.templatePath('server/routes/example.js'),
      this.destinationPath('server/routes/example.js'),
      vars
    );
    this.fs.copy(
      this.templatePath('.eslintrc'),
      this.destinationPath('.eslintrc')
    );
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
  }
});
