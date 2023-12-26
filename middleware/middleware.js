const {constants} = require('../constants');
const errorHandler = (err, req, res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title:"Validation Error",
                message: err.message,
                stackTrace: err.stack
            });
            // break;
            case constants.NOT_FOUND:
                res.json({
                    title:"NOT_FOUND",
                    message: err.message,
                    stackTrace: err.stack
                });
            case constants.FORBIDDEN:
                res.json({
                    title:"FORBIDDEN",
                    message: err.message,
                    stackTrace: err.stack
                });
            case constants.UNAUTHORIZED:
                res.json({
                    title:"UNAUTHORIZED",
                    message: err.message,
                    stackTrace: err.stack
                });
            case constants.SERVER_ERROR:
                res.json({
                    title:"SERVER_ERROR",
                    message: err.message,
                    stackTrace: err.stack
                });
                default:
                    console.log("No error, All good!");
                    break;
    }
    res.json({title: "Validation failed" ,message: err.message, stackTrace: err.stack});
}

module.exports = errorHandler;