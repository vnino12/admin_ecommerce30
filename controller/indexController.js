const indexModel = require('../model/indexModel');

const b = {
    home: (req, res) => {
        indexModel.getAll((err, products) => {
            if (err) {
                return res.status(500).send('Error retrieving products');
            }
            res.render('home', { products });
        });
    },
};

module.exports = b;
