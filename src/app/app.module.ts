import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageCreateComponent } from './message-create/message-create.component';
import { PhotoUploaderComponent } from './photo-upload/photo-uploader.component';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { PhotosComponent } from './photos/photos.component';
import { DropzoneModule, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import { AuthService } from './services/auth.service';
import { BlogService } from './services/blog.service';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    url: 'https://httpbin.org/post',
    acceptedFiles: 'image/*',
    createImageThumbnails: true
};

const appRoutes: Routes = [
    {
        path: 'message',
        component: MessageListComponent,
        data: { title: 'Message List' },
        canActivate: [AuthGuard] // User must be logged in to view this route
    },
    {
        path: 'uploader',
        component: PhotoUploaderComponent,
        data: { title: 'Upload Photo' },
        canActivate: [AuthGuard] // User must be logged in to view this route
    },
    {
        path: 'message-create',
        component: MessageCreateComponent,
        data: { title: 'Create Message' },
        canActivate: [AuthGuard] // User must be logged in to view this route
    },
    {
        path: 'photo',
        component: PhotosComponent,
        data: { title: 'Photo' },
        canActivate: [AuthGuard] // User must be logged in to view this route
    },
    {
        path: '',
        component: HomeComponent,
        data: { title: 'Home' },
        canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' },
        canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
    },
    {
        path: 'signup',
        component: SignupComponent,
        data: { title: 'Signup' },
        canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
    },
    {
        path: 'happyhut',
        component: PhotosComponent,
        canActivate: [AuthGuard] // User must be logged in to view this route
    },
    {
        path: '*',
        component: HomeComponent,
        canActivate: [NotAuthGuard] // User must be logged in to view this route
    },
    // {
    //     path: 'book-details/:id',
    //     component: BookDetailComponent,
    //     data: { title: 'Book Details' }
    // },
    // {
    //     path: 'book-edit/:id',
    //     component: BookEditComponent,
    //     data: { title: 'Edit Book' }
    // },
];

@NgModule({
    declarations: [
        AppComponent,
        BookComponent,
        BookDetailComponent,
        BookCreateComponent,
        BookEditComponent,
        MessageListComponent,
        MessageCreateComponent,
        PhotoUploaderComponent,
        ImageCropperComponent,
        PhotosComponent,
        LoginComponent,
        HomeComponent,
        SignupComponent,
        NavbarComponent
    ],
    imports: [
        
        BrowserModule,
        FormsModule,
        DropzoneModule,
        BrowserModule,
        HttpClientModule,
        MaterialModule,
        FlashMessagesModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } // <-- debugging purposes only
        )
    ],
    providers: [
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        },
        {
            provide: LocationStrategy, useClass: HashLocationStrategy
        },
        AuthService, AuthGuard, NotAuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
