const db = require('../config/db')


const homeModel = {

    getall: (callback) => {
        const query = "SELECT * FROM categories";
        db.query(query, callback);
    },
    getCategoryIdByName: (categoryName, callback) => {
        const query = "SELECT category_id FROM categories WHERE category_name = ?";
        db.query(query, [categoryName], (err, results) => {
            if (err) return callback(err);
            const categoryId = results.length ? results[0].category_id : null;
            callback(null, categoryId);
        });
    },
    

    getProductsByCategoryId: (categoryId, callback) => {
        const query = "SELECT * FROM products WHERE category_id = ?";
        db.query(query, [categoryId], callback);
    },


}


module.exports = homeModel;