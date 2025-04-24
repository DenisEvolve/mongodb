const { getProducts, updateProduct, insertProduct, deleteProduct } = require('../services/productServices');

const productController = {
    getProducts: async (req, response) => {
        try {
            const data = await getProducts();
            response.status(200).json(data);
        } catch(e) {
            console.log('Error al obtener productos de la BBDD', e);
            response.status(500).json({ error: 'Error al obtener productos de la BBDD' });
        }
    },

    createProduct: async (req, response) => {
        try {
            const newProduct = await insertProduct(req.body);
            response.status(201).json(newProduct);
        } catch(e) {
            console.log('Error al crear producto', e);
            response.status(e.code).json({ error: e.message });
        }
    },

    updateProduct: async (req, response) => {
        try {
            const { id } = req.params;
            const productData = req.body;
            const updatedProduct = await updateProduct(id, productData);
            response.status(200).json(updatedProduct);
        } catch(e) {
            console.log('Error al actualizar producto', e);
            response.status(500).json({ error: 'Error al actualizar producto' });
        }
    },

    deleteProduct: async (req, response) => {
        try {
            const { id } = req.params;
            const deletedProduct = await deleteProduct(id);
            response.status(200).json(deletedProduct);
        } catch(e) {
            console.log('Error al eliminar producto', e);
            response.status(500).json({ error: 'Error al eliminar producto' });
        }
    }
};

module.exports = productController; 