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

function buscarOCs() {
    var status = document.getElementById("filtro").value;
    var url = "http://web.equipealfa.com.br:8088/ocorrencias";
    if(status == 1) {
        url = url + "/status/1";
    }
    else if (status == 0) {
        url = url + "/status/0";
    }

    fetch(url)
        .then(res => res.json())
        .then(lista => preencheLista(lista));
}

function preencheLista(lista){

    console.log(lista);
    var relatorio = "";

    for (i=0; i<lista.length; i++) {
        var oc = lista[i];
        relatorio = relatorio + 
                    `
                    <div class="row"> 
                       <div class="col-1">${oc.colaborador.racf}</div>
                       <div class="col-2">${oc.colaborador.nomeUsuario}</div>
                       <div class="col-1">${oc.dataOc}</div>
                       <div class="col-1">${oc.numHoras}</div>
                       <div class="col-2">${oc.atividade.nomeAtividade}</div>
                       <div class="col-3">${oc.descricao}</div>
                       <div class="col-1">${oc.pontoManual}</div>
                       <div class="col-1">${oc.status}</div>
                    </div>      
                    `;

    }
    document.getElementById("relatorio").innerHTML = relatorio;
}