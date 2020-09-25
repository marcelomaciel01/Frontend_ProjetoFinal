function carregaInfoColab() {
    var strUser = localStorage.getItem("userHE");
    var objUser = JSON.parse(strUser);
    var img = `<img src="${objUser.linkFoto}" class="mx-auto d-block" width="60%"">`;
    var info = `Nome: ${objUser.nomeUsuario} <br>
                RACF: ${objUser.racf} <br><br>`
    document.getElementById("info").innerHTML = info;
    document.getElementById("imageUser").innerHTML = img;

    var relatorio = "";

    lista = objUser.listaOcorrencias;
    for (i=0; i<lista.length; i++) {
        var oc = lista[i];

        relatorio = relatorio + 
                    `
                    <div class="row"> 
                       <div class="col-4"><a href="justificativa_he.html?numSeq=${oc.numSeq}">${oc.dataOc}</a></div>
                       <div class="col-3">${oc.numHoras}</div>
                       <div class="col-4">${oc.atividade.nomeAtividade}</div>
                       <div class="col-1">${oc.status}</div>
                    </div>      
                    `;
    }
    document.getElementById("relatorio").innerHTML = relatorio;
}