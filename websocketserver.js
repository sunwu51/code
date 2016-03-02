/**
 * Created by lenovo on 2016/3/2.
 */

var express=require('express');
var app=express();
app.use('/', express.static(__dirname + '/html'));
//

var server=require('http').createServer(app);
var io=require('socket.io').listen(server);
server.listen(9988);
console.log('server start');


io.on('connection',function(socket){
    socket.on('c',function(name){
        console.log(name+'连接进来了');
    });
    socket.on('chat', function (name,data) {
        var content=name+'说：'+data;
        console.log(content);
        socket.emit('back','你：'+data);
        socket.broadcast.emit('back',content);
    });
});