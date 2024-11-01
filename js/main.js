const listaProductosElement = document.getElementById('lista-productos');
const formularioProducto = document.getElementById('formulario-producto');
const nombreProductoInput = document.getElementById('nombre-producto');
const cantidadProductoInput = document.getElementById('cantidad-producto');
const precioProductoInput = document.getElementById('precio-producto');

const productosIniciales = [
    { nombre: 'Procesador Intel Core i9 14900KS 6.2GHz Turbo Socket 1700 Raptor Lake', cantidad: 20, precio: 933570 },
    { nombre: 'Placa de Video ASUS ROG Strix GeForce RTX 4090 24GB GDDR6X BTF OC Edition', cantidad: 8, precio: 2972550 },
    { nombre: 'Placa de Video Zotac GeForce RTX 4060 Ti 16GB GDDR6 AMP', cantidad: 31, precio: 632930 },
    { nombre: 'Auriculares Razer BLACKSHARK V2 PRO Wireless USB-C White PC/PS5/XBOX', cantidad: 3, precio: 322990 },
    { nombre: 'Teclado Mecanico Razer BlackWidow V4 Pro RGB Switch Yellow Linear', cantidad: 15, precio: 264990 }
];

// inicializa productos en localStorage solo si no hay productos guardados
function inicializarProductos() {
    let productos = JSON.parse(localStorage.getItem('productos'));
    if (!productos || productos.length === 0) {
        localStorage.setItem('productos', JSON.stringify(productosIniciales));
    }
}

// muestra los productos en la lista
function mostrarProductos() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    listaProductosElement.innerHTML = productos.map((producto, index) => `
        <div class="producto">
            <span class="productonombre">${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio.toFixed(2)}</span>
            <div class="acciones">
                <input type="number" class="cantidad-quitar" placeholder="Quitar" min="1" max="${producto.cantidad}">
                <button class="boton-quitar" data-index="${index}">Quitar</button>
                <button class="boton-eliminar" data-index="${index}">Eliminar</button>
            </div>
        </div>
    `).join('');
}

// agrega el producto
function agregarProducto(nombre, cantidad, precio) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    
    // busca si el producto ya existe en la lista
    const productoExistente = productos.find(producto => producto.nombre === nombre);
    if (productoExistente) {
        // si ya existe el producto suma la cantidad al producto existente
        productoExistente.cantidad += cantidad;
    } else {
        // si no existe el producto, lo agrega
        productos.push({ nombre, cantidad, precio });
    }

    // guarda en localStorage y muestra la lista actualizada
    localStorage.setItem('productos', JSON.stringify(productos));
    mostrarProductos();
}

// quita los productos del array
function quitarProducto(index, cantidadQuitar) {
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    const producto = productos[index];
    
    if (producto) {
        producto.cantidad -= cantidadQuitar;
        if (producto.cantidad <= 0) {
            productos.splice(index, 1);
        }
        localStorage.setItem('productos', JSON.stringify(productos));
        mostrarProductos();
    }
}

// elimina un producto
function eliminarProducto(index) {
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    productos.splice(index, 1);
    localStorage.setItem('productos', JSON.stringify(productos));
    mostrarProductos();
}

// evento para agregar un producto manualmente
formularioProducto.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = nombreProductoInput.value.trim();
    const cantidad = parseInt(cantidadProductoInput.value);
    const precio = parseFloat(precioProductoInput.value);

    if (nombre && cantidad > 0 && precio >= 0) {
        agregarProducto(nombre, cantidad, precio);
        nombreProductoInput.value = '';
        cantidadProductoInput.value = '';
        precioProductoInput.value = '';
    }
});

// evento para quitar o eliminar productos
listaProductosElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('boton-quitar')) {
        const index = event.target.getAttribute('data-index');
        const cantidadInput = event.target.previousElementSibling;
        const cantidadQuitar = parseInt(cantidadInput.value) || 0;

        if (cantidadQuitar > 0) {
            quitarProducto(index, cantidadQuitar);
            cantidadInput.value = '';
        }
    } else if (event.target.classList.contains('boton-eliminar')) {
        const index = event.target.getAttribute('data-index');
        eliminarProducto(index);
    }
});

// inicializa la aplicacion
inicializarProductos();
mostrarProductos();


