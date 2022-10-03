

const express = require('express');
const multer = require('multer');
const path = require('path');
const { getAllPorduct, createNewPorduct, getSingleProduct, updateSingleProductData, deleteSingleProduct } = require('../controllers/productController');



// Init Multer for Product-Image.
const storage = multer.diskStorage({
    destination : (req, file, cb) => {

        if( file.mimetype == "image/png" || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/webp'){
            cb(null, path.join(__dirname, '../public/product/images'));
        }else {
            console.log('Invalid photo formate');
        };
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + '_' + Math.floor(Math.random() * 1000000 ) + '_' + file.originalname)
    }
});

const productPhotoMulter = multer({
    storage : storage,
}).fields([
    {
        name : 'product_photo',
        maxCount : 1
    },
    {
        name : 'gallery_photo',
        maxCount : 6
    }
]);


// Init Router.
const router = express.Router();


// Routes.
router.route('/').get(getAllPorduct).post( productPhotoMulter, createNewPorduct);
router.route('/:id').get(getSingleProduct).put( productPhotoMulter, updateSingleProductData).patch( productPhotoMulter, updateSingleProductData).delete(deleteSingleProduct)



// Exports Router.
module.exports = router;