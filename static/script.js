const Estatisticas = ["FOR", "CON", "TAM", "DES", "APA", "EDU", "INT", "POD", "TAXA DE MOV"]

const Perícias = ["Antropologia", "Armas de Fogo(Pistolas)", "Armas de Fogo(Rifles)", "Arqueologia", "Arremessar",
    "Arte/Ofício", "Avaliação", "Cavalgar", "Charme", "Chaveiro", "Ciência", "Consertos Életricos", "Consertos Mecânicos",
    "Contabilidade", "Direito", "Dirigir Auto", "Disfarce", "Encontrar", "Escutar", "Esquivar", "Lábia", "Intimidação", "História",
    "Furtividade", "Língua Natural(EDU)", "Língua[Outra]", "Lutar(Brigar)", "Medicina", "Mythos de Cthulu", "Mundo Natural",
    "Natação", "Navegação", "Nível de Crédito", "Ocultismo", "Operar Maquinário", "Persuasão", "Pilotar", "Preestidigitação",
    "Primeiro Socorros", "Psicanálise", "Psicologia", "Saltar", "Rastrear", "Sobrevivência", "Usar Bibliotedca"]

const Inventario_Escolhas = ["Armas", "Encantamentos", "Acessorios", "Capacete", "Peitoral", "Botas", "Pet"]

// Chamar Elemento
var form = document.querySelector("#Form-Lor")
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
var Equipamentoss = []
var array = []

// Chamar Evento

Body_Perícias?.addEventListener("change", () => { Add(Body_Perícias_Func, Perícias.length) })
Body_Estatisticas?.addEventListener("change", () => { Add(Body_Estatisticas_Func, Estatisticas.length) })


// LocalStorage
const Personagem = localStorage.getItem("Personagem")
var Buscar = JSON.parse(Personagem)

function Load() {

    Estatisticas.forEach(element => {
        CREATER_INPUTS(element, Body_Estatisticas)
    });

    Perícias.forEach(element => {
        CREATER_INPUTS(element, Body_Perícias)
    });

    function CREATER_INPUTS(element, Body) {
        var Caixa = document.createElement("div")
        var input = document.createElement("input")
        var BOM = document.createElement("input")
        var EXTREMO = document.createElement("input")
        var Name = document.createElement("label")
        var ROLARDADOS = document.createElement("h1")

        Name.innerText = element + ": "
        input.placeholder = input.name = input.placeholder = element 
        BOM.name = `BOM${element}`
        BOM.placeholder = "BOM"
        EXTREMO.name = `EXTREMO${element}`
        EXTREMO.placeholder = "EXTREMO"
        ROLARDADOS.id = element
        ROLARDADOS.innerText = "Rolar os dados"
        ROLARDADOS.addEventListener("click",function(){
            var Random = Math.floor(Math.random() * 100)
            document.getElementById("Rolagem_dados").style.display = "block"
            document.getElementById("Dados_Escolhidos").innerText = Random

            if(input.value > 0){
                if(Random <= parseInt(EXTREMO.value)){
                    document.getElementById("Dados_Title").innerText = "EXTREMO 🤓"
                }else if(Random <= parseInt(BOM.value)){
                    document.getElementById("Dados_Title").innerText = "BOM 😀"
                }else if(Random <= parseInt(input.value)){
                    document.getElementById("Dados_Title").innerText = "NORMAL 😯"
                }else{
                    document.getElementById("Dados_Title").innerText = "FRACASSO 👹"
                }
            }
        })
        input.type = BOM.type = EXTREMO.type = "number"
        Caixa.append(Name,input,BOM,EXTREMO,ROLARDADOS)
        Body?.append(Caixa)
    }

    if(localStorage.Personagem){
        Body_Perícias_Func.forEach(function (element, index) {  
            for(var i = 0; i < Perícias.length; i++){
                element.children.item(i).children.item(1).value = parseInt(String(Buscar[0].Perícias[i].Dados).split(":")[1])
                element.children.item(i).children.item(2).value = parseInt(String(Buscar[0].Perícias[i].Dados).split(":")[1] / 2)
                element.children.item(i).children.item(3).value = parseInt(String(Buscar[0].Perícias[i].Dados).split(":")[1] / 5)
            }        
         })

         Body_Estatisticas_Func.forEach(function (element, index) {  
            for(var i = 0; i < Estatisticas.length; i++){
                element.children.item(i).children.item(1).value = parseInt(String(Buscar[0].Atributos[i].Dados).split(":")[1])
                element.children.item(i).children.item(2).value = parseInt(String(Buscar[0].Atributos[i].Dados).split(":")[1] / 2)
                element.children.item(i).children.item(3).value = parseInt(String(Buscar[0].Atributos[i].Dados).split(":")[1] / 5)
            }        
         })
    }
} Load()


document.getElementById("Remover_Dados").addEventListener("click",function(){
    location.reload()
})

function Add(Childr, Eventos) {
    var Url_Atual = Array.from(Childr)
    var array = new Array()
    Url_Atual.forEach(function (element, index) {                
        var Quantidade = Eventos
        for (var i = 0; i < Quantidade; i++) {
            
            array.push({
                Dados: element?.children.item(i)?.children.item(1).name + ":" + element?.children.item(i)?.children.item(1).value
            })
        }
    })
    return array
}

form?.addEventListener("change", STATUS_FORM)
Status_form?.addEventListener("change", STATUS_FORM)
Estatisticas_form?.addEventListener("change", STATUS_FORM)
Perícias_form?.addEventListener("change", STATUS_FORM)


function STATUS_FORM() {
    var array = []
    array.push({
        "Name_Jogador": form.Jogador.value,
        "Name_Personagem": form.Personagem.value,
        "Idade": form.Idade.value,
        "Ocupação": form.Ocupation.value,
        "Sexo": form.Sexo.value,
        "História": form.História.value,
        "Life": Status_form.Life.value,
        "Magia": Status_form.Magia.value,
        "Sanidade": Status_form.Sanidade.value,
        "Sorte": Status_form.Sorte.value,
        "Atributos": Add(Body_Estatisticas_Func, Estatisticas.length),
        "Perícias":Add(Body_Perícias_Func, Perícias.length)
    })
    localStorage.setItem("Personagem", JSON.stringify(array))
}


function Carregar() {
    var ElementoPrimario = JSON.parse(localStorage.getItem("ELEMENTO_PRINCIPAL"))

    Body_Lor.forEach(function (conteudo) {
        conteudo.Jogador.value = Buscar[0].Name_Jogador
        conteudo.Personagem.value = Buscar[0].Name_Personagem
        conteudo.Sexo.value = Buscar[0].Sexo
        conteudo.Idade.value = Buscar[0].Idade
        conteudo.Ocupation.value = Buscar[0].Ocupação
        conteudo.História.value = Buscar[0].História
    })

    Body_Status.forEach(function (conteudo) {
        conteudo.Life.value = Buscar[0].Life
        conteudo.Magia.value = Buscar[0].Magia
        conteudo.Sanidade.value = Buscar[0].Sanidade
        conteudo.Sorte.value = Buscar[0].Sexo
    })


    Inventario_Escolhas.forEach(function (conteudo) {
        var opt = document.createElement("option")
        opt.value = opt.innerText = conteudo
        Types?.append(opt)
    })


    Types?.addEventListener("change", function () {
        Body_Creater.innerHTML = ""
        if (this.value == "Arma" || this.value == "Pet") {
            Body_Creater.innerHTML = `
            <input type="text" name="Nome" placeholder="Nome do Equipamento">
           <input type="text" name="Rigidez" placeholder="Rigidez da Equipamento">
           <input type="number" name="peso" placeholder="peso do Equipamento">
           <input type="text" name="Dano" placeholder="Dano do Equipamento">
           <input type="text" name="Ataque" placeholder="Ataque do Equipamento">
           <input type="text" name="Encantamentos" placeholder="Encantamentos do Equipamento">
           <textarea name='descrição'  id="descrição do Equipamento"></textarea>
           `
        } else if (this.value == "Encantamentos") {
            Body_Creater.innerHTML = `
            <input type="text" name="Nome" placeholder="Nome do Equipamento">
           <input type="text" name="Encantamentos" placeholder="Encantamentos do Equipamento">
           <textarea name='descrição'  id="descrição do Equipamento"></textarea>
           `
        } else {
            Body_Creater.innerHTML = `
            <input type="text" name="Nome" placeholder="Nome do Equipamento">
            <input type="text" name="Rigidez" placeholder="Rigidez da Equipamento">
            <input type="number" name="peso" placeholder="peso do Equipamento">
            <input type="text" name="Encantamentos" placeholder="Encantamentos do Equipamento">
            <textarea name='descrição'  id="descrição do Equipamento"></textarea>
            `
        }
    })

        document.getElementById("Elemento_Escolha").innerText = ElementoPrimario[0].Name
        document.getElementById("Color_Orb").value = ElementoPrimario[0].Aura

}

function Salvar() {
    if (localStorage.Equipamentos) {
        Equipamentoss = JSON.parse(localStorage.getItem("Equipamentos"))
    }

    Equipamentoss.push({ "Item": Add(Body_Creater, Inventario_Escolhas) })

    localStorage.setItem("Equipamentos", JSON.stringify(Equipamentoss))

}


var Elementos = JSON.parse(localStorage.getItem("Elementos"))

for (var i = 0; i < Elementos?.length; i++) {
    var Caixa = document.createElement("div")
    Caixa.id = i
    Caixa.innerHTML = `
    <input type="color" value="${Elementos[i].Aura}"/>
    <h2>${Elementos[i].Elemento}</h2>
    <h1>${Elementos[i].Nome}</h1>
    <input type="number" value="${Elementos[i].quantidade}"/>
    <p>${Elementos[i].description}</p>
    <button id="Remover${i}" class="Remover">❌</button>
    `
    Conteudo_Tablet?.append(Caixa)
}

if (Elementos?.length > 4) {
    for (var j = 1; j < 5; j++) {
        document.getElementById(`Color_Orb${j}`).value = Elementos[j].Aura
    }
}

document.querySelectorAll(".Remover").forEach(el => el.addEventListener("click", function () {
    location.reload()
    Id = String(this.id).replace("Remover", "")
    var Remover;
    if (localStorage.getItem("Elementos") == null) {
        Remover = []
    } else {
        Remover = JSON.parse(localStorage.getItem("Elementos"))
    }

    Remover.splice(Id, 1)
    localStorage.setItem("Elementos", JSON.stringify(Remover))
}))

var Equipamentos = JSON.parse(localStorage.getItem("Equipamentos"))

for (var i = 0; i < Equipamentos?.length; i++) {
    var Caixa = document.createElement("div")
    for (var j = 1; j < 6; j++) {
        var Valores = String(Equipamentos[i].Item[j - 1].Dados).split(":")[1]
        var Names = String(Equipamentos[i].Item[j - 1].Dados).split(":")[0]
        if (Valores != "undefined") {
            Caixa.innerHTML += `<h${j}>${Names}: ${Valores}</h${j}>`
        }
        Conteudo_Inventario?.append(Caixa)
    }
}

Carregar()


document.getElementById("Adicionar")?.addEventListener("click", function () { Tablet.style.display = "block" })
document.getElementById("Add_Itens")?.addEventListener("click", function () { Inventário_Creater.style.display = "block" })
document.getElementById("Add_Elemento")?.addEventListener("click", function () { document.getElementById("Primeiro_Elemento").style.display = "block" })
document.getElementById("Adicionar_Personagem")?.addEventListener("click", function () { document.getElementById("Creater_person").style.display = "block" })

function Adicionar_Elementos() {
    if (localStorage.Elementos) {
        Elementos = JSON.parse(localStorage.getItem("Elementos"))
    }

    Elementos.push({
        "Aura": document.getElementById("elemento_Color").value,
        "Nome": document.getElementById("Name").value,
        "Elemento": document.getElementById("Elementos").value,
        "quantidade": document.getElementById("quantidade").value,
        "description": document.getElementById("description").value
    })

    localStorage.setItem("Elementos", JSON.stringify(Elementos));

}


function add_elements() {

    array.push({
        "Aura": document.getElementById("elemento_Color_Principal").value,
        "Name": document.getElementById("Elementos_Principal").value
    })

    localStorage.setItem("ELEMENTO_PRINCIPAL", JSON.stringify(array))

}

function Salvar_Personagem() {
    array.push({
        "Image": document.getElementById("Imagem_Personagem").value,
        "Aparencia": document.getElementById("Aparencia").value,
        "Notas": document.getElementById("Notas").value
    })

    localStorage.setItem("Aparencia", JSON.stringify(array))
}

if (localStorage.Aparencia) {
    var Aparencias = JSON.parse(localStorage.getItem("Aparencia"))
    document.getElementById("Thumb_Person").innerHTML = `
    <img src="${Aparencias[0].Image}"/>
    <p>${Aparencias[0].Aparencia}</p>
    <p>${Aparencias[0].Notas}</p>
    `
}