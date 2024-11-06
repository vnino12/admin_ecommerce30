const product = require('../model/productModel');

const Products ={
    createProducts: (req, res) => {
        const { product_name, description, price, stock, category_id} = req.body;
        const thumbnailImage = req.file.path.replace(/\\/g, '/');

        // Validate thais provided
        if (!category_id) {
            return res.status(400).send("Please select a valid category.");
        }

        // Proceed with product creation
        product.create({
            product_name,
            description,
            price,
            stock,
            image: thumbnailImage,
            category_id
        }, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error adding product');
            }
            res.redirect('/product-add');
        });
    },
    getAddProductPage: (req, res) => {
       product.getAllCategories((err, results) => {
            if (err) {
                return res.status(500).send('Error fetching categories');
            }
            res.render('admin/product-add', { categories: results }); // Pass categories to the view
        });
    },

    getAllProduct: (req, res) => {
        const currentPage = parseInt(req.query.page) || 1;  // Get current page from query, default to 1
        const itemsPerPage = 5  ;  // Number of products per page

        product.getAllProducts(currentPage, itemsPerPage, (err, result, totalPages) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error retrieving products');
            }

            // Render the product list with pagination
            res.render('admin/product-list', {
                products: result,
                currentPage,
                totalPages
            });
        });
    },
    deleteProduct:(req,res)=>{
        const {id} = req.params;
        product.deleteProducts(id, (err) =>{
            if(err){
                return res.status(500).send('Error deleting product');
            }
            res.redirect('/product-list'); 
        });
},
editProduct: (req, res) => {
    const productId = req.params.id;

    // Fetch product details and categories
    product.getProductById(productId, (err, products) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving product');
        }
        product.getAllCategories((err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error fetching categories');
            }
            res.render('admin/product-edit', { product: products, categories: results });
        });
    });
},

detailsProduct: (req, res) => {
    const productId = req.params.id;

    // Fetch product details and categories
    product.getProductById(productId, (err, products) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving product');
        }
        product.getAllCategories((err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error fetching categories');
            }
            res.render('admin/product-details', { product: products, categories: results });
        });
    });
},

updateProducts: (req, res) => {
    const { id } = req.params;
    const { product_name, description, price, stock, category_id } = req.body;
    const thumbnailImage = req.file ? req.file.path.replace(/\\/g, '/') : req.body.existing_image;

    product.update(id, {
        product_name,
        description,
        price,
        stock,
        image: thumbnailImage,
        category_id
    }, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error updating product');
        }
        res.redirect('/');
    });
}
};
module.exports = Products;

