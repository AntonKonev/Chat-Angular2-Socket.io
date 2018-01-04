import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { ChatServiceService } from "../chat-service/chat-service.service";

@Injectable()
export class AuthServiceService implements CanActivate {

  constructor(private chat: ChatServiceService, private router: Router){}

  canActivate(){
    if (this.chat.socket === undefined) {
      this.router.navigate([""])
      return false;
    } else {
      return true;
    }
  }
}
