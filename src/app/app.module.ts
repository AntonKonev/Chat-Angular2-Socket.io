import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router'

import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatServiceService } from "./services/chat-service/chat-service.service";
import { FormsModule } from '@angular/forms'


export const appRoutes: Routes =[
  {path: '', component: UserRegistrationComponent },
  {path: 'chat/:name', component: ChatComponent }
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
  providers: [ChatServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
