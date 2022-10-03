const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const productRoute = require('./routes/productRoute');


// Init Express.
const app = express();


// Init-Environment Variables.
dotenv.config();
const PORT = process.env.PORT || 4000;


// Init-Public
app.use(express.static('public'));

// DataManage.
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


// Connect Router.
app.use('/api/v1/product', productRoute);


// Create Server.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgMagenta.black);
});