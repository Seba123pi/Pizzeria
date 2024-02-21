import React, { useState, useEffect } from 'react';

const App = () => {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null); // Estado para almacenar la pizza seleccionada

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pizzas'); 
        if (!response.ok) {
          throw new Error('Error al obtener las pizzas');
        }
        const data = await response.json();
        console.log('Datos de pizzas recibidos:', data); // Verificar los datos recibidos
        setPizzas(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchPizzas();
  }, []);

  // Función para manejar la selección de una pizza
  const handlePizzaSelect = (pizza) => {
    setSelectedPizza(pizza);
  };

  // Función para enviar la pizza seleccionada al servidor
  const handleOrderSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedPizza)
      });
      if (!response.ok) {
        throw new Error('Error al enviar el pedido');
      }
      console.log('Pedido enviado con éxito!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Lista de Pizzas</h1>
      {pizzas.length > 0 ? (
        <ul>
          {pizzas.map(pizza => (
            <li key={pizza.name} onClick={() => handlePizzaSelect(pizza)}>
              <strong>{pizza.name}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>Cargando...</p>
      )}
      {selectedPizza && (
        <div>
          <h2>Pizza seleccionada:</h2>
          <p>Nombre: {selectedPizza.name}</p>
          <p>Precio: ${selectedPizza.price}</p>
          <button onClick={handleOrderSubmit}>Enviar Pedido</button>
        </div>
      )}
    </div>
  );
};

export default App;