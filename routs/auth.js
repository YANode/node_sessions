//get the router object from the library
const {Router} = require('express');//const express = require('express');
//get the router object from the library
const router = Router();//const router = express.Router();
const User = require('../models/user');


// content of the login page download by link
router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        isLogin: true,
    })
});

router.get('/logout', async (req, res) => {
    //req.session.isAuthenticated = false; // isAuthenticated is false, if you are logged off
    //or
    req.session.destroy(() => {//clear the session
        res.redirect('/auth/login#login')
    });
});


//post request processing on login tab
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const candidate = await User.findOne({email}); //email is a unique

        if (candidate) {
            const areSame = password === candidate.password;
            if (areSame) {
                req.session.user = candidate;
                req.session.isAuthenticated = true; // isAuthenticated is true, if you are logged in
                req.session.save(err => {
                    if (err) {
                        throw err
                    }
                    res.redirect('/');
                })

            } else {
                res.redirect('/auth/login#login');
            }
        } else {
            res.redirect('/auth/login#login');
        }
    } catch (e) {
        console.log(e);
    }
})

//registering a new user
router.post('/register', async (req, res) => {
    try {
        const {email, password, repeat, name} = req.body;
        const candidate = await User.findOne({email});//the mail is a unique
        if (candidate) {
            res.redirect('/auth/login#login');
        } else {
            //if the user with this email address is not registered
            const user = new User({
                email: email,
                name: name,
                password: password,
                cart: {items: []}
            });
            await user.save();
            res.redirect('/auth/login#login');
        }
    } catch (e) {
        console.log(e)
    }
})


//export the router object
module.exports = router;
