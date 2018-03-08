import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  DropzoneComponent, DropzoneDirective,
  DropzoneConfigInterface
} from 'ngx-dropzone-wrapper';
import { resetFakeAsyncZone } from '@angular/core/testing';

declare var loadImage: any;

@Component({
  selector: 'photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.css'],

})
export class PhotoUploaderComponent implements OnInit {
  photos: any;
  signedData: any;
  data: any;
  uploadingImg: any;
  public type: string = 'component';

  public disabled: boolean = false;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;
  @ViewChild(DropzoneDirective) directiveRef: DropzoneDirective;


  constructor(private http: HttpClient, private router: Router) {
  }

  public resetDropzoneUploads() {
    if (this.type === 'directive') {
      this.directiveRef.reset();
    } else {
      this.componentRef.directiveRef.reset();
    }
    this.uploadingImg = null;
  }

  public onUploadError(args: any) {
    console.log('onUploadError:', args);
  }

  // public onUploadSuccess(args: any) {
  //   console.log('onUploadSuccess:', args[0]);
  //   this.uploadingImg = args[0];
  //   this.reorientationImage(args[0], (img , data) => {
  //     var el = <HTMLInputElement>document.getElementById("uploadedImg");
  //     if(el) {el.remove();}
  //     console.log("returned img ", img, data);
  //     img.id = "uploadedImg";
  //     document.body.appendChild(img);
  //     const imgData = (<HTMLInputElement>document.getElementById('uploadedImg')).files[0];
  //    console.log("imgData ", imgData)
  //   }, {contain : true, sourceWidth: 480, sourceHeight: 480, maxWidth: 1280, orientation: true });
  // }

  ngOnInit() {
    if (!JSON.parse(localStorage.getItem('user')).username) {
      this.http.get('/');
    }
  };
  reorientationImage(img, cb, data) {
    new loadImage(img, cb, data);
  }
  uploadPhoto(e) {
    var uploadData = (<HTMLInputElement>document.getElementById("uploadBtn")).files[0];
    this.reorientationImage(  e.target.files[0], (img , data) => {
      const orientation = data;
      console.log("imgDorientationata ", orientation);
      var el = <HTMLInputElement>document.getElementById("uploadedImg");
      if(el) {el.remove();}
      img.id = "uploadedImg";
      var container = <HTMLInputElement>document.getElementById("photo-uploader-cut");
      container.appendChild(img);
    }, { maxWidth: 360, orientation: true });
  }
  resetPhoto() {
    (<HTMLInputElement>document.getElementById("uploadBtn")).value = "";
    this.uploadingImg = null;
    var el = <HTMLInputElement>document.getElementById("uploadedImg");
    if(el) {el.remove();}
  }
  submitPhoto() {
    // let file = (<HTMLInputElement>document.getElementById("uploadBtn")).files[0];
    let canvas = <HTMLCanvasElement>document.getElementById("uploadedImg");
    var url = canvas.toDataURL();
    var blobBin = atob(url.split(',')[1]);
    var array = [];
    for(var i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
    }
    var file=new Blob([new Uint8Array(array)], {type: 'image/png'});

    var formdata = new FormData();
    formdata.append("myNewFileName", file);
    console.log(formdata, file)

    this.resetPhoto();
 
    console.log('uploading file is ', file);
    if (file) {
      this.http.get('/api/s3').subscribe(data => {

        this.signedData = data;

        this.http.put(this.signedData.url, file, { headers: { 'Content-type': file.type, 'Content-Disposition': 'inline' } })
          .subscribe(res => {
            this.http.post('/photo', { key: this.signedData.key, username: JSON.parse(localStorage.getItem('user')).username })
              .subscribe(res => {
                this.router.navigate(['/photo']);
              }, (err) => {
                console.log(err);
              }
              );
          }, (err) => {
            console.log(err);
          }
          );
      });
    }
  }
}
