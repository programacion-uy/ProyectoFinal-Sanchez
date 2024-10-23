let productos = []; // Guardaremos los productos aquí

// Función para hacer la solicitud a la API de Mercado Libre y mostrar el modal
function buscarLamparas(potencia) {
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=lamparas+LED+${potencia}W&limit=10`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            productos = data.results;
            mostrarMejor(); // Mostrar inicialmente la mejor opción
            const modal = new bootstrap.Modal(document.getElementById('recomendacionModal'));
            modal.show(); // Mostrar el modal al obtener los resultados
        })
        .catch(error => console.error('Error al obtener los datos de Mercado Libre:', error));
}

// Función para mostrar el mejor producto en el modal (primero en la lista)
function mostrarMejor() {
    if (productos.length > 0) {
        const mejorProducto = productos[0]; // Mejor opción es el primero de la lista
        actualizarModal(mejorProducto);
    }
}

// Función para mostrar el producto más barato en el modal
function mostrarMasBarato() {
    if (productos.length > 0) {
        const masBarato = productos.reduce((prev, curr) => (prev.price < curr.price ? prev : curr));
        actualizarModal(masBarato);
    }
}

// Función para mostrar el producto más caro en el modal
function mostrarMasCaro() {
    if (productos.length > 0) {
        const masCaro = productos.reduce((prev, curr) => (prev.price > curr.price ? prev : curr));
        actualizarModal(masCaro);
    }
}

// Función para actualizar el contenido del modal con la información del producto
function actualizarModal(producto) {
    const modalContenido = document.getElementById('modalContenido');
    modalContenido.innerHTML = `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${producto.thumbnail}" class="img-fluid rounded-start" alt="${producto.title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${producto.title}</h5>
                        <p class="card-text">Precio: $${producto.price}</p>
                        <a href="${producto.permalink}" target="_blank" class="btn btn-primary">Comprar en Mercado Libre</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}
