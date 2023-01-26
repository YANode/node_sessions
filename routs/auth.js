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
    //temporarily, when executing the request, assign an id from mongodb to the user
    const user = await User.findById('63b6ce9979fea6f9f6cd5687');//_id user from mongodb
    req.session.user = user;
    req.session.isAuthenticated = true; // isAuthenticated is true, if you are logged in
    req.session.save(err => {
        if (err) {
            throw err
        }
        res.redirect('/');
    })
})


//export the router object
module.exports = router;
