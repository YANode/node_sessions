//get the router object from the library
const {Router} = require('express');//const express = require('express');
//get the router object from the library
const router = Router();//const router = express.Router();


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
    req.session.destroy(()=> {//clear the session
        res.redirect('/auth/login#login')
    });
});


//post request processing on login tab
router.post('/login', async (req, res) => {
    req.session.isAuthenticated = true; // isAuthenticated is true, if you are logged in
    res.redirect('/');
})


//export the router object
module.exports = router;
