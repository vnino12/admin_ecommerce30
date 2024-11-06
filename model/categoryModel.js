// productModel.js
const db = require('../config/db');

const categories = {
    create: (data, callback) => {
        const query = "INSERT INTO categories (category_name, thumbnail_image, description) VALUES (?, ?, ?)";
        db.query(query, [data.category_name, data.thumbnail_image, data.description], callback);
    },
    
    getall: (callback) => {
        const query = "SELECT * FROM categories";
        db.query(query, callback);
    },

    deleteCategories: (id, callback) => {
        const query = "DELETE from categories WHERE category_id = ?";
        db.query(query, [id], callback);
    },
    getAllCategories: (callback) => {
        db.query('SELECT category_id, category_name FROM categories', (err, results) => {
            callback(err, results); // Pass results to the callback
        });
    },
    
    getCategoryById: (category_id, callback) => {
        const query = `
            SELECT category_id, category_name, thumbnail_image, description  FROM categories WHERE category_id = ?;
        `;
        db.query(query, [category_id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0] || null); // Return the first category or null if not found
        });
    },
    update: (id, data, callback) => {
        const query = "UPDATE categories SET category_name = ?, thumbnail_image = ?, description = ? WHERE category_id = ?";
        db.query(query, [data.category_name, data.thumbnail_image, data.description, id], callback);
    },
    

        
};

module.exports = categories;
