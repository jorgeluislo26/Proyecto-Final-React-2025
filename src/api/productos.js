export const obtenerProductos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          nombre: "Mate Imperial",
          precio: 2500,
          imagen: "https://via.placeholder.com/150"
        },
        {
          id: 2,
          nombre: "Termo Stanley",
          precio: 8500,
          imagen: "https://via.placeholder.com/150"
        },
        {
          id: 3,
          nombre: "Bombilla de acero",
          precio: 1200,
          imagen: "https://via.placeholder.com/150"
        }
      ]);
    }, 1000);
  });
};