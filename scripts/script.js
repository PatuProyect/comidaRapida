const container = document.getElementById("container")


const person = {
        name: undefined,
        tel: undefined,
        dir: undefined,
}

function startForm (){
    let formTitle = document.createElement("h2")
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
    send.addEventListener("click",(e)=>{
        e.preventDefault()
        if (enterName.value === "" || !isNaN(enterName.value)){
            let labelName = document.getElementById("labelName")
            labelName.className = "error"
        }else{
            person.name = enterName.value
        }
        if (enterTel.value.length != 10 || isNaN(enterTel.value) ){
            let labelTel = document.getElementById("labelTel")
            labelTel.className = "error"
        }else{
            person.tel = enterTel.value
        }
        if ( isNaN(enterDir.value) || enterDir.value > 500 || enterDir.value === ""){
            let labelDir = document.getElementById("labelDir")
            labelDir.className = "error"
        }else{
            person.dir = enterDir.value
        }
        if (person.name != undefined && person.dir != undefined && person.tel != undefined) {
        container.innerHTML = "" 
        }
    })
}
dataValidation ()

