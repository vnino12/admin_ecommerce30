        const express = require('express');
        const router = express.Router();
        const adminController = require("../controller/adminController");
        const categoryController = require("../controller/categoryController"); // Renamed for clarity
        const productController = require('../controller/productController')
        const userController = require('../controller/userController')
        const homeController = require('../controller/homepageController')

        const upload = require('../config/multerSetup'); // Ensure this file is configured for image uploads

        // Display routes
        router.get('/admin', adminController.dashboard);
        router.get('/category-add', adminController.category_add);
        router.get('/product-add', productController.getAddProductPage); 
        router.get('/product-list', productController.getAllProduct);// Use the method from productController
        router.get('/product-details', adminController.product_details);
      
        router.get('/category-list', categoryController.getAllCategories); // Ensure only one handler for /category-list
        router.post('/category-list/delete/:id', categoryController.deleteCategories);
        // Categories routes
        router.post('/add-category', upload.single('thumbnail_image'), categoryController.createCategory);
        router.get('/categories-edit/:id', categoryController.editCategories);
        router.post('/categories-edit/:id', upload.single('thumbnail_image'), categoryController.updateCategories);

        router.post('/add-product', upload.single('image'), productController.createProducts);
        router.post('/product-list/delete/:id', productController.deleteProduct);
        router.get('/edit-product/:id', productController.editProduct);
        router.post('/edit-product/:id', upload.single('image'), productController.updateProducts);
        router.get('/product-details/:id', productController.detailsProduct);
        
     

        
          // Index

          router.get('/', homeController.index);
          router.get('/sidebarBanner', homeController.getAllCategories);
          // router.get('/sidebarBanner/:category_name', homeController.getProductsByCategory);



          router.get('/login', userController.users); // Render login view
          router.get('/register', userController.registration); // Render registration view


          router.get('/verify-email', userController.verifyEmail);



          router.post('/register', userController.registrationHandler); // Handle registration
          router.post('/login', userController.loginHandler); // Handle login

          //home
      

        



module.exports = router;