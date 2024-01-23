const indexController = (req, res, next) => {
    res.render('index', { user: req.user, title: 'LogInTalk' });
  };
  
module.exports = indexController;