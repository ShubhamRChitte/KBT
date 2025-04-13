// Authentication middleware functions

// Check if user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You must be signed in first!');
    res.redirect('/kbt/auth/login');
};

// Check if user is an admin
const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    req.flash('error', 'You do not have permission to do that!');
    res.redirect('/kbt');
};

// Check if user is authenticated before continuing
const isAuthenticated = (req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.isAdmin = req.user && req.user.role === 'admin';
    res.locals.isLoggedIn = req.isAuthenticated();
    next();
};

module.exports = {
    isLoggedIn,
    isAdmin,
    isAuthenticated
}; 