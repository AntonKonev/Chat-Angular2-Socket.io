import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { ChatServiceService } from '../../services/chat-service/chat-service.service'

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  private nameOfuser: string;
  private checkingOfname;

  constructor(private router: Router, private chatService: ChatServiceService) { }

  public redirectToChat() {
    this.router.navigate(["chat", this.nameOfuser]);
  }

  public checkingOfName() {
    this.checkingOfname = this.chatService.chekingOfName(this.nameOfuser).subscribe(data => {
      if (data === -1){
        this.redirectToChat();
      } else {
        this.nameOfuser = '';
      }
    })
  }

  ngOnInit() {
    this.chatService.intitialSocket();
  }

  ngOnDestroy() {
    this.checkingOfname.unsubscribe();
  }

}
