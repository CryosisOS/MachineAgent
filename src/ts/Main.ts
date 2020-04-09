import socketio from "socket.io";

export default class Main{
    static main(socket: socketio.Server) {
        socket.on("ping", function(){

        });
    }
}