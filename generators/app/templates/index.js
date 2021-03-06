var exampleRoute = require('./server/routes/example');
module.exports = function (kibana) {
  return new kibana.Plugin({

    name: '<%= name %>',
    require: ['kibana', 'elasticsearch'],
    uiExports: {
      app: {
        title: '<%= title %>',
        description: '<%= description %>',
        main: 'plugins/<%= name %>/app'
      }
    },

    config: function (Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init: function (server, options) {
      // Add server routes and initalize the plugin here
      exampleRoute(server);
    }

  });
};

