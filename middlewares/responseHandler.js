
function responseFormatter(req, res, next) {
  res.response = (data, status=200, message, metadata=null) => {
      res.status(status).json({
          status: status,
          message: message,
          data: data,
          metadata: metadata
      });
  };

  next();
}

module.exports = {responseFormatter}
