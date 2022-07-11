const container = document.getElementById("container")

const person = {
        name: undefined,
        tel: undefined,
        dir: undefined,
        order: []
}

function startForm (){
    let formTitle = document.createElement("h2")
    formTitle.setAttribute("class","title")
    formTitle.innerText = "To place your order enter your data."
    
    let form = document.createElement("form")
    form.innerHTML = `  <label id="labelName">Enter your name. No characters or numbers are allowed.</label>
                        <input id='enterName' required placeholder='Enter your name' type='text'>
                        <label id="labelTel">Enter your cell phone number. 10 numbers maximum.</label>
                        <input id='enterTel' placeholder='Enter your tel' type='number' required > 
                        <label id="labelDir">Enter your distance from the place in meters. 500 meters maximum.</label>
                        <input id='enterDir' required placeholder='Distance from the premises, in meters' type='number'>
                        <button type="submit" id='send'>Continue</button>`
    container.append(formTitle,form)
}
startForm ()

function dataValidation (){
    const send = document.getElementById("send")
    const enterName = document.getElementById("enterName")
    const enterTel = document.getElementById("enterTel")
    const enterDir = document.getElementById("enterDir")
    const labelName = document.getElementById("labelName")
    const labelTel = document.getElementById("labelTel")
    const labelDir = document.getElementById("labelDir")

    send.addEventListener("click",(e)=>{
        e.preventDefault()
        enterName.value === "" || !isNaN(enterName.value) ? labelName.className = "error" : person.name = enterName.value
        enterTel.value.length != 10 || isNaN(enterTel.value) ? labelTel.className = "error" : person.tel = enterTel.value
        isNaN(enterDir.value) || enterDir.value > 500 || enterDir.value === "" ?  labelDir.className = "error" : person.dir = enterDir.value
        if (person.name != undefined && person.dir != undefined && person.tel != undefined) {
            const completeForm = document.querySelector("#container form")
            const completeH = document.querySelector("#container h2")
            completeForm.className = "animate__animated animate__zoomOut"
            completeH.className = "animate__animated animate__zoomOut"
            completeH.innerHTML = ``
            completeForm.innerHTML = ``
            showCart()
            yourOrder ()
            carrousel ()
        }
console.log(person)
    })
}
dataValidation ()


function showCart() {
    let titleCart = document.createElement("h2")
    titleCart.setAttribute ("class", "title animate__animated animate__zoomIn")
    titleCart.innerText = "Let's place your order."
    container.append(titleCart)
    let cardMedium = document.createElement("div")
    cardMedium.setAttribute("class", "responsive animate__animated animate__zoomIn" )
    container.append(cardMedium)
    food.forEach((product) => {
        let card = document.createElement("div")
        card.setAttribute("class", "boxProduct" )
        cardMedium.append(card)
        let img = document.createElement("img")
        img.setAttribute("src", product.img)
        img.setAttribute("class","imagenProducto")
        let name = document.createElement("h3")
        name.innerText = (product.name)
        let price = document.createElement("p")
        price.innerText = ("u$s "+ product.price)
        let details = document.createElement("p")
        details.innerText = (product.details)
        let buyButton = document.createElement("button")
        buyButton.setAttribute ("class", "btnBuy")
        buyButton.innerText = ("Buy")
        card.append(img, name, price, buyButton)

        buyButton.addEventListener("click",()=>{
            person.order.push(product)
            const divCart = document.getElementById("divCart")
            divCart.innerHTML = ""
            cart ()
            console.log(person.order)
        })
    })
}

function carrousel () {
$('.responsive').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
    {
        breakpoint: 1024,
        settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
        }
    },
    {
        breakpoint: 600,
        settings: {
        slidesToShow: 2,
        slidesToScroll: 2
        }
    },
    {
        breakpoint: 480,
        settings: {
        slidesToShow: 1,
        slidesToScroll: 1
        }
    }]
})
}

function yourOrder (){
    const titleOrder = document.createElement("h2")
    titleOrder.setAttribute ("class", "title animate__animated animate__zoomIn")
    titleOrder.innerText = ("Your order:")
    const divCart = document.createElement("div")
    divCart.setAttribute("id","divCart")
    divCart.setAttribute("class", "animate__animated animate__zoomIn" )
    const qOrder = document.createElement("p")
    qOrder.setAttribute("id","qOrder")
    const qPrice = document.createElement("p")
    qPrice.setAttribute("id","qPrice")
    container.append(titleOrder,divCart,qOrder,qPrice)
}


function cart (){
    const divCart = document.getElementById("divCart")
    divCart.innerHTML = ""
    person.order.forEach((product)=>{
        const provide = document.createElement("div")
        provide.setAttribute("class","boxCart")
        provide.innerHTML +=`
        <img src="${product.img}">
        <h3>${product.name}</h3>
        <button id="btnPersonalize"onclick="btnPersonalize(${product.id})">Personalize</button>
        <button id="btnDelete"onclick="btnDelete(${product.id})">Delete</button>`
        divCart.appendChild(provide)
    })
    totalPrice ()
    orderDetail ()
}

function totalPrice () {
    const subTotal = person.order.map(({price})=> price)
    const accumulate = (accumulator,price)=> accumulator + price;
    let total = subTotal.reduce(accumulate,0)
    return total
}

function orderDetail (){
    qOrder = document.getElementById("qOrder")
    qPrice = document.getElementById("qPrice")
    qOrder.innerText = "Order: " + parseInt(person.order.length)
    qPrice.innerText = "Total price: " + totalPrice()
}

function btnDelete(productId){
    const item = person.order.find((product) => product.id ===productId)
    const indice = person.order.indexOf(item)
    person.order.splice(indice, 1)
    totalPrice ()
    orderDetail ()
    cart()
} 

const footerCreate = document.getElementById("footer")

const fetchLocalData = () =>{
    fetch('./data.json').then((response)=>response.json())
    .then((result)=>{
        renderTitle(result.footer)
    }).catch((err)=>{
        console.error(err)
    })
}

const renderFooter = (body) =>{
    let title = document.createElement("p")
    title.innerText ="Name: " + body.Owner + "\nEmail: " + body.Email + "\nLinkedin: " + body.Linkedin
    footerCreate.append(title)
}
fetchLocalData()



function btnPersonalize(){
    const divPerso = document.createElement("div")
    divPerso.setAttribute("class","boxPersonalize")
    container.append(divPerso)
} 