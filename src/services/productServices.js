const Product = require('../models/Product');

// Crear un nuevo producto
async function insertProduct(productData) {
    try {
        const product = new Product(productData);
        const res = await product.save();
        console.log('Producto insertado:', res);
        return res;
    } catch (err) {
        console.error('Error al insertar producto:', err);
        throw err;
    }
}

// Obtener todos los productos
async function getProducts() {
    try {
        const productos = await Product.find();
        console.log('Productos:', productos);
        return productos;
    } catch (err) {
        console.error('Error al obtener productos:', err);
        throw err;
    }
}

// Actualizar un producto
async function updateProduct(id, productData) {
    try {
        // Añadir fecha de última actualización
        productData.ultimaActualizacion = new Date();
        
        const producto = await Product.findByIdAndUpdate(
            id,
            productData,
            { 
                new: true,
                runValidators: true // Ejecuta las validaciones del esquema
            }
        );

        if (!producto) {
            throw new Error('Producto no encontrado');
        }

        console.log('Producto actualizado:', producto);
        return producto;
    } catch (err) {
        console.error('Error al actualizar producto:', err);
        throw err;
    }
}

// Eliminar un producto
async function deleteProduct(id) {
    try {
        const producto = await Product.findByIdAndDelete(id);
        
        if (!producto) {
            throw new Error('Producto no encontrado');
        }

        console.log('Producto eliminado:', producto);
        return producto;
    } catch (err) {
        console.error('Error al eliminar producto:', err);
        throw err;
    }
}

module.exports = { 
    insertProduct, 
    getProducts, 
    updateProduct, 
    deleteProduct 
}; 