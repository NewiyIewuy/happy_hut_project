import { Component, OnInit } from '@angular/core';
//import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../app.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'Our Happy Hut';
	currentTab = '';
  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) {
    this.currentTab = window.location.href.indexOf('message') > 0 ? 'message': 'photo';
  }

  // Function to logout user
  onLogoutClick() {
    this.authService.logout(); // Logout user
    this.flashMessagesService.show('You are logged out', { cssClass: 'alert-info' }); // Set custom flash message
    this.router.navigate(['/']); // Navigate back to home page
  }

  ngOnInit() {
    console.log("current router url is ", window);
  }

  changeTab(e) {
    this.currentTab = e.target.innerHTML.toLowerCase();
  }
}
