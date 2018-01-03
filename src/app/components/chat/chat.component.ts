import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatServiceService } from '../../services/chat-service/chat-service.service'
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public nameOfUser: string;
  public connectedUsers = [];
  public messages = [];
  public connection;
  public message;

  constructor(private chatService: ChatServiceService, private activatedRoute: ActivatedRoute) {
  }

  public sendMessage(): void {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.nameOfUser = this.activatedRoute.snapshot.params["name"];

    this.connection = this.chatService.getMessages(this.nameOfUser).subscribe(data => {
      if(data['type'] === 'new-user'){
        this.messages.push(`New User ${data['name']} has connected to Chat!`)
        console.log(this.chatService.getConnectedUsers());
        this.connectedUsers = this.chatService.getConnectedUsers();
      } else {
        this.messages.push(`${data['name']}: ${data['text']}`);
      }
      console.log(this.chatService.getConnectedUsers());
    });
    this.chatService.socket.on('connectedUsers', (data) => {
         console.log(data);
         this.connectedUsers = data;
       });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
