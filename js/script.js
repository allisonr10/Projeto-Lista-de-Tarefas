//Referenciar input

let input = document.querySelector('input[name=tarefa');

//referenciar botão

let botao = document.querySelector('#botao');

//referenciar lista

let lista = document.querySelector('#lista');

let card = document.querySelector('.card');

//representando a lista de tarefas

//buscando o local storage do navegador
let tarefas = JSON.parse(localStorage.getItem('nuvem')) || [];
//coloca-se esse ou array vazio (|| []) se não dará erro no elemento tarefas

function renderizar() {
  //limpar a listagem de itens antes de renderizar novamente a tela
  lista.innerHTML = '';

  //fazer iteração em cada elemento do array tarefas
  for (tarefa of tarefas) {
    //criar o item da lista
    let itemLista = document.createElement('li');

    //adicionar classes no item da lista
    itemLista.setAttribute('class', 'list-group-item list-group-item-action');

    //adicionar evento de clique no item da lista
    itemLista.onclick = function () {
      deletarTarefa();
    };

    //criar um texto
    let itemTexto = document.createTextNode(tarefa);

    //adicionar o texto no item da lista
    itemLista.appendChild(itemTexto);

    //adicionar o item da lista na lista
    lista.appendChild(itemLista);
  }
}

//executando a função para renderizar as tarefas
renderizar();

//adicionar o evento do clique do botão
botao.onclick = function () {
  //if para não deixar inserir uma tarefa em branco
  if (input.value === '') {
    //alert('Digite uma tarefa')

    //Outro método para acusar erro

    let span = document.createElement('span');
    span.setAttribute('class', 'alert alert-warning');

    let msg = document.createTextNode('Você precisa informar a tarefa');

    span.appendChild(msg);

    card.appendChild(span);
  } else {
    //recuperar o valor do input
    let novaTarefa = input.value;
    //adicionar a nova tarefa na lista(array)
    tarefas.push(novaTarefa);

    //renderizar novamente a lista
    renderizar();
    //limpar input após escrever tarefa
    input.value = '';

    removerSpan();

    salvarStorage()
  }
};

//função para remover mensagem de erro

function removerSpan() {
  let spans = document.querySelectorAll('span');

  for (let i = 0; i < spans.length; i++) {
    card.removeChild(spans[i]);
  }
}

function deletarTarefa() {

  //remove a tarefa do array
  tarefas.splice(tarefas, 1);

  //renderizar novamente a tela
  renderizar()
  salvarStorage()
}


// salvar dados na memória do navegador

function salvarStorage() {
  localStorage.setItem('nuvem', JSON.stringify(tarefas))
  //JSOM stringify transforma o array em uma string
}