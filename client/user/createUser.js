const createUser = async () => {
  const userData = {
    nombre: "Ernesto",
    email: "Ernesto@gmail.com",
    saldoEuros: 1000,
    cuentaBancaria: "ES1234567890123456789012",
    telefono: "+34666555444",
    codigoDepartamento: "IT001",
    codigoPostal: "28001"
  };

  try {
    console.log('Enviando datos:', userData);
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al crear usuario');
    }

    const data = await response.json();
    console.log('Usuario creado:', data);
    return data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

// Para poder ejecutarlo directamente
createUser(); 