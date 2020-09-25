var ocorrencia;

function carregaInfos(){
    carregaListaAtividades();
    preencheDadosOcorrencia();
}

function carregaListaAtividades(){
    fetch("http://web.equipealfa.com.br:8088/atividade")
       .then(res=>res.json()).then(lista => preencheAtividades(lista));
}

function preencheAtividades(lista){
    var select=`<select class="form-control" id="selectAtividade">`;
    for (i=0;i<lista.length;i++){
        select = select + `<option value=${lista[i].idAtividade}>${lista[i].nomeAtividade}</option>`;
    }
    select = select + `</select>`;
    document.getElementById("divAtividades").innerHTML = select;
}

function preencheDadosOcorrencia(){
    var param = window.location.search;
    var numOcorrencia = param.substr(8);
    console.log("Numero da Ocorrencia = "+numOcorrencia);
    var url = "http://web.equipealfa.com.br:8088/ocorrencias/"+numOcorrencia;
    fetch(url)
      .then(res=>res.json()).then(oc => preencheCampos(oc));
}

function preencheCampos(oc){
    ocorrencia = oc;
    console.log(oc);
    document.getElementById("txtData").value = oc.dataOc;
    document.getElementById("txtNumHoras").value = oc.numHoras;
    document.getElementById("txtJustificativa").value = oc.descricao;
    
}

function gravar(){
    // primeiro busco as infos do formulario
    var desc = document.getElementById("txtJustificativa").value;
    var idAtiv = document.getElementById("selectAtividade").value;
    
    var ponto=0;
    if (document.getElementById("chkPonto").checked){
        ponto = 1;
    }

    ocorrencia.descricao = desc;
    ocorrencia.atividade.idAtividade = idAtiv;
    ocorrencia.pontoManual = ponto;
    ocorrencia.status = 1;

    console.log(ocorrencia);
    var cabecalho = {
        method : "PUT",
        body   : JSON.stringify(ocorrencia),
        headers : {
            "Content-type":"application/json"
        }
    }

    fetch("http://web.equipealfa.com.br:8088/ocorrencias/atualizar",cabecalho)
       .then(res => tratarResultado(res));
}

function tratarResultado(res){
    alert("Sucesso!");
    location.href = "http://web.equipealfa.com.br/ProjetoFinal/acesso_colaborador.html";
}