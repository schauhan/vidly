function admin(req, res, next) {
    // 401: Unauthorised
    // 403: Forbidden
    if(!req.user.isAdmin) return res.status(403).send('Access Denied! User is not an admin.');

    next();
}



module.exports = admin;