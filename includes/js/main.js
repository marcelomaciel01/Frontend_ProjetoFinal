function validaLogin() {
    document.getElementById("loader").style.display = "block";
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;

    if(user == "" || user.lenght < 7) {
        alert("Preencha o Campo Usu\u00e1rio Corretamente!");
        document.getElementById("username").focus();
        return false;
    }
    else if(pass == "" || pass.lenght == 0) {
        alert("Preencha o Campo Senha Corretamente!");
        document.getElementById("password").focus();
        return false;
    }
    else {
        let url = "http://web.equipealfa.com.br:8088/usuarios/login";

        let head = {
            "Content-type" : "application/json; charset=UTF-8"
        };

        let data = {
            "racf" : user,
            "senha": pass
        };

        let options = {
            method: 'POST',
            headers: head,
            body: JSON.stringify(data)
        };
        
        fetch(url, options)
        .then(function(response) {
            return response.json();

        });
    }
}