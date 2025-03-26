const updateUser = async () => {
  const userId = '123'; // Reemplaza con el ID del usuario a actualizar
  const userData = {
    name: "Usuario Actualizado",
    email: "actualizado@ejemplo.com",
    // Añade aquí los campos a actualizar
  };

  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('Usuario actualizado:', data);
    return data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

// Para poder ejecutarlo directamente
updateUser(); 