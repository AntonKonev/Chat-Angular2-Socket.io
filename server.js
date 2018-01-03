'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let connectedUsers = [];

io.on('connection', (socket) => {
  var nameUser;
  socket.on('auth', (name) => {
    nameUser = name;
    connectedUsers.push(nameUser);
    socket.broadcast.emit('newUser', {type:'new-user', name: nameUser, connectedUsers:connectedUsers});
    socket.emit('connectedUsers', connectedUsers);
  });

  console.log('USER CONNECTED');

  socket.on('disconnect', function(){
    console.log('USER DISCONNECTED');

  });

  socket.on('add-message', (message) => {
    io.emit('message', {type:'new-message', name:nameUser, text: message});
  });
});

http.listen(3000, () => {
  console.log('started on port 3000');
});
