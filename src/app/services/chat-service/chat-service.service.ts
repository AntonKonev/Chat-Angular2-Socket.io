import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class ChatServiceService {
  private url = 'http://localhost:3000';
  private connectedUsers = [];

  public socket;


  sendMessage(message) {
    this.socket.emit('add-message', message);
    console.log("MESSAGE SENT");
  }

  getMessages(name:string) {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.emit('auth', name);

      // this.socket.on('connectedUsers', (data) => {
      //   console.log(data);
      //   this.connectedUsers = data;
      // });

      this.socket.on('message', (data) => {
        observer.next(data);
      });
      this.socket.on('newUser', (userName) => {
        this.connectedUsers = userName.connectedUsers;
        observer.next(userName);
      });
      return () => {
        this.socket.disconnect();
      }
    })
    return observable;
  }

  getConnectedUsers(): Array<string>{
    return this.connectedUsers;
  }
}
