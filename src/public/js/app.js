const messageList = document.querySelector('ul')
const messageForm = document.querySelector('#message')
const nickNameForm = document.querySelector('#nickname')
const socket = new WebSocket(`ws://${window.location.host}`)

function makeMessage(type, payload) {
     const msg = {type, payload}
     return JSON.stringify(msg)
} 

socket.addEventListener("open", () => {
    console.log("Connected to Server")
});

socket.addEventListener("message", (message) => {
    const li = document.createElement("li")
    li.innerText = message.data
    messageList.append(li)
})

socket.addEventListener("close", () => {
    console.log("Disconnected from Server!")
})

function handleSubmit(event) {
    event.preventDefault() 
    const input = messageForm.querySelector("input")
    socket.send(makeMessage("new_message", input.value))
    const li = document.createElement("li")
    li.innerText = `You: ${input.value}`;
    messageList.appendChild(li)
    input.value = ""
}

function handleNickNameSubmit(event) {
    event.preventDefault() 
    const input = nickNameForm.querySelector("input")
    socket.send(makeMessage("nickname", input.value))
}

messageForm.addEventListener("submit", handleSubmit)
nickNameForm.addEventListener("submit", handleNickNameSubmit)
