module.exports = function (app) {
  app.get('/sbot/config/bots/:botname/platform/:platform/authentication', function (req, res) {
    res.json({
      code: 200,
      data: [],
      msg: 'success'
    })
  });

  app.get('/sbot/config/bots', function (req, res) {
    res.json({
      code: 200,
      data: [
        {
          HUBOT_NAME: 'test',
          status: 'Running',
          platform: 'slack',
          restApi: 'shgdfajskh'
        },
        {
          HUBOT_NAME: 'test2',
          status: 'Failed',
          platform: 'slack',
          restApi: 'shgdfajskh'
        },
        {
          HUBOT_NAME: 'test3',
          status: 'Failed',
          platform: 'slack',
          restApi: 'shgdfajskh',
          ENABLE_RASA_NLU: 'yes'
        }],
      msg: 'success'
    })
  });

  app.get('/sbot/config/bots/:botname/platform/:platform', function (req, res) {
    let botName = req.params.botname;
    let platform = req.params.platform;
    res.json({
      code: 200,
      data: {
        HUBOT_NAME: botName,
        status: 'Running',
        platform: platform,
        restApi: 'shgdfajskh'
      }
    })
  });

  app.delete('/sbot/config/bots/:botname/platform/:platform', function (req, res) {
    res.json({
      code: 401,
      msg: 'Unauthorized'
    })
  });

  app.get(`/sbot-chatbot/urest/v1/:platform/:botname/content`, function (req, res) {
    res.json({
      code: 200,
      data: [],
      msg: 'success'
    })
  });

  app.post('/sbot-chatbot/urest/v1/:platform/:botname/content', function (req, res) {
    res.json({
      result_status: 200,
      result_info: []
    })
  });
  app.put('/sbot/config/bots', function (req, res) {
    res.json({
      code: 200,
      data: {},
      msg: 'success'
    })
  });
  app.post('/sbot/config/bots/check', function (req, res) {
    res.json({
      code: 200,
      data: {},
      msg: 'success'
    })
  });
  app.delete('/sbot-chatbot/urest/v1/:platform/:botname/content/:filename', function (req, res) {
    res.json({
      result_status: 500,
      result_info: 'Delete Failed'
    })
  });

  app.put('/sbot/config/bots/:botname/platform/:platform', function (req, res) {
    res.json({
      code: 200,
      msg: 'success'
    })
  });
};