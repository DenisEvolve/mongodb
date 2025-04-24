// Variables globales
//const API_URL = 'http://localhost:3000/api';
const API_URL = 'https://mongodb-lrzi.onrender.com/api';

let currentSection = 'users';

// Elementos del DOM
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');
const userForm = document.getElementById('user-form');
const productForm = document.getElementById('product-form');
const userSearch = document.getElementById('user-search');
const productSearch = document.getElementById('product-search');
const usersTable = document.getElementById('users-table').querySelector('tbody');
const productsTable = document.getElementById('products-table').querySelector('tbody');

// Navegación entre secciones
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const section = button.dataset.section;
        switchSection(section);
    });
});

function switchSection(section) {
    // Actualizar botones de navegación
    navButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === section);
    });
    
    // Actualizar secciones visibles
    sections.forEach(s => {
        s.classList.toggle('active', s.id === `${section}-section`);
    });
    
    currentSection = section;
    
    // Cargar datos de la sección actual
    if (section === 'users') {
        loadUsers();
    } else {
        loadProducts();
    }
}

// Funciones para usuarios
async function loadUsers() {
    try {
        const response = await fetch(`${API_URL}/users`);
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        alert('Error al cargar usuarios. Por favor, inténtalo de nuevo.');
    }
}

function displayUsers(users) {
    usersTable.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.nombre}</td>
            <td>${user.email}</td>
            <td>${user.saldoEuros}€</td>
            <td>
                <button class="action-btn edit-btn" onclick="editUser('${user._id}')">Editar</button>
                <button class="action-btn delete-btn" onclick="deleteUser('${user._id}')">Eliminar</button>
            </td>
        `;
        usersTable.appendChild(row);
    });
}

async function createUser(userData) {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al crear usuario');
        }
        
        await loadUsers();
        userForm.reset();
        alert('Usuario creado correctamente');
    } catch (error) {
        console.error('Error al crear usuario:', error);
        alert(error.message || 'Error al crear usuario. Por favor, inténtalo de nuevo.');
    }
}

async function updateUser(id, userData) {
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al actualizar usuario');
        }
        
        await loadUsers();
        userForm.reset();
        document.getElementById('user-id').value = '';
        alert('Usuario actualizado correctamente');
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        alert(error.message || 'Error al actualizar usuario. Por favor, inténtalo de nuevo.');
    }
}

async function deleteUser(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al eliminar usuario');
        }
        
        await loadUsers();
        alert('Usuario eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert(error.message || 'Error al eliminar usuario. Por favor, inténtalo de nuevo.');
    }
}

async function editUser(id) {
    try {
        const response = await fetch(`${API_URL}/users/${id}`);
        const user = await response.json();
        
        document.getElementById('user-id').value = user._id;
        document.getElementById('nombre').value = user.nombre;
        document.getElementById('email').value = user.email;
        document.getElementById('saldoEuros').value = user.saldoEuros;
        document.getElementById('cuentaBancaria').value = user.cuentaBancaria;
        document.getElementById('telefono').value = user.telefono;
        document.getElementById('codigoDepartamento').value = user.codigoDepartamento;
        document.getElementById('codigoPostal').value = user.codigoPostal;
    } catch (error) {
        console.error('Error al cargar usuario para editar:', error);
        alert('Error al cargar usuario para editar. Por favor, inténtalo de nuevo.');
    }
}

// Funciones para productos
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar productos:', error);
        alert('Error al cargar productos. Por favor, inténtalo de nuevo.');
    }
}

function displayProducts(products) {
    productsTable.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.nombre}</td>
            <td>${product.precio}€</td>
            <td>${product.stock}</td>
            <td>${product.categoria}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editProduct('${product._id}')">Editar</button>
                <button class="action-btn delete-btn" onclick="deleteProduct('${product._id}')">Eliminar</button>
            </td>
        `;
        productsTable.appendChild(row);
    });
}

async function createProduct(productData) {
    try {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al crear producto');
        }
        
        await loadProducts();
        productForm.reset();
        alert('Producto creado correctamente');
    } catch (error) {
        console.error('Error al crear producto:', error);
        alert(error.message || 'Error al crear producto. Por favor, inténtalo de nuevo.');
    }
}

async function updateProduct(id, productData) {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al actualizar producto');
        }
        
        await loadProducts();
        productForm.reset();
        document.getElementById('product-id').value = '';
        alert('Producto actualizado correctamente');
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        alert(error.message || 'Error al actualizar producto. Por favor, inténtalo de nuevo.');
    }
}

async function deleteProduct(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al eliminar producto');
        }
        
        await loadProducts();
        alert('Producto eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert(error.message || 'Error al eliminar producto. Por favor, inténtalo de nuevo.');
    }
}

async function editProduct(id) {
    try {
        const response = await fetch(`${API_URL}/products/${id}`);
        const product = await response.json();
        
        document.getElementById('product-id').value = product._id;
        document.getElementById('product-nombre').value = product.nombre;
        document.getElementById('product-descripcion').value = product.descripcion;
        document.getElementById('product-precio').value = product.precio;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-categoria').value = product.categoria;
        document.getElementById('product-marca').value = product.marca;
        document.getElementById('product-codigo').value = product.codigo;
    } catch (error) {
        console.error('Error al cargar producto para editar:', error);
        alert('Error al cargar producto para editar. Por favor, inténtalo de nuevo.');
    }
}

// Event listeners para formularios
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const userId = document.getElementById('user-id').value;
    const userData = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        saldoEuros: parseFloat(document.getElementById('saldoEuros').value),
        cuentaBancaria: document.getElementById('cuentaBancaria').value,
        telefono: document.getElementById('telefono').value,
        codigoDepartamento: document.getElementById('codigoDepartamento').value,
        codigoPostal: document.getElementById('codigoPostal').value
    };
    
    if (userId) {
        updateUser(userId, userData);
    } else {
        createUser(userData);
    }
});

productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const productId = document.getElementById('product-id').value;
    const productData = {
        nombre: document.getElementById('product-nombre').value,
        descripcion: document.getElementById('product-descripcion').value,
        precio: parseFloat(document.getElementById('product-precio').value),
        stock: parseInt(document.getElementById('product-stock').value),
        categoria: document.getElementById('product-categoria').value,
        marca: document.getElementById('product-marca').value,
        codigo: document.getElementById('product-codigo').value
    };
    
    if (productId) {
        updateProduct(productId, productData);
    } else {
        createProduct(productData);
    }
});

// Event listeners para botones de cancelar
document.getElementById('cancel-user').addEventListener('click', () => {
    userForm.reset();
    document.getElementById('user-id').value = '';
});

document.getElementById('cancel-product').addEventListener('click', () => {
    productForm.reset();
    document.getElementById('product-id').value = '';
});

// Búsqueda
userSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = usersTable.querySelectorAll('tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

productSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = productsTable.querySelectorAll('tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

// Cargar datos iniciales
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
}); 