import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  private nameOfuser: string;

  constructor(private router: Router) { }

  public redirectToChat() {
    this.router.navigate(["chat", this.nameOfuser]);
  }

  ngOnInit() {
  }

}
