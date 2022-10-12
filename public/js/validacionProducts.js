window.addEventListener('load', function() {

    // Capturo formulario creación de productos
    const formulario = document.querySelector('#form-products')

    formulario.addEventListener('submit',function(evento){
        // evento.preventDefault()

        const nombre = document.querySelector("#nombre")
        if(nombre.value.length < 5){
            console.log('Hubo un error en el nombre')
        }

        const descripcion = document.querySelector("#descripcion")
        if(descripcion.value.length < 20){
            console.log('Hubo un error en la descripcion')
        }

        const fotoProducto = document.querySelector("#foto-producto")
        let filePath = fotoProducto.value;
        let  allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
        if(!allowedExtensions.exec(filePath)){
                alert('Por favor use un formato valido : .jpeg/.jpg/.png/.gif only.');
        }

    })
        
        
})

