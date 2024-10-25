const Estatisticas = ["FOR","CON","TAM","DES","APA","EDU","INT","POD","TAXA DE MOV"]

const Perícias = ["Antropologia", "Armas de Fogo(Pistolas)", "Armas de Fogo(Rifles)", "Arqueologia", "Arremessar", 
    "Arte/Ofício", "Avaliação", "Cavalgar","Charme","Chaveiro","Ciência","Consertos Életricos","Consertos Mecânicos",
"Contabilidade","Direito","Dirigir Auto","Disfarce","Encontrar","Escutar","Esquivar","Lábia","Intimidação","História",
"Furtividade","Língua Natural(EDU)","Língua[Outra]","Lutar(Brigar)","Medicina","Mythos de Cthulu","Mundo Natural",
"Natação","Navegação","Nível de Crédito","Ocultismo","Operar Maquinário","Persuasão","Pilotar","Preestidigitação",
"Primeiro Socorros","Psicanálise","Psicologia","Saltar","Rastrear","Sobrevivência","Usar Bibliotedca"]

const Inventario_Escolhas = ["Armas","Encantamentos","Acessorios","Capacete","Peitoral","Botas","Pet"]

// Chamar Elemento
var form  = document.querySelector("#Form-Lor")
var Status_form = document.querySelector("#Form-Status")
var Estatisticas_form = document.querySelector("#Form-Estatisticas")
var Perícias_form = document.querySelector("#Form-Perícias")


var Body_Lor = document.querySelectorAll("#Form-Lor")
var Body_Status = document.querySelectorAll("#Form-Status")
var Body_Estatisticas_Func = document.querySelectorAll("#Form-Estatisticas")
var Body_Perícias_Func = document.querySelectorAll("#Form-Perícias")

var Body_Estatisticas = document.getElementById("Form-Estatisticas")
var Body_Perícias = document.getElementById("Form-Perícias")
var Inventario = document.getElementById("Form-Inventário")
var ALL_INPUTS = document.querySelectorAll("form")

var Tablet = document.getElementById("Add_Tablet")
var Adicionar_Elemento = document.getElementById("Adicionar_Elemento")
var Inventário_Creater = document.getElementById("Inventário_Creater")
var Types = document.getElementById("Tipo_Itens")
var Body_Creater = document.getElementById("Itens_Creater")

var Itens_Creater = document.querySelectorAll("#Itens_Creater")
var Conteudo_Tablet = document.getElementById("Conteudo_Tablet")
var Conteudo_Inventario = document.getElementById("Conteudo_Inventario")

var Elementos = []
var Equipamentos = []

// Chamar Evento
Body_Estatisticas?.addEventListener("change",() => {Add(Body_Estatisticas.children,Estatisticas)})
Body_Perícias?.addEventListener("change",() => {Add(Body_Perícias.children,Perícias)})

// LocalStorage
const Personagem = localStorage.getItem("Personagem")

function Load(){

    Estatisticas.forEach(element => {
        CREATER_INPUTS(element,Body_Estatisticas)
    });

    Perícias.forEach(element => {
        CREATER_INPUTS(element,Body_Perícias)
    });

    function CREATER_INPUTS(element,Body){
        var input = document.createElement("input")
        var BOM = document.createElement("input")
        var EXTREMO = document.createElement("input")

        input.placeholder = input.name = input.placeholder = element
        input.type = "number"
        Body?.append(input)
    }

}Load()


function Add(Childr,Eventos){
    var Childs = Array.from(Childr);
    var array = new Array()
    Eventos?.forEach(function(element,index){        
        var NameChild = Childs[index]?.getAttribute('name');       
        var Value = Childs[index]?.value;       
                
        array.push({
            Dados: NameChild + ":" + Value
        })

    })
    return array   
}

form?.addEventListener("change",STATUS_FORM)
Status_form?.addEventListener("change",STATUS_FORM)
Estatisticas_form?.addEventListener("change",STATUS_FORM)
Perícias_form?.addEventListener("change",STATUS_FORM)


function STATUS_FORM(){
    var array = []
    array.push({
        "Name_Jogador":form.Jogador.value,
        "Name_Personagem":form.Personagem.value,
        "Idade":form.Idade.value,
        "Ocupação":form.Ocupation.value,
        "Sexo":form.Sexo.value,
        "História":form.História.value,
        "Life": Status_form.Life.value,
        "Magia":Status_form.Magia.value,
        "Sanidade":Status_form.Sanidade.value,
        "Sorte":Status_form.Sorte.value,
        "Atributos":Add(Body_Estatisticas.children,Estatisticas),
        "Perícias":Add(Body_Perícias.children,Perícias)
    })
    localStorage.setItem("Personagem",JSON.stringify(array))      
}


function Carregar(){
    var Buscar = JSON.parse(Personagem)
    
    Body_Lor.forEach(function(conteudo){
        conteudo.Jogador.value = Buscar[0].Name_Jogador
        conteudo.Personagem.value = Buscar[0].Name_Personagem
        conteudo.Sexo.value = Buscar[0].Sexo
        conteudo.Idade.value = Buscar[0].Idade
        conteudo.Ocupation.value = Buscar[0].Ocupação
        conteudo.História.value = Buscar[0].História
    })

    Body_Status.forEach(function(conteudo){
        conteudo.Life.value = Buscar[0].Life
        conteudo.Magia.value = Buscar[0].Magia
        conteudo.Sanidade.value = Buscar[0].Sanidade
        conteudo.Sorte.value = Buscar[0].Sexo
    })
    
    Body_Estatisticas_Func.forEach(function(conteudo){
        var Quantidade = Buscar[0].Atributos
        for(var i = 0 ; i < Quantidade.length; i++){
            var Parametros = String(Buscar[0].Atributos[i].Dados).split(":")[0]            
            var Valores = String(Buscar[0].Atributos[i].Dados).split(":")[1]            
            conteudo[`${Parametros}`].value = Valores
        }
    })

    Body_Perícias_Func.forEach(function(conteudo){
        var Quantidade = Buscar[0].Perícias
        for(var i = 0 ; i < Quantidade.length; i++){
            var Parametros = String(Buscar[0].Perícias[i].Dados).split(":")[0]            
            var Valores = String(Buscar[0].Perícias[i].Dados).split(":")[1]            
            conteudo[`${Parametros}`].value = Valores
        }
    })

    Inventario_Escolhas.forEach(function(conteudo){
        var opt = document.createElement("option")
        opt.value = opt.innerText = conteudo
        Types?.append(opt)
    })
 

    Types?.addEventListener("change",function(){     
        Body_Creater.innerHTML = "" 
        if(this.value == "Arma" || this.value == "Pet"){
            Body_Creater.innerHTML = `
            <input type="text" name="Nome" placeholder="Nome do Equipamento">
           <input type="text" name="Rigidez" placeholder="Rigidez da Equipamento">
           <input type="number" name="peso" placeholder="peso do Equipamento">
           <input type="text" name="Dano" placeholder="Dano do Equipamento">
           <input type="text" name="Ataque" placeholder="Ataque do Equipamento">
           <input type="text" name="Encantamentos" placeholder="Encantamentos do Equipamento">
           <textarea name='descrição'  id="descrição do Equipamento"></textarea>
           `
        }else if(this.value == "Encantamentos"){
            Body_Creater.innerHTML = `
            <input type="text" name="Nome" placeholder="Nome do Equipamento">
           <input type="text" name="Encantamentos" placeholder="Encantamentos do Equipamento">
           <textarea name='descrição'  id="descrição do Equipamento"></textarea>
           `
        }else{
            Body_Creater.innerHTML = `
            <input type="text" name="Nome" placeholder="Nome do Equipamento">
            <input type="text" name="Rigidez" placeholder="Rigidez da Equipamento">
            <input type="number" name="peso" placeholder="peso do Equipamento">
            <input type="text" name="Encantamentos" placeholder="Encantamentos do Equipamento">
            <textarea name='descrição'  id="descrição do Equipamento"></textarea>
            `
        }
    })
}

function Salvar(){
    if(localStorage.Equipamentos){
        Equipamentos = JSON.parse(localStorage.getItem("Equipamentos"))
    }    

    Equipamentos.push({"Item":Add(Body_Creater.children,Inventario_Escolhas)})

    localStorage.setItem("Equipamentos",JSON.stringify(Equipamentos))
    
}


var Elementos = JSON.parse(localStorage.getItem("Elementos"))

for(var i = 0 ; i < Elementos?.length; i++){
    var Caixa = document.createElement("div")
    Caixa.innerHTML = `
    <input type="color" value=${Elementos[i].Aura}/>
    <h1>${Elementos[i].Nome}</h1>
    <h4>${Elementos[i].quantidade}</h4>
    <p>${Elementos[i].description}</p>
    `
    Conteudo_Tablet?.append(Caixa)    
}

var Equipamentos = JSON.parse(localStorage.getItem("Equipamentos"))

for(var i = 0 ; i < Equipamentos?.length; i++){
    var Caixa = document.createElement("div")
    Caixa.innerHTML = `
    <h1>${(String(Equipamentos[i].Item[0].Dados).split(":")[1])}</h1>
    <h2>${(String(Equipamentos[i].Item[1].Dados).split(":")[1])}</h2>
    <h3>${(String(Equipamentos[i].Item[2].Dados).split(":")[1])}</h3>
    <h4>${(String(Equipamentos[i].Item[3].Dados).split(":")[1])}</h4>
    <h5>${(String(Equipamentos[i].Item[4].Dados).split(":")[1])}</h5>
    <h6>${(String(Equipamentos[i].Item[5].Dados).split(":")[1])}</h6>
    `
    
    Conteudo_Inventario?.append(Caixa)
}

Carregar()


document.getElementById("Adicionar")?.addEventListener("click",function(){Tablet.style.display = "block"})
document.getElementById("Add_Itens")?.addEventListener("click",function(){Inventário_Creater.style.display = "block"})


function Adicionar_Elementos(){
    if(localStorage.Elementos){
        Elementos = JSON.parse(localStorage.getItem("Elementos"))
    }

    Elementos.push({
        "Aura": document.getElementById("elemento_Color").value,
        "Nome": document.getElementById("Name").value,
        "Elemento": document.getElementById("Elemento").value,
        "quantidade": document.getElementById("quantidade").value,
        "description": document.getElementById("description").value
    })

    localStorage.setItem("Elementos",JSON.stringify(Elementos));

}

