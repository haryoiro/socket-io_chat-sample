const express = require('express')
const socket = require('socket.io')

const port = process.env.PORT || 3000

// app setup
const app = express()
const server = app.listen(port, () => {
  console.log('listening to requests on port 3000')
})

app.use(express.static('public'));

//socket setup
const io = socket(server)
io.on('connection', (socket) => {
  console.log('made socket conenction', socket.id)
  
  socket.on('chat', data => {
    io.sockets.emit('chat', data)
  })

  socket.on('typing', data => {
    socket.broadcast.emit('typing', data)
  })

})