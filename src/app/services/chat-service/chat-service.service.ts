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

  getMessages() {
    let observable = new Observable(observer => {

      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  public getNewUser() {
    let observable = new Observable(observer => {
      this.socket.on('newUser', (userName) => {
        this.connectedUsers = userName.connectedUsers;
        observer.next(userName);
      });
    });
    return observable;
  }

  public getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('connectedUsers', (userName) => {
        this.connectedUsers = userName;
        observer.next(userName);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }

  public disconectUser(){
    let observable = new Observable(observer => {
      this.socket.on('disconnectOfUser', (data) => {
        this.socket.emit('connectedUsers', this.connectedUsers.splice(data.index, 1));
        observer.next(data.name);
      });
    });
    return observable;
  }

  public intitialSocket(name:string): void{
    this.socket = io(this.url);
    this.socket.emit('auth', name);
    this.socket.on
  }

}
