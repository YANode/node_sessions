const express = require('express');
const path = require('path');
const mongoose = require('mongoose');//import the 'mongoose' module
const app = express();//application object express
const PORT = process.env.PORT || 3000;
const mainRoutes = require('./routs/main');
const addRoutes = require('./routs/add');
const coursesRoutes = require('./routs/courses');
const cardRoutes = require('./routs/card');
const orderRoutes = require('./routs/orders')
const User = require('./models/user');


//from version 4.6.0 on,  Handlebars used:
// terminal: npm install @handlebars/allow-prototype-access
//  terminal: npm install express-handlebars
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const exphbs = require('express-handlebars'); //https://github.com/express-handlebars/express-handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars) //from version 4.6.0 on,  Handlebars used
})



// View engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

//proprietary middleware at the application level - processing without mounted path
app.use(async(req,res, next) => { //is performed whenever a request is received by the application
    try {
        const user = await User.findById('63b6ce9979fea6f9f6cd5687');//_id user from mongodb
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
    }

} )



//router registration
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use('/', mainRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);
app.use('/orders', orderRoutes);


//connected to the mongodb database
async function start() {
    try {
        mongoose.set('strictQuery', true);
        const url = `mongodb+srv://anode:bOKT2JLZavt6zpY3@cluster0.o5pllfj.mongodb.net/shop`//cloud.mongodb.com
        await mongoose.connect(url, {
            useNewUrlParser: true,
            // useFindAndModify: false
        });

       //find one user in the mongodb database
        const candidate = await User.findOne();

           if (!candidate) { //if there are no users in the mongodb database
            //locally create a new user
            const user = new User({
                email: 'ANode@gmail.com',
                name: 'ANode',
                cart: {items: []} //cart is empty
            });
            //saved the user
            await user.save();
        }


        app.listen(PORT, () => {
            console.log(`Server is running or port ${PORT}`)
        })

    } catch (e) {
        console.log(e)
    }
}

start();









