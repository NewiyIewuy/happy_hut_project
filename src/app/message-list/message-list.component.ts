import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MessageListComponent implements OnInit {

 messages: any;

  constructor(private http: HttpClient, private router: Router) { 
    if(!JSON.parse(localStorage.getItem('user')).username){
      this.http.get('/'); 
    }
  }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem('user')).username){
      this.http.get('/'); 
    }

    let username = JSON.parse(localStorage.getItem('user')).username;
  	  this.http.get('/message/' + username).subscribe(data => {
        if(!data) {
            this.router.navigate(['/']);
      } else {
            this.messages = data;
          }
  });
  }
   showDate(time) {
     var date = new Date(time);
    return date.getHours() + ":" + date.getMinutes() + ' ' + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()+  " ";
   }
}
