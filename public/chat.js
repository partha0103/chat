let socket = io.connect("http://localhost:7000");

let messgae = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');
let last_time ;

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

setInterval((callback) => {
    currentTime = new Date().getSeconds()
    if (last_time && currentTime - last_time > 1) {
        feedback.innerHTML = '';
    }
}, 1000);

socket.on('typing', (data) => {
        last_time = new Date().getSeconds();
        feedback.innerHTML = '<p>Typing</p>';
})
