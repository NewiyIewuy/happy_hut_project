import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-message-create',
  templateUrl: './message-create.component.html',
  styleUrls: ['./message-create.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MessageCreateComponent implements OnInit {

  message = {
    "username": "",
    "content": ""
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem('user')).username){
      this.http.get('/'); 
    }
  }

  saveMessage() {
    this.message.username = JSON.parse(localStorage.getItem('user')).username;
    console.log("message data ", this.message);
    this.http.post('/message', this.message)
      .subscribe(res => {
          this.router.navigate(['/message']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
