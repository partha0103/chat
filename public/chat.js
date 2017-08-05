let socket = io.connect("http://localhost:7000");

let messgae = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');
let keypressed = [];
let status = false;

//Emit events

btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
})

//listen

socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>'+data.handle+':<strong> '+data.message+'</p>'
})


socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>'+ data.value +' is typing a message ....</p>';
})
