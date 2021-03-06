// import packages
var passwordValidator = require('password-validator');
 
// Create a password schema
var schema = new passwordValidator();
 
// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
 
// Module export
module.exports = (req, res, next) => {
    if (!schema.validate(req.body.password)) {
        return res.status(400).json({ error: 'Mot de passe pas assez fort! ' + schema.validate(req.body.password, { list: true }) });
    }
    next(); 
};
