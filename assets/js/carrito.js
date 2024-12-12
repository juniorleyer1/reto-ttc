
//DOM
document.addEventListener('DOMContentLoaded', () => { 
    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'ACEITE MAZDA ALEGRO 20W-50G',
            precio: 120000,
            imagen: 'img/20W-50G X3.jpg',
            categoria: 'aceites'
        },
        {
            id: 2,
            nombre: 'ACEITE HUYNDAI ACCENT 20W-50G',
            precio: 130000,
            imagen: 'img/20W-50G X3.jpg',
            categoria: 'aceites'
        },
        {
            id: 3,
            nombre: 'ACEITE RENAULT LOGAN 20W-50G',
            precio: 110000,
            imagen: 'img/20W-50G X3.jpg',
            categoria: 'aceites'
        },
        {
            id: 4,
            nombre: 'EXPLORADORAS EXP01 MAZDA ALLEGRO',
            precio: 170000,
            imagen: 'img/RL333.jpg',
            categoria: 'exploradoras'
        },
        {
            id: 5,
            nombre: 'EXPLORADORAS EXP02 HUYNDAI ACCENT',
            precio: 180000,
            imagen: 'img/RL334.jpg',
            categoria: 'exploradoras'
        },
        {
            id: 6,
            nombre: 'EXPLORADORAS EXP03 RENAULT LOGAN',
            precio: 150000,
            imagen: 'img/RL335.jpg',
            categoria: 'exploradoras'
        },
        // cambiar
        {
            id: 7,
            nombre: 'CAPOT CAP1 MAZDA',
            precio: 800000,
            imagen: 'img/CAP1.jpg',
            categoria: 'capot'
        },
        {
            id: 8,
            nombre: 'CAPOT CAP2 HUYNDAI',
            precio: 750000,
            imagen: 'img/CAP2.jpg',
            categoria: 'capot'
        },
        {
            id: 9,
            nombre: 'CAPOT CAP3 RENAULT',
            precio: 900000,
            imagen: 'img/CAP3.jpg',
            categoria: 'capot'
        },
        // 
        {
            id: 10,
            nombre: 'CAJA DIRECCIONES MAZDA',
            precio: 1200000,
            imagen: 'img/56510-22012.jpg',
            categoria: 'cajadirecciones'
        },
        {
            id: 11,
            nombre: 'CAJA DIRECCIONES HYUNDAI',
            precio: 1300000,
            imagen: 'img/56510-22024.jpg',
            categoria: 'cajadirecciones'
        },
        {
            id: 12,
            nombre: 'CAJA DIRECCIONES RENAULT',
            precio: 1250000,
            imagen: 'img/56510-22235.jpg',
            categoria: 'cajadirecciones'
        },
        {
            id: 13,
            nombre: 'VENTILADOR MAZDA',
            precio: 50000,
            imagen: 'img/RX011.jpg',
            categoria: 'cajadirecciones'
        },
        {
            id: 14,
            nombre: 'VENTILADOR HUYNDAI',
            precio: 60000,
            imagen: 'img/RX012.jpg',
            categoria: 'cajadirecciones'
        },
        {
            id: 15,
            nombre: 'VENTILADOR RENAULT',
            precio: 60000,
            imagen: 'img/RX013.jpg',
            categoria: 'cajadirecciones'
        },
    ];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;
    const filtroSelect = document.getElementById("filtro");

    // Funciones

    function renderizarProductos() {
        DOMitems.innerHTML = "";
        const filtro = filtroSelect.value;
        const productosFiltrados = baseDeDatos.filter(producto => 
            filtro === "todas" || producto.categoria === filtro
        );
        productosFiltrados.forEach((info) => {
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            const miNodoTitle = document.createElement('h6');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = 'Agregar';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anadirProductoAlCarrito);
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }
// Obtén el contador del almacenamiento local
    let visitas = localStorage.getItem('contadorVisitas');
// Si no hay visitas almacenadas, inicializa a 0
    if (!visitas) {
        visitas = 0;
    }
// Incrementa el contador
    visitas++;
// Guarda el nuevo contador en el almacenamiento local
    localStorage.setItem('contadorVisitas', visitas);
// Muestra el contador en la página
    document.getElementById('contador').textContent = visitas;
    function anadirProductoAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'));
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
        handleCarritoValue(carrito.length);
    }
    function handleCarritoValue(value) {
        const carritoContainer = document.getElementById("carrito-value");
        carritoContainer.textContent = `${value}`;
    }
    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        DOMtotal.textContent = calcularTotal();
    }
    //borra carrito
    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
        handleCarritoValue(carrito.length);
    }
    //calcular el total
    function calcularTotal() {
        return carrito.reduce((total, item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }
    //vaciar todos los elementos del carrito
    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
        localStorage.clear();
    }
    //guardar en local el carrito
    function guardarCarritoEnLocalStorage() {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }
    //cargar del local el carriro
    function cargarCarritoDeLocalStorage() {
        if (miLocalStorage.getItem('carrito') !== null) {
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
            handleCarritoValue(carrito.length);
        }
    }
    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    filtroSelect.addEventListener('change', renderizarProductos);
    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
});