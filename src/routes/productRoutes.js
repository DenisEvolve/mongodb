const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', productController.getProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post('/', productController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualiza un producto existente
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.put('/:id', productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Elimina un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 */
router.delete('/:id', productController.deleteProduct);

// GET /products con filtros múltiples
// GET /products?category=electronics&minPrice=100&maxPrice=500&sort=price&order=desc
router.get('/', (req, res) => {
    const { category, minPrice, maxPrice, sort, order } = req.query;
    let response = 'Lista de productos';

    if (category || minPrice || maxPrice) {
        response += '\nFiltros aplicados:';
        if (category) response += `\n- Categoría: ${category}`;
        if (minPrice) response += `\n- Precio mínimo: ${minPrice}`;
        if (maxPrice) response += `\n- Precio máximo: ${maxPrice}`;
    }

    if (sort) {
        response += `\nOrdenado por: ${sort} (${order || 'asc'})`;
    }

    res.send(response);
});

// GET /products/featured con filtros
// GET /products/featured?limit=5&category=electronics
router.get('/featured', (req, res) => {
    const { limit, category } = req.query;
    res.send(`Mostrando ${limit || 'todos los'} productos destacados${category ? ` de ${category}` : ''}`);
});

// GET /products/categories con subcategorías
// GET /products/categories/:mainCategory
router.get('/categories/:mainCategory?', (req, res) => {
    const { mainCategory } = req.params;
    const { sub } = req.query;

    if (mainCategory) {
        if (sub) {
            res.send(`Mostrando subcategoría ${sub} de ${mainCategory}`);
        } else {
            res.send(`Mostrando todas las subcategorías de ${mainCategory}`);
        }
    } else {
        res.send('Lista de todas las categorías principales');
    }
});

// GET /products/:id/reviews con filtros
// GET /products/:id/reviews?rating=5&sort=date
router.get('/:id/reviews', (req, res) => {
    const { id } = req.params;
    const { rating, sort } = req.query;
    
    let response = `Reseñas del producto ${id}`;
    if (rating) {
        response += `\nFiltrado por ${rating} estrellas`;
    }
    if (sort) {
        response += `\nOrdenado por: ${sort}`;
    }
    
    res.send(response);
});

// POST /products/:id/reviews para añadir reseña
router.post('/:id/reviews', (req, res) => {
    const { id } = req.params;
    const { rating, comment, userName } = req.body;
    
    res.send(`Nueva reseña para producto ${id}:
        Usuario: ${userName || 'Anónimo'}
        Puntuación: ${rating || 'No especificada'}
        Comentario: ${comment || 'Sin comentario'}`);
});

// GET /products/search con búsqueda avanzada
// GET /products/search?q=laptop&brand=dell&minPrice=500&maxPrice=1000&inStock=true
router.get('/search', (req, res) => {
    const { q, brand, minPrice, maxPrice, inStock } = req.query;
    
    res.send(`Búsqueda de productos:
        Término: ${q || 'No especificado'}
        Marca: ${brand || 'Todas'}
        Rango de precio: ${minPrice || '0'} - ${maxPrice || 'sin límite'}
        ${inStock === 'true' ? 'Solo productos en stock' : 'Todos los productos'}`);
});

module.exports = router; 