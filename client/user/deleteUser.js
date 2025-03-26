const deleteUser = async () => {
  const userId = '123'; // Reemplaza con el ID del usuario a eliminar

  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('Usuario eliminado:', data);
    return data;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};

// Para poder ejecutarlo directamente
deleteUser(); 