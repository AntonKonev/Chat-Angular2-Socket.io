'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let connectedUsers = [];

io.on('connection', (socket) => {
  console.log('connection');
  var nameUser;
  socket.on('auth', (name) => {
    nameUser = name;
    connectedUsers.push(nameUser);
    socket.broadcast.emit('newUser', {type:'new-user', name: nameUser, connectedUsers:connectedUsers});
    socket.emit('connectedUsers', connectedUsers);
  });

  socket.on('disconnect', function(){
    var index = connectedUsers.indexOf(nameUser);
    connectedUsers.splice(index ,1);
    console.log(index);
    console.log("disconecrt");
    socket.broadcast.emit('disconnectOfUser', {index:index, name:nameUser});
    socket.emit('disconnect1');
  });

  socket.on('add-message', (message) => {
    io.emit('message', {type:'new-message', name:nameUser, text: message});
  });

  socket.on('checkName', (name) => {
    socket.emit('checkedName', connectedUsers.indexOf(name));
  })
});


http.listen(3000, () => {
  console.log('started on port 3000');
});
