window.addEventListener('load', function() {

    const formularioLogin = document.querySelector('#login')

    formularioLogin.addEventListener('submit',function(evento){

        // evento.preventDefault()

        const emailUsuarioLogin = document.querySelector("#email-usuario-login")
        if(emailUsuarioLogin.value.length < 2){
            console.log('Ingrese el email')
        } 
        
        let emailLogin = emailUsuarioLogin.value;
        let  patronEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!patronEmail.exec(emailLogin)){
                alert('Por favor use un formato valido en el email ');
        }

        const contraseñaUsuarioLogin = document.querySelector("#contraseña-usuario-login")
        if(contraseñaUsuarioLogin.value.length < 2){
            console.log('Ingrese la contraseña')
        }

    })

})
