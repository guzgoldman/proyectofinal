class Producto {
    constructor(id, title, artist, price, quantity) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.price = price;
        this.quantity = quantity;
    }
}

//Creo productos y los almaceno en un array:

const producto1 = new Producto(1, 'Ok Computer', 'Radiohead', 5500, 1);
const producto2 = new Producto(2, 'Origin of Symmetry', 'Muse', 4750, 1);
const producto3 = new Producto(3, 'The Beatles', 'The Beatles', 5750, 1);
const producto4 = new Producto(4, 'Abbey Road', 'The Beatles', 7000, 1);

const productos = [producto1, producto2, producto3, producto4];

//Muestro los productos modificando el DOM.

const contenedorProductos = document.getElementById('contenedorProductos');

productos.forEach((producto) => {
    const divProducto = document.createElement('div');
    divProducto.classList.add('card', 'col-xl-3', 'col-md-6', 'col-sm-12');
    divProducto.innerHTML = `
                            <div>
                                <img src="./img/${producto.id}.jpg" class="card-img-top img-fluid py-3" style="width:300px; height:300px; object-fit:cover;">
                                <div class="card-body">
                                    <h3 class="card-title"> ${producto.title}</h3>
                                    <p class="card-text">${producto.artist}</p>
                                    <p class="card-text"> ${producto.price} </p>
                                    <button id="boton${producto.id}" class="btn btn-primary"> Agregar al Carrito </button>
                                </div>
                            </div>`;
    contenedorProductos.appendChild(divProducto);
    //Agregar un evento al boton de agregar al carrito:
    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener('click', () => {
    agregarAlCarrito(producto.id);
    });
});

//Creo el carrito de compras y una función que busque el producto por id y lo agregue al carrito.

const carrito = [];

const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
    } else {
    carrito.push(producto);
    }
    actualizarCarrito();
};

//Muestro el carrito de compras modificando el DOM.

const contenedorCarrito = document.getElementById('contenedorCarrito');
const verCarrito = document.getElementById('verCarrito');

verCarrito.addEventListener('click', actualizarCarrito);

function actualizarCarrito() {
    let aux = '';
    carrito.forEach((producto) => {
        aux += `
                <div class="card col-xl-3 col-md-6 col-sm-12">
                    <img src="./img/${producto.id}.jpg" class="card-img-top img-fluid py-3">
                    <div class="card-body">
                        <h3 class="card-title"> ${producto.title} </h3>
                        <p class="card-text">${producto.artist}</p>
                        <p class="card-text"> ${producto.price} </p>
                        <button onClick = "eliminarDelCarrito(${producto.id})" class="btn btn-primary"> Eliminar del Carrito </button>
                    </div>
                </div>
                `;
    });

    contenedorCarrito.innerHTML = aux;
    calcularTotalCompra();
}

//Agrego una función que elimine el producto del carrito:

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    carrito.splice(carrito.indexOf(producto), 1);
    actualizarCarrito();
};

///Función para vaciar todo el carrito por completo:

const vaciarCarrito = document.getElementById('vaciarCarrito');
vaciarCarrito.addEventListener('click', () => {
    carrito.splice(0, carrito.length);
    actualizarCarrito();
});

//Creo una función que me calcule el total del carrito:

const totalCompra = document.getElementById('totalCompra');

const calcularTotalCompra = () => {
    let total = 0;
    carrito.forEach((producto) => {
        total += producto.price * producto.quantity;
    });
    totalCompra.innerHTML = total;
};