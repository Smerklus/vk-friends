import { Component } from '@angular/core';

declare const VK: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vk-friends';
  constructor(){
    VK.init({
      apiId: 7110270
    });
  }

  login(){
    VK.Auth.login(x=>console.log(x),2)
  }
}
