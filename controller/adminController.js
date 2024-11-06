const adminController ={
    dashboard: (req, res) => res.render('admin/index'),
    category_add: (req,res) => res.render('admin/category-add'),
    category_list: (req,res) => res.render('admin/category-list'),
    product_add: (req,res) => res.render('admin/product-add'),
    product_list: (req,res) => res.render('admin/product-list'),
    product_edit: (req,res) => res.render('admin/product-edit'),
    product_details: (req,res) => res.render('admin/product-details')
}






module.exports = adminController;