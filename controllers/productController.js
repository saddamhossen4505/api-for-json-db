const path = require('path');
const { readFileSync, writeFileSync } = require('fs');



/**
 * @desc GET ALL-PRODUCT.
 * @name GET /api/v1/product
 * @access public 
 */

const getAllPorduct = (req, res) => {

    // Get All-Products
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

    // Send-Data.
    res.status(200).json( products );
};





/**
 * @desc CREATE A NEW-PRODUCT.
 * @name POST /api/v1/product
 * @access public 
 */
const createNewPorduct = (req, res) => {
    // Get All-Products
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));
    // Create-id
    const id = Math.floor(Math.random() * 100000000).toString();


    // Gallery Photo Manage.
    const gallery = []
    req.files.gallery_photo.forEach(items => {
        gallery.push(items.filename);
    });

    // Add NewData to json db.
    products.push({
        id : id, 
        ...req.body, 
        photo : req.files.product_photo[0].filename,
        gallery : gallery,
    });

    // Now Store NewData to json db.
    writeFileSync(path.join(__dirname, '../db/product.json'), JSON.stringify(products));

    res.status(201).json({
        message : "New Product Add Successfully."
    });
};








/**
 * @desc GET SINGLE-PRODUCT.
 * @name GET /api/v1/product/:id
 * @access public 
 */
const getSingleProduct = (req, res) => {

    // Get All-Products
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

    // Get id.
    const { id } = req.params;

    // Check id.
    const singleProduct = products.find(data => data.id == id );

    if(singleProduct){
        res.status(200).json(singleProduct);
    }else {
        res.status(404).json({
            message : "404 Data not found"
        });
    };
};






/**
 * @desc UPDATE-SINGLE-PRODUCT.
 * @name PUT/PATCH /api/v1/product/:id
 * @access public 
 */
const updateSingleProductData = (req, res) => {

    // Get All-Products
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

    // Gallery Photo Manage.
    const gallery = []
    req.files.gallery_photo.forEach(items => {
        gallery.push(items.filename);
    });

    if( products.some( data => data.id == req.params.id )){

        // Find IndexNumber This Data to json db.
        products[products.findIndex( data => data.id == req.params.id )] = {
            ...products[products.findIndex( data => data.id == req.params.id)],
            ...req.body,
            photo : req.files.product_photo[0].filename,
            gallery : gallery,
        };

        // Now NewData Store to json db.
        writeFileSync(path.join(__dirname, '../db/product.json'), JSON.stringify(products));

        res.status(200).json({
            message : "Product update successfully."
        });

    }else {
        res.status(404).json({
            message : "404 data not found"
        });
    };
};






/**
 * @desc DELETE-SINGLE-PRODUCT.
 * @name DELETE /api/v1/product/:id
 * @access public 
 */
const deleteSingleProduct = (req, res) => {

    // Get All-Products
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

    // CheckData.
    if( products.some( data => data.id == req.params.id )){

        // Filter all Product without delete product.
        const updateData = products.filter( data => data.id != req.params.id );

        // Now Store NewData to json db.
        writeFileSync(path.join(__dirname, '../db/product.json'), JSON.stringify(updateData));

        res.status(200).json({
            message : "Single Product Delete Successfully"
        });

    }else {

        res.status(400).json({
            message : "Product not deleted."
        });
    };
};






// Export Controllers.
module.exports = {
    getAllPorduct,
    createNewPorduct,
    getSingleProduct,
    updateSingleProductData,
    deleteSingleProduct
};