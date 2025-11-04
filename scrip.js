
   const modal = document.getElementById('modal');
   const modalLista = document.getElementById('ingredientes-lista');
   const closeBtn = document.querySelector('.close-btn');
   const volverBtn = document.getElementById('volver-btn');
 
   // Diccionario de ingredientes
   const ingredientesPorProducto = {
    // Cafés con Agua
    "Espresso simple": ["Café espresso", "vaso de Agua"],
    "Espresso doble": ["Doble café espresso", "vaso de Agua"],
    "Espresso Macchiato": ["Café espresso", "Una gota de leche espumada"],
    "Espresso Bombón": ["Café espresso", "Leche condensada","leche texturizada"],
    "Americano": ["Café espresso", "Agua caliente"],
  
    // Cafés con Leche
    "Capuchino simple": ["Café espresso", "Leche texturizada", "canela en polvo"],
    "Capuchino doble": ["Doble café espresso", "Leche vaporizada", "Espuma de leche"],
    "Submarino": ["Leche caliente", "Chocolate oscuro", "Café espresso (opcional)"],
    "Bombita de chocolate": ["Leche", "Chocolate", "Espuma de leche","masmello"],
  
    // Cafés Latte
    "Latte clásico": ["Café espresso", "Leche vaporizada"],
    "Latte caramelo": ["Café espresso", "Leche vaporizada", "esencia de caramelo"],
    "Latte vainilla": ["Café espresso", "Leche vaporizada", "esencia de vainilla"],
  
    // Cafés con Crema
    "Capuchino simple": ["Café espresso", "Leche vaporizada", "Crema batida", "canela en polvo"],
    "Capuchino doble": ["Doble café espresso", "Leche vaporizada", "Crema batida"],
    "Mokachino": ["Café espresso", "Leche vaporizada", "Chocolate", "Crema batida"],
    "Submarino": ["Leche caliente", "Chocolate oscuro", "Crema batida", "canela en polvo"],
  
    // Cafés Fríos
    "Latte frío": ["Café espresso frío", "Leche fría", "Hielo"],
    "Americano frío": ["Café espresso frío", "Agua fría", "Hielo"],
    "Affogato": ["Helado de vainilla", "Café espresso caliente"],
    "Café griego": ["Café fuerte", "Agua", "Especias"],  
  };
 
   // Mostrar modal con ingredientes
   document.querySelectorAll('.ingredientes-btn').forEach(button => {
     button.addEventListener('click', function () {
       const nombreProducto = this.closest('.product-card').querySelector('p').textContent.trim();
       const ingredientes = ingredientesPorProducto[nombreProducto] || ["Ingredientes no disponibles"];
 
       modalLista.innerHTML = '';
       ingredientes.forEach(item => {
         const li = document.createElement('li');
         li.textContent = item;
         modalLista.appendChild(li);
       });
 
       modal.style.display = 'flex';
     });
   });
 
   // Cerrar modal con "X"
   closeBtn.addEventListener('click', () => {
     modal.style.display = 'none';
   });
 
   // Cerrar modal con "Volver"
   volverBtn.addEventListener('click', () => {
     modal.style.display = 'none';
   });
 
   // Cerrar al hacer clic fuera del contenido
   window.addEventListener('click', e => {
     if (e.target === modal) {
       modal.style.display = 'none';
     }
   });

  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  const formReseñas = document.getElementById('form-reseñas');
  const listaReseñas = document.getElementById('lista-reseñas');

  // Cargar reseñas almacenadas al iniciar
  document.addEventListener('DOMContentLoaded', cargarReseñas);

  formReseñas.addEventListener('submit', (e) => {
    e.preventDefault();

    const producto = document.getElementById('producto').value;
    const calificacion = document.getElementById('calificacion').value;
    const comentario = document.getElementById('comentario').value.trim();

    if (!producto || !calificacion || !comentario) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const nuevaReseña = {
      producto,
      calificacion: parseInt(calificacion),
      comentario
    };

    guardarReseña(nuevaReseña);
    mostrarReseña(nuevaReseña, true);
    formReseñas.reset();
  });

  function guardarReseña(reseña) {
    let reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];
    reseñas.push(reseña);
    localStorage.setItem('reseñas', JSON.stringify(reseñas));
  }

  function cargarReseñas() {
    let reseñas = JSON.parse(localStorage.getItem('reseñas')) || [];
    reseñas.forEach(r => mostrarReseña(r, false));
  }

  function mostrarReseña(reseña, alInicio = false) {
    const reseñaDiv = document.createElement('div');
    reseñaDiv.classList.add('reseña');

    const estrellas = '★'.repeat(reseña.calificacion) + '☆'.repeat(5 - reseña.calificacion);

    reseñaDiv.innerHTML = `
      <h4>${reseña.producto}</h4>
      <div class="calificacion">${estrellas}</div>
      <p>"${reseña.comentario}"</p>
    `;

    if (alInicio) {
      listaReseñas.prepend(reseñaDiv);
    } else {
      listaReseñas.appendChild(reseñaDiv);
    }
  }
  
