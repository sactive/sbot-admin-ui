module.exports = function (app) {
  app.get('/sbot/config/bots/test/platform/slack/authentication', function(req, res) {
    res.json({
      code: 200,
      data: [],
      msg: 'success'
    })
  });

  app.get('/sbot/config/bots', function(req, res) {
    res.json({
      code: 200,
      data: [{
        HUBOT_NAME: 'test',
        status: 'Running',
        platform: 'slack',
        restApi: 'shgdfajskh'
      }],
      msg: 'success'
    })
  });

  app.get(`/sbot-chatbot/urest/v1/slack/test/content`, function(req, res) {
    res.json({
      code: 200,
      data: [],
      msg: 'success'
    })
  });

  app.post('/sbot-chatbot/urest/v1/slack/test/content', function(req, res) {
    res.json({
      result_status: 200,
      result_info: []
    })
  });

  app.delete('/sbot-chatbot/urest/v1/slack/test/content/:filename', function(req, res) {
    res.json({
      result_status: 500,
      result_info: 'Delete Failed'
    })
  });
};