// Make connection
const socket = io.connect('http://localhost:3000')

let message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    chatwindow = document.getElementById('chat-window'),
    bottom = chatwindow.scrollHeight - chatwindow.clientHeight

btn.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  })
})
document.addEventListener('keypress', (e) => {
  if ( e.keyCode !== 13 || ( e.keyCode === 13 && (e.shiftKey === true || e.ctrlKey === true || e.altKey === true) )) { // Enterキー除外
    return false
  }
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  })
  message.value = ""
  chatwindow.scrollTo(0, 100000)
})

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value)
})

//listen for events
socket.on('chat', data => {
  feedback.innerHTML = ``;
  output.innerHTML += `<p><strong> ${data.handle}</strpong>: ${data.message}</p>`
  chatwindow.scrollTo(0, 100000)
})

socket.on('typing', data => {
  feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`
})