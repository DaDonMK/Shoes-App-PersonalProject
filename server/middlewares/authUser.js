module.exports = {
    userAuthorized: (req, res, next) => {
      if (req.session.user) {
        return next();
      } else {
        return res.sendStatus(403).send('Not Authorized!');
      }
    }
  }