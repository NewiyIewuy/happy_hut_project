var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({

        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            if (username)
                username = username.toLowerCase(); 
          
            process.nextTick(function () {
                User.findOne({ 'username': username, 'password': password }, function (err, user) {
                  
                    if (err) {
                        return done(err);

                    } else if (!user) {
                        return done(null, false, req.flash('loginMessage', 'No user found.'));

                    } else if (!user.validPassword(password)) {
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                    } else {
                        return done(null, user);
                    }
                });
            });
        }));
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                console.log("user ", user, err);
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (!user.verifyPassword(password)) { return done(null, false); }
                return done(null, user);
            });
        }
    ));
  
    passport.use('local-signup', new LocalStrategy({
   
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            if (username)
                username = username.toLowerCase();

            process.nextTick(function () {
            
                if (!req.user) {
                    User.findOne({ 'username': username }, function (err, user) {
                        
                        if (err)
                            return done(err);
            
                        if (user) {
                            console.log("user already exist");
                            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                        } else {
                
                            var newUser = new User();
            
                            newUser.username = username;
                    
                            newUser.password = password;
                
                            newUser.save(function (err) {
                  
                                if (err)
                                    return done(err);

                                return done(null, newUser);
                            });
                        }

                    });
          
                } else if (!req.user.username) {
                    
                    User.findOne({ 'username': username }, function (err, user) {
                        if (err)
                            return done(err);

                        if (user) {
                            return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
                   
                        } else {
                            var user = req.user;
                            user.username = username;
                            //   user.local.password = user.generateHash(password);
                            user.password = password;
                            user.save(function (err) {
                                if (err)
                                    return done(err);

                                return done(null, user);
                            });
                        }
                    });
                } else {
                    console.log("You are logged in cannot sign up");
                    return done(null, req.user);
                }

            });

        }));
};
