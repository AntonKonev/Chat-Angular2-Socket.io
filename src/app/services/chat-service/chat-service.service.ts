import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Injectable } from "@angular/core";

@Injectable()
export class ChatServiceService {
  private url = 'http://localhost:3000';
  private connectedUsers = [];
  public socket;

  constructor(){}

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

  public authorization(name:string): void{
    this.socket.emit('auth', name);
  }

  public intitialSocket(): void{
    this.socket = io(this.url);
  }

  public chekingOfName () {
    let observable = new Observable(observer => {
      this.socket.on('checkedName', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }


}
