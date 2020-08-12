// Created this initially but not using it anymore
// Functionality replaced by 'express-async-errors'

function asyncMiddleware(handler) {
    return async(req, res, next) => {
        try{
            await handler(req, res);
        }
        catch(ex){
            next(ex);
        }
    }
}

module.exports = asyncMiddleware;