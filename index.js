const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const sanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const upload = require('./controllers/multerUploading');
const mongoose = require('mongoose');
const BlogModel = require('./models/BlogModel');
const UserModel = require('./models/UserModel');
const SignUpRouter = require('./routes/SignUp');
const SignInRouter = require('./routes/SignIn');
const AddBlogRouter = require('./routes/AddBlog');
const categoriesRouter = require('./routes/categories');
const cartRouter = require('./routes/cart');
const productsRouter = require('./routes/products');
const UserProfile = require('./controllers/UserProfile');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logoutRouter = require('./routes/logoutRouter');
const feedbackRouter = require('./routes/feedback');

//Set path for static files.
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


mongoose.connect('mongodb://localhost:27017/ECommerce')
    .then(() => {
        console.log('MongoDB Connected')
    }).catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });



app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(sanitize());
app.use(xss());
app.use(cookieParser());
app.use(UserProfile);
const sessionMiddleware = require('./controllers/sessionManage');

//Use Routers
app.use('/signup', SignUpRouter);
app.use('/signin', SignInRouter);
app.use('/addBlog', AddBlogRouter);
app.use('/categories', categoriesRouter);
app.use('/cart', cartRouter);
app.use('/products', productsRouter);
app.use('/logout', logoutRouter);
app.use('/feedback', feedbackRouter);


app.get('/', async (req, res) => {
    const userName = req.userName;
    return res.status(200).render('home', { userName });
});


app.listen(PORT, () => {
    console.log(`Server started at PORT:${PORT}`);
})