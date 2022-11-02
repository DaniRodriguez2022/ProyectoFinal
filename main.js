class Producto {
    constructor(id, nombre, img, precio){
        this.id = id;
        this.nombre = nombre;
        this.img = img;
        this.precio = precio;
        this.cantidad = 1;

    }
}

const regularFit = new Producto(1, "Royal Canin, Regular Fit Cat","img/img/producto1.png", 30);
const secondAgeKitten = new Producto(2, "Royal Canin, Second Age Kitten","img/img/producto2.png", 25);
const sterilized = new Producto(3, "Purina Poplan, Sterilized Cat","img/img/producto3.png", 40);
const defensePlus = new Producto(4, "Purina Cat Chow, Defense Plus","img/img/producto4.png", 15);
const complete = new Producto(5, "Vital Can, Complete","img/img/producto5.png", 35);
const healthyMaintenance = new Producto(6, "Nutrique, Healthy Maintenance","img/img/producto6.png", 50);
const optihealth= new Producto(7, "Purina Proplan, Optihealth with spirulina","img/img/producto7.png", 20);
const medium = new Producto(8, "Royal Canin, Medium Dog","img/img/producto8.png", 30);
const ageing = new Producto(9, "Royal Canin, Maxi - Ageing","img/img/producto9.jpg", 35);
const adultMediumBreed = new Producto(10, "Eukanuba, Adult Medium Breed","img/img/producto10.png",45);

const productos10 = [regularFit, secondAgeKitten, sterilized, defensePlus, complete, healthyMaintenance, optihealth, medium, ageing, adultMediumBreed];

let carritoDeCompras = [];

if (localStorage.getItem("carritoDeCompras")) {
    carritoDeCompras = JSON.parse(localStorage.getItem("carritoDeCompras"));
}

if(localStorage.getItem("carritoDeCompras")) {
    carritoDeCompras = JSON.parse(localStorage.getItem("carritoDeCompras"));
}
const boxProductos = document.getElementById ("boxProductos");

const mostrarProductos = () => {
    productos10.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                 
               <h4 class="card-title"> ${producto.nombre}</h4>

                <div class="card-body tarjeta">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <p class="card-text"> €${producto.precio} </p>
                <button class="btn colorBoton" id="boton${producto.id}"> Comprar </button>
                </div>
            </div>
        `
        boxProductos.appendChild(card);
        
        const boton = document.getElementById (`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })
        })
   }

const agregarAlCarrito = (id) => {
    const producto = productos10.find((producto) => producto.id === id);
    const productoEnCarrito = carritoDeCompras.find ((producto) => producto.id===id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;

    }else {
        carritoDeCompras.push(producto);
        localStorage.setItem("carritoDeCompras", JSON.stringify(carritoDeCompras));
    }
    calcularTotal();
}
mostrarProductos ();

const contenedorCarrito = document.getElementById("contenedorCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
    calcularTotal();
});

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML="";
    carritoDeCompras.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                 
               <h4 class="card-title"> ${producto.nombre}</h4>

                <div class="card-body tarjeta">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <p class="card-text"> €${producto.precio} </p>
                <p class="card-text"> ${producto.cantidad} </p>
                <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar </button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card);

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
    })

 
}

const eliminarDelCarrito = (id) => {
    const producto = carritoDeCompras.find ((producto) => producto.id === id);
    const indice = carritoDeCompras.indexOf(producto);
    carritoDeCompras.splice(indice, 1);
    mostrarCarrito();
    calcularTotal();
    localStorage.setItem("carritoDeCompras", JSON.stringify(carritoDeCompras));
}

const vaciarCarrito= document.getElementById ("vaciarCarrito");
 vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();

})

const eliminarTodoElCarrito = () => {
    carritoDeCompras = [];
    mostrarCarrito();
    calcularTotal();
    localStorage.clear(); 
}


const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carritoDeCompras.forEach((producto) => {
        totalCompra =  totalCompra + producto.precio * producto.cantidad;
    })

    total.innerHTML = `Total: €${totalCompra}`;
}