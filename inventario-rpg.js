const readlineSync = require('readline-sync');

const nombreJugador = readlineSync.question('Ingresa tu user: ');
console.log(`Bienvenido, ${nombreJugador}`);

let oro = Number(readlineSync.question('Ingrese la cantidad de oro: '));

while (isNaN(oro) || oro <= 0 ) {
    console.log('cantidad invalida, vuelva a intentar');
    oro = Number(readlineSync.question('Ingrese la cantidad de oro: '));
}

let juegoActivo = true;

const inventario = [
    {nombre: 'Pocion de vida', tipo: 'Pocion', precio: 25, cantidad: 2},
    {nombre: 'Espada de hierro', tipo: 'Arma', precio: 120, cantidad: 1},
    {nombre: 'Escudo de madera', tipo: 'Armadura', precio: 30, cantidad: 1},
    
];

const tienda = [
    {nombre: 'Arco', tipo: 'Arma', precio: 70, cantidad: 10},
    {nombre: 'Daga', tipo: 'Arma', precio: 50, cantidad: 6},
    {nombre: 'Armadura de hierro', tipo: 'Armadura', precio: 250, cantidad: 5},
    {nombre: 'Pocion de vida', tipo: 'Pocion', precio: 25, cantidad: 8},
    {nombre: 'Escudo de hierro', tipo: 'Armadura', precio: 60, cantidad: 4},
];

function mostrarInventario() {
    if (inventario.length === 0){
        console.log('No tienes objetos en el inventario');
        return;
    }

    for (let i = 0; i < inventario.length; i++) {
        console.log(`${i + 1}. ${inventario[i].nombre} | ${inventario[i].tipo} | ${inventario[i].precio} | ${inventario[i].cantidad}`)
    }
}

function calcularTotal() {
    let total = 0;

    for (let i = 0; i < inventario.length; i++) {
        total += inventario[i].precio * inventario[i].cantidad;
    }
    return total;
}

function comprarObjeto (nombre, cantidad) {
    console.log('Buscando:', nombre);
    const objeto = tienda.find(item => item.nombre.toLowerCase() === nombre.toLowerCase());

    if (!objeto) {
    console.log('Ese item no existe en la tienda');
    return;
    }

    const costo = objeto.precio * cantidad;
    
    if (oro >= costo && cantidad <= objeto.cantidad && cantidad > 0) {
        oro -= costo;
        objeto.cantidad -= cantidad;

        const enInventario = inventario.find(item => item.nombre.toLowerCase() === nombre.toLowerCase());
        if (enInventario) {
            enInventario.cantidad += cantidad;
        } else {
            inventario.push({
                nombre: objeto.nombre,
                tipo: objeto.tipo,
                precio: objeto.precio,
                cantidad: cantidad
            });
        }

        console.log(`Compraste ${cantidad} x ${objeto.nombre}. Oro restante: ${oro}`);
    } else {
        console.log('No se pudo hacer la compra, no tienen suficiente plata');
    }
        
}

while (juegoActivo) {
    console.log('\n====== INVENTARIO ======');
    console.log(`Jugador: ${nombreJugador}  |  Oro: ${oro}\n`);
    console.log('1. Ver inventario');
    console.log('2. Ir a la tienda');
    console.log('3. Ver valor total');
    console.log('4. Salir');

    const opcion = readlineSync.question('Elige una opcion: '); 

    if (opcion === '1') {
        mostrarInventario();
    } else if (opcion === '2') {
        console.log('\n----- TIENDA -----');
        for (let i = 0; i < tienda.length; i++) {
            console.log(`${i + 1}. ${tienda[i].nombre} | ${tienda[i].tipo} | Precio: ${tienda[i].precio} | Stock: ${tienda[i].cantidad}`);
        }

        const nombre = readlineSync.question('Que objeto quieres comprar? ');
        const cantidad = Number(readlineSync.question('Cuantas unidades? '));

        comprarObjeto(nombre, cantidad);
    } else if (opcion === '3') {
        console.log(`Valor total del inventario: ${calcularTotal()}`);
    } else if (opcion === '4') {
        juegoActivo = false;
        console.log('chao pescado');
    } else {
        console.log('Opcion invalida, intenta de nuevo.');
    }
    

}