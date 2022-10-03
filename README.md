## This is a REST API for JSON db.

```console
$ npm install 
```

## Our server structure.
```js
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');


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


// Create Server.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgMagenta.black);
});
```

## Use Packages.

* Express js
* nodemon
* dotenv
* colors
* nodemailer
* multer
* axios