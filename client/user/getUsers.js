const getUsers = async () => {
  try {
    console.log('Intentando obtener usuarios...');
    
    const response = await fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Usuarios obtenidos:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

// Para poder ejecutarlo directamente
getUsers(); 