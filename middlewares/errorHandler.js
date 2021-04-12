module.exports = (err, req, res, next) => {
  console.log(err)
  let code;
  let name = err.name;
  let message;

  switch (name) {
    case 'EMAIL_ALREADY_EXISTS':
      code = 409;
      message = 'Email already exists!';
      break;
    case 'MONGOOSE_ERROR':
      code = 500;
      message = 'Mongoose error!';
      break;
     case 'LOGIN_FAILED':
      code = 404;
      message = 'Incorrect Email or Password!!'
      break;
    case 'NOT_FOUND':
      code = 404;
      message = 'User Not Found!'
      break;
    case 'MISSING_TOKEN':
      code = 401;
      message = 'Missing access token!';
      break;
    case 'INVALID_TOKEN':
      code = 401;
      message = 'Invalid access token!';
      break;
    case 'NOT_ENOUGH':
      code = 401;
      message = 'Not enough';
      break;
    case 'NOT_FOUND':
      code = 404;
      message = 'Resources not found!';
      break;
    case 'FORBIDDEN':
      code = 403;
      message = 'No access!';
      break;
    case 'BUILD_FAILED':
      code = 500;
      message = 'Failed to build!!'
      break;
    case 'SOLDIER_RIVAL_LESS':
      code = 500;
      message = ' Rival Soldier Less'
      break;
    default:
      code = 500;
      message = 'Internal server error!';
  }
  res.status(code).json({ success: false, message });
};


