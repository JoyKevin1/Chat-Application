const chatForm = document.getElementById('chat-form')

const socket = io();

//Message from server
socket.on('message', message => {
    console.log(message)
    outputMessage(message)
})

//Message submit
chatForm.addEventListener('submit', e => {
e.preventDefault()

//Get message text
const msg = e.target.elements.msg.value;

//Emit message to server
socket.emit('chatMessage', msg)
})

//Output message to DOM - React can be used!

function outputMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = ` <p class="name">Brad <span class="time">9:12 PM</span></p>
    <p class="message-text">
       ${message}
    </p>`
    document.querySelector('.main-messages').appendChild(div)
}

