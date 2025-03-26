const express = require('express');
const router = express.Router();

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

// POST /products para crear nuevo producto
router.post('/', (req, res) => {
    const { name, price, category, description, stock } = req.body;
    res.send(`Creando nuevo producto:
        Nombre: ${name || 'No especificado'}
        Precio: ${price || 'No especificado'}
        Categoría: ${category || 'No especificada'}
        Descripción: ${description || 'No especificada'}
        Stock: ${stock || 'No especificado'}`);
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

// PUT /products/:id para actualizar producto
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { price, stock, description } = req.body;
    
    res.send(`Actualizando producto ${id}:
        ${price ? `\nNuevo precio: ${price}` : ''}
        ${stock ? `\nNuevo stock: ${stock}` : ''}
        ${description ? `\nNueva descripción: ${description}` : ''}`);
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