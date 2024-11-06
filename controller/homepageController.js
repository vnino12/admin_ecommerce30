const homeModel = require('../model/homepageModel')
const homepageController = {
        index: (req, res) => res.render('homepage/index'),
       sidebarBanner: (req, res) => res.render('homepage/product-grid-sidebar-banner'),


       getAllCategories: (req, res) => {
        homeModel.getall((err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error retrieving categories');
            }
            res.render('homepage/product-grid-sidebar-banner', { categories: result });
        });
    },
    getProductsByCategory: (req, res) => {
        const categoryName = req.params.category_name;
    
        homeModel.getCategoryIdByName(categoryName, (err, categoryId) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error retrieving category');
            }
    
            if (!categoryId) {
                // Handle case where no category was found
                return res.render('homepage/product-grid-sidebar-banner', { products: [] });
            }
    
            homeModel.getProductsByCategoryId(categoryId, (err, products) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error retrieving products');
                }
    
                res.render('homepage/product-grid-sidebar-banner', { products: products });
            });
        });
    }    

}


module.exports = homepageController;