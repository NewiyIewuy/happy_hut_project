import { Component , Inject} from '@angular/core';
import { Router } from '@angular/router';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

   constructor(private router: Router) {
  }
  
  ngOnInit() {
  }   
}

