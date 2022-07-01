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
            Swal.fire("Let's place your order")
            completeForm.className = "animate__animated animate__zoomOut"
            completeH.className = "animate__animated animate__zoomOut"
        }
console.log(person.tel)
    })
}
dataValidation ()
