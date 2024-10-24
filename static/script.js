const Estatisticas = ["FOR","CON","TAM","DES","APA","EDU","INT","POD","TAXA DE MOV"]

const Perícias = ["Antropologia", "Armas de Fogo(Pistolas)", "Armas de Fogo(Rifles)", "Arqueologia", "Arremessar", 
    "Arte/Ofício", "Avaliação", "Cavalgar","Charme","Chaveiro","Ciência","Consertos Életricos","Consertos Mecânicos",
"Contabilidade","Direito","Dirigir Auto","Disfarce","Encontrar","Escutar","Esquivar","Lábia","Intimidação","História",
"Furtividade","Língua Natural(EDU)","Língua[Outra]","Lutar(Brigar)","Medicina","Mythos de Cthulu","Mundo Natural",
"Natação","Navegação","Nível de Crédito","Ocultismo","Operar Maquinário","Persuasão","Pilotar","Preestidigitação",
"Primeiro Socorros","Psicanálise","Psicologia","Saltar","Rastrear","Sobrevivência","Usar Bibliotedca"]

// Chamar Elemento
var form  = document.querySelector("#Form-Lor")
var Status_form = document.querySelector("#Form-Status")

var Body_Lor = document.querySelectorAll("#Form-Lor")
var Body_Status = document.querySelectorAll("#Form-Status")
var Body_Estatisticas_Func = document.querySelectorAll("#Form-Estatisticas")
var Body_Perícias_Func = document.querySelectorAll("#Form-Perícias")

var Body_Estatisticas = document.getElementById("Form-Estatisticas")
var Body_Perícias = document.getElementById("Form-Perícias")
var Inventario = document.getElementById("Form-Inventário")
var ALL_INPUTS = document.querySelectorAll("form")

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
        var NameChild = Childs[index].getAttribute('name');       
        var Value = Childs[index].value;       
        
        console.log(Value);
        
        array.push({
            Dados: NameChild + ":" + Value
        })

    })
    return array   
}

form?.addEventListener("change",function(){
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
})

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

    Body_Estatisticas_Func.forEach(function(conteudo,index){        
        var Childss = Body_Estatisticas.children
        var Name_Child = Array.from(Childss[index].getAttribute('name'))
        console.log(conteudo);
        
    })
}

Carregar()