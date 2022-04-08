const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.main-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users-list')

//Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

const socket = io();

// Join chatroom

socket.emit('joinRoom', { username, room})

// Get room and users
socket.on('roomUsers', ({ room, users}) => {
    outputRoomName(room)
    outputUsers(users)
})

//Message from server
socket.on('message', message => {
    console.log(message)
    outputMessage(message)

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
})

//Message submit
chatForm.addEventListener('submit', e => {
e.preventDefault()

//Get message text
const msg = e.target.elements.msg.value;

//Emit message to server
socket.emit('chatMessage', msg)

//Clear input
e.target.elements.msg.value = ''
e.target.elements.msg.focus() 
})

//Output message to DOM - React can be used!

function outputMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = ` <p class="name">${message.username} <span class="time">${message.time}</span></p>
    <p class="message-text">
       ${message.text}
    </p>`
    document.querySelector('.main-messages').appendChild(div)
}

// Add room name to DOM
function outputRoomName(room) {
roomName.innerText = room
}

// Add users to DOM
function outputUsers(){
    
}