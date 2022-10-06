window.addEventListener('load', function() {

    // Capturo formulario creación de productos
    const formularioRegister = document.querySelector('#register')

    formularioRegister.addEventListener('submit',function(evento){
        
        const nombreUsuario = document.querySelector("#nombre-usuario-register")
        if(nombreUsuario.value.length < 2){
            console.log('Hubo un error en el nombre')
        }

        const apellidoUsuario = document.querySelector("#apellido-usuario-register")
        if(apellidoUsuario.value.length < 2){
            console.log('Hubo un error en el apellido')
        }

        const emailUsuario = document.querySelector("#email-usuario-register")
        if(emailUsuario.value.length == 0){
            console.log('Hubo un error en el email')
        }      
        let emailRegister = emailUsuario.value;
        let  patronEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!patronEmail.exec(emailRegister)){
                alert('Por favor use un formato valido en el email ');
        }


        const fotoUsuario = document.querySelector("#foto-usuario-register")
        let foto = fotoUsuario.value;
        let  allowedExtensions = /\s+|(.jpg|.jpeg|.png|.gif)$/i;
        if(!allowedExtensions.exec(foto)){
                alert('Por favor use un formato valido en la foto de perfil : .jpeg/.jpg/.png/.gif');
        }

        const contraseñaUsuario = document.querySelector("#contraseña-usuario-register")
        if(contraseñaUsuario.value.length < 8){
            console.log('Hubo un error en la contraseña')
        }

    })
        
        

    




})