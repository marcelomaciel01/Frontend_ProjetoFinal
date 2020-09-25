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

        let data = {
            "racf" : user,
            "senha": pass
        };

        let options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type" : "application/json; charset=UTF-8"
            }
        };
        
        fetch(url, options)
            .then(res => trataStatus(res));
        
        function trataStatus(res) {
            if(res.status == 200) {
                res.json()
                .then(user => redirecionar(user));
            }
            else if(res.status == 401) {
                document.getElementById("msgErro").innerHTML = "Senha Incorreta!";
            }
            else if (res.status == 404) {
                document.getElementById("msgErro").innerHTML = "Usuario Desconhecido!";
            }
            else {
                document.getElementById("msgErro").innerHTML = "Erro Desconhecido!";
            }
        }

        function redirecionar(user) {
            localStorage.setItem("userHE", JSON.stringify(user));
            if(user.gestor == 0) {
                location.href = "http://web.equipealfa.com.br/ProjetoFinal/acesso_gestor.html";
                
            }
            else {
                location.href = "http://web.equipealfa.com.br/ProjetoFinal/acesso_colaborador.html";
            }
        }
        document.getElementById("loader").style.display = "none";
    }
}

function logout() {
    localStorage.removeItem("userHE");
    location.href = "http://web.equipealfa.com.br/ProjetoFinal/index.html";
}