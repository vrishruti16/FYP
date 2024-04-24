// premiumMiddleware.js

const premiumMiddleware = {};

premiumMiddleware.checkPremiumAccess = (req, res, next) => {
    // Check if user has premium access
    const isPremiumUser = req.user && req.user.isPremium;

    if (isPremiumUser) {
        // User has premium access, proceed
        next();
    } else {
        // User doesn't have premium access, redirect or send error
        res.status(403).send('Premium access required');
    }
};

module.exports = premiumMiddleware;
