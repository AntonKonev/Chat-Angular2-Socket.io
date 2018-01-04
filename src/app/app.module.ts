import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router'

import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatServiceService } from "./services/chat-service/chat-service.service";
import { AuthServiceService } from "./services/auth-service/auth-service.service";
import { FormsModule } from '@angular/forms'


export const appRoutes: Routes =[
  {path: '', component: UserRegistrationComponent },
  {path: 'chat/:name', component: ChatComponent, canActivate: [AuthServiceService]}
];


@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ChatServiceService, AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
