document.addEventListener('DOMContentLoaded', () => {
    // Hacer una solicitud a la API de Mercado Libre para obtener lámparas LED
    fetch('https://api.mercadolibre.com/sites/MLA/search?q=lamparas+LED&limit=5')
        .then(response => response.json())
        .then(data => mostrarListadoEnCarousel(data.results))
        .catch(error => console.error('Error al obtener los datos de Mercado Libre:', error));
});

// Función para mostrar el listado de lámparas LED en el carousel
function mostrarListadoEnCarousel(lamparas) {
    const carouselInner = document.getElementById('carouselItems');
    carouselInner.innerHTML = ''; // Limpiar cualquier contenido anterior

    lamparas.forEach((lampara, index) => {
        // Verificar si hay imágenes en alta resolución disponibles
        const imageUrl = lampara.pictures && lampara.pictures.length > 0 
                         ? lampara.pictures[0].url // Imagen de mejor calidad
                         : lampara.thumbnail; // Usar el thumbnail como respaldo

        let carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) {
            carouselItem.classList.add('active'); // Hacer la primera lámpara activa
        }

        carouselItem.innerHTML = `
            <img src="${imageUrl}" class="d-block w-100" alt="${lampara.title}" style="max-height: 600px; object-fit: cover;">
            <div class="carousel-caption">
                <h5>${lampara.title}</h5>
                <p>Precio: $${lampara.price}</p>
                <a href="${lampara.permalink}" target="_blank" class="btn btn-primary">Ver en Mercado Libre</a>
            </div>
        `;

        carouselInner.appendChild(carouselItem);
    });
}
