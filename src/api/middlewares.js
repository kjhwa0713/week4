import jwt from 'jsonwebtoken';

exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET); //id를 받아와야한다
    return next();
  } catch (error) {
    if (!Boolean(req.headers.authorization)){
      return res.json({
        "error": {
          "message": "로그인을 먼저 해주세요."
        }
      });
    }
    if (error.name === 'TokenExpiredError') { // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다. 다시 로그인해주세요.',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '토큰 정보가 잘못되었습니다. 다시 시도해주세요.',
    });
  }
};