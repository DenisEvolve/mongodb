const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - nombre
 *         - descripcion
 *         - precio
 *         - stock
 *         - categoria
 *         - marca
 *         - codigoProducto
 *         - fechaFabricacion
 *         - garantiaMeses
 *         - peso
 *         - dimensiones
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del producto
 *         descripcion:
 *           type: string
 *           description: Descripción detallada del producto
 *         precio:
 *           type: number
 *           minimum: 0
 *           description: Precio del producto en euros
 *         stock:
 *           type: number
 *           minimum: 0
 *           description: Cantidad disponible en stock
 *         categoria:
 *           type: string
 *           description: Categoría del producto
 *         marca:
 *           type: string
 *           description: Marca del producto
 *         codigoProducto:
 *           type: string
 *           description: Código único del producto
 *         fechaFabricacion:
 *           type: string
 *           format: date
 *           description: Fecha de fabricación del producto
 *         garantiaMeses:
 *           type: number
 *           minimum: 0
 *           description: Meses de garantía del producto
 *         peso:
 *           type: number
 *           minimum: 0
 *           description: Peso del producto en kg
 *         dimensiones:
 *           type: object
 *           required:
 *             - alto
 *             - ancho
 *             - profundidad
 *           properties:
 *             alto:
 *               type: number
 *               minimum: 0
 *               description: Altura del producto en cm
 *             ancho:
 *               type: number
 *               minimum: 0
 *               description: Ancho del producto en cm
 *             profundidad:
 *               type: number
 *               minimum: 0
 *               description: Profundidad del producto en cm
 *         coloresDisponibles:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de colores disponibles
 *         etiquetas:
 *           type: array
 *           items:
 *             type: string
 *           description: Etiquetas del producto
 *         imagenes:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs de las imágenes del producto
 *         esActivo:
 *           type: boolean
 *           description: Estado del producto
 *         fechaCreacion:
 *           type: string
 *           format: date
 *           description: Fecha de creación del registro
 *         ultimaActualizacion:
 *           type: string
 *           format: date
 *           description: Fecha de última actualización
 */

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true,
        min: [0, 'El precio no puede ser negativo']
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'El stock no puede ser negativo']
    },
    categoria: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    codigoProducto: {
        type: String,
        required: true,
        unique: true
    },
    fechaFabricacion: {
        type: Date,
        required: true
    },
    garantiaMeses: {
        type: Number,
        required: true,
        min: [0, 'La garantía no puede ser negativa']
    },
    peso: {
        type: Number,
        required: true,
        min: [0, 'El peso no puede ser negativo']
    },
    dimensiones: {
        alto: {
            type: Number,
            required: true,
            min: [0, 'La altura no puede ser negativa']
        },
        ancho: {
            type: Number,
            required: true,
            min: [0, 'El ancho no puede ser negativo']
        },
        profundidad: {
            type: Number,
            required: true,
            min: [0, 'La profundidad no puede ser negativa']
        }
    },
    coloresDisponibles: [String],
    etiquetas: [String],
    imagenes: [String],
    esActivo: {
        type: Boolean,
        default: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    ultimaActualizacion: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 