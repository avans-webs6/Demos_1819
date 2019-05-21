import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

//forms!
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';  // <-- #1 import module

@NgModule({
  declarations: [
    AppComponent,
    BlogDetailComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    //Firebase modules
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,

    ReactiveFormsModule // <-- #2 add to @NgModule imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
