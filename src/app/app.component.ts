import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

declare const VK: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user;
  friends = [];

  constructor(private cdr: ChangeDetectorRef) {
    VK.init({
      apiId: 7110270
    });
  }

  ngOnInit() {
        this.getCurrentUser();
  }

  login() {
    VK.Auth.login(response => {
      if (response.session) {
        this.getCurrentUser();
      }
    }, 2)
  }

  getFriends() {
    VK.Api.call('friends.get', { user_id: 29026789, fields: 'photo_50', count: 5, v: "5.8" }, r => {
      if (r.response) {
        this.friends = r.response.items;
      }
      this.cdr.detectChanges();
    });
  }

  getCurrentUser() {
    VK.Api.call('users.get', { fields: 'photo_100', v: "5.8" }, r => {
      if (r.response) {
        this.user = r.response[0];
        this.getFriends();
      }
      this.cdr.detectChanges();
    });
  }
}
