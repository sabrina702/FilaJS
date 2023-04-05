 let minhaFila = new Fila(10);

 function adicionarElemento(){
    const novoNome = document.getElementById("txtNovoNome");
    const novoCpf = document.getElementById("txtNovoCpf");
      if(novoNome.value == "" || novoCpf.value==""){
      alert("Preencha os campos!!");
      return 0;
      }
    const novoAtendimento = new Atendimento();
    novoAtendimento.nome = novoNome.value;
    novoAtendimento.cpf = novoCpf.value;
    novoAtendimento.data = obterDataAtual();
    novoAtendimento.hora = obterHoraAtual();
    if(minhaFila.enqueue(novoAtendimento) == true){
      novoNome.value="";
      novoCpf.value="";
      novoNome.focus();
      mostrarFila();
    }
    else 
      alert("fila cheia!!");
 }
//--------------------------------------------------------------------------------------------
 function realizarAtendimento() {
  if(minhaFila.isEmpty())
        alert("Fila vazia");
    else{
       let retorno = minhaFila.dequeue();
       mostrarMensagemRemocao(retorno);
       mostrarFila();
    }// fim else
 }
 //--------------------------------------------------------------------------------
 function buscarCpf() {
    const cpf = document.getElementById("txtNovoCpf").value.trim(); 
    const atendimento = new Atendimento();  
    atendimento.cpf = cpf;
    let cont=0;
    const encontrado = false;
    for (let item of minhaFila.itens) { 
      cont++;
      if (item.equals(atendimento)){
        alert("Achou! Posição: "+cont);
        document.getElementById("txtNovoCpf").value = "";
        encontrado = true;
      }
    }
    if(encontrado==false)
      alert("CPF não encontrado!!");
    document.getElementById("txtNovoCpf").value = "";

}
//--------------------------------------------------------------------------------------------
function mostrarMensagemRemocao(pessoaAtendida) {
    const lblMensagemRemocao = document.getElementById("lblMensagemRemocao");
    let horaAtendida = obterHoraAtual();
    let tempoFila = calcularDiferencaHoras(pessoaAtendida.hora,horaAtendida);
    lblMensagemRemocao.innerHTML ="Próximo a ser atendido(a): "+ pessoaAtendida.nome+", chegou às "+pessoaAtendida.hora+
    " está sendo atendido(a) às "+horaAtendida+". Tempo de espera: "+tempoFila;
    lblMensagemRemocao.style.display = "block";
}
//--------------------------------------------------------------------------------------------
 function mostrarFila() {
  const filaElemento = document.getElementById("pessoasFila");
    filaElemento.textContent = minhaFila.toString();   
//
}
//--------------------------------------------------------------------------------------------
 function obterDataAtual() {
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1;
    let ano = dataAtual.getFullYear();
    let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
    return dataFormatada;
}
//--------------------------------------------------------------------------------------------
function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${hora}:${minuto}:${segundo}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(':').map(Number);
  const [h2, m2, s2] = hora2.split(':').map(Number);
  
  const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
  
  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;
  
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
