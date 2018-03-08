import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css', '../app.component.css']
})
export class PhotosComponent implements OnInit {
  photos: any;
  signedData: any;
  photoSrcs: any = [];

  constructor(private router: Router, private http: HttpClient) {
    if(!JSON.parse(localStorage.getItem('user')).username){
      this.http.get('/'); 
    }
  }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem('user')).username){
      this.http.get('/'); 
    }

    let username = JSON.parse(localStorage.getItem('user')).username;
    this.http.get('/photo/' + username).subscribe(data => {
      if(!data) {
        this.router.navigate(['/']);
      } else {
        this.photos = data;
        this.photos.map((item)=>{
          if(item.key) {
            this.downloadPhoto(item.key);
          }
        });
      }
    });
  }

  openUploader(): void {
    this.router.navigate(['/uploader']);
  }

  downloadPhoto (key) {
    this.http.get('/api/s3/'+ key).subscribe(data => {
      console.log("photos downloaded ", data);
      if(data) {
        this.photoSrcs.push(data);
      }
      console.log("photos downloaded ", data);
    });
  }
  uploadFile (file, url) {
    let xhr = new XMLHttpRequest();
    console.log("xhr",xhr);
    xhr.open('PUT', url, true);
    xhr.send(file);
    xhr.onload = () => {
      if (xhr.status == 200) {
        console.log("successfully upload")
      }
    }
  }
}
