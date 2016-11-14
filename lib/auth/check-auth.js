const tokenSvc = require('./token');

module.exports = function getCheckAuth() {
  return function checkAuth(req, res, next) {
    const authHeader =
      req.headers.authorization;
    if(!authHeader) {
      const err = {
        code: 400,
        message: 'Token required!'
      };
      return next(err);
    }

    tokenSvc.verify(authHeader)
      .then(payload => {
        req.user = payload;
        next();
      })
      .catch(() => {
        const err = {
          code: 400,
          message: 'Invalid Token!'
        };
        next(err);
      });
  };
};
