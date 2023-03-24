let body = document.querySelector('.panelControlContainer')
let sidebar = document.querySelector('.panel-admin-desplegado')
let titulos = document.querySelectorAll('.texto')
let flechas = document.querySelector('.flechas')
let izq = document.querySelector('#btn-left')
let der = document.querySelector('#btn-right')
let subtitulos = document.querySelectorAll('.subtitulos')

flechas.addEventListener("click", () => {

    izq.classList.toggle("Desplegado")

    der.classList.toggle("Oculto")

    body.classList.toggle("Desplegado")

    for (var i = 0; i < titulos.length; i++) {
        titulos[i].classList.toggle('Oculto');
    }
});

izq.addEventListener("click", () => {

    for (var i = 0; i < subtitulos.length; i++) {
        subtitulos[i].classList.remove('Oculto');
    }

});

//////////////////////////////////////////////////////////////////////////////////

let productosTitulo = document.querySelector('#productos-titulo')
let usuariosTitulo = document.querySelector('#usuarios-titulo')
let descuentosTitulo = document.querySelector('#descuentos-titulo')
let pedidosTitulo = document.querySelector('#pedidos-titulo')

let productosSubtitulo = document.querySelector('#productos-subtitulos')
let usuariosSubtitulo = document.querySelector('#usuarios-subtitulos')
let descuentosSubtitulo = document.querySelector('#descuentos-subtitulos')
let pedidosSubtitulo = document.querySelector('#pedidos-subtitulos')


productosTitulo.addEventListener("click", () => {

    productosSubtitulo.classList.toggle("Oculto")

});

usuariosTitulo.addEventListener("click", () => {

    usuariosSubtitulo.classList.toggle("Oculto")

});

descuentosTitulo.addEventListener("click", () => {

    descuentosSubtitulo.classList.toggle("Oculto")

});

pedidosTitulo.addEventListener("click", () => {

    pedidosSubtitulo.classList.toggle("Oculto")

});
