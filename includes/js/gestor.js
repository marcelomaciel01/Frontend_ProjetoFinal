function carregaInfoGestor() {
    var strUser = localStorage.getItem("userHE");
    var objUser = JSON.parse(strUser);
    var img = `<img src="${objUser.linkFoto}" class="mx-auto d-block" width="60%">`;
    var info = `Nome: ${objUser.nomeUsuario} <br>
                RACF: ${objUser.racf} <br><br>`
    document.getElementById("info").innerHTML = info;
    document.getElementById("imageUser").innerHTML = img;
}

function logout() {
    localStorage.removeItem("userHE");
    location.href = "http://web.equipealfa.com.br/ProjetoFinal/index.html";
}