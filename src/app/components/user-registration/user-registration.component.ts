import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { ChatServiceService } from '../../services/chat-service/chat-service.service'
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { userValidator } from './user-validator'

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  private nameOfuser: string;
  private checkingOfname;
  public loginForm: FormGroup;
  public flag: boolean = false;

  public formErrors = {
    "login": []
  };

  public validationMessages = {
    "login": {
      "required": "Обязательное поле",
      "minlength": "Никнейм не менее 4 символов",
      "userValidator": "Никнейм должен быть только из цифр и Английских букв"
    }
  };

  constructor(private router: Router, private chatService: ChatServiceService, private fb: FormBuilder) {
  }

  public redirectToChat() {
    this.router.navigate(["chat", this.nameOfuser]);
  }

  public checkingOfName(data) {
    if (data === -1) {
      this.redirectToChat();
    } else {
      this.formErrors.login.pop();
      let message = `Имя ${this.nameOfuser} уже занято. Выберите другое имя.`
      this.formErrors.login.push(message);
      this.flag = true;
    }
  }

  public checkName() {
    this.chatService.socket.emit('checkName', this.nameOfuser);
  }

  ngOnInit() {
    this.chatService.intitialSocket();
    this.loginForm = this.fb.group({
      login: ["", [Validators.required, Validators.minLength(4), userValidator]]
    })
    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.checkingOfname = this.chatService.chekingOfName().subscribe(data => {
      this.checkingOfName(data);
    });
  }

  public onValueChanged(data) {

    if (!this.loginForm) return;
    let form = this.loginForm;

    for (let field in this.formErrors) {
      this.formErrors[field].splice(0, this.formErrors[field].length);
      let control = form.get(field);
      this.flag = false;

      if (control && control.dirty && !control.valid) {
        let messages = this.validationMessages[field];
        for (let key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
        this.flag = true;
      }
    }
  }

  ngOnDestroy() {
    this.checkingOfname.unsubscribe();
  }

}
