import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatServiceService } from '../../services/chat-service/chat-service.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public nameOfUser: string;
  public connectedUsers;
  public messages = [];
  public gettingMessages;
  public gettingNewUser;
  public allUsers;
  public disconectUser;
  public message;

  constructor( private chatService: ChatServiceService,
               private activatedRoute: ActivatedRoute,
               private router: Router ) {
  }

  public sendMessage(): void {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }


  ngOnInit() {
    this.nameOfUser = this.activatedRoute.snapshot.params["name"];

    this.chatService.authorization(this.nameOfUser);

    this.gettingNewUser = this.chatService.getNewUser().subscribe(data => {
      this.connectedUsers = data['connectedUsers'];
      this.messages.push(`New User ${data['name']} has connected to Chat!`);
    });
    this.gettingMessages = this.chatService.getMessages().subscribe(data => {
      this.messages.push(`${data['name']}: ${data['text']}`);
    });
    this.allUsers = this.chatService.getUsers().subscribe(data => {
      this.connectedUsers = data;
    });
    this.disconectUser = this.chatService.disconectUser().subscribe(data => {
      this.messages.push(`User ${data} has left the Chat!`)
    });
  }

  ngOnDestroy() {
    this.gettingMessages.unsubscribe();
    this.gettingNewUser.unsubscribe();
    this.disconectUser.unsubscribe();
    this.allUsers.unsubscribe();
  }
}
