const express = require('express');
const socket = require('socket.io');

let app = express();
let server = app.listen(7000, () =>{
    console.log("Server started");
});

app.use(express.static('public'));

//socket io

let io = socket(server);

io.on('connection', (socket) => {
    console.log("Made socket connection", socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat',  data);
    });

    socket.on('typing', (data) =>{

        socket.broadcast.emit('typing', data);
    })
})
