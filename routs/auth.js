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





//export the router object
module.exports = router;
