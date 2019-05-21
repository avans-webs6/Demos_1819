import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Blog } from './blog';

import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public blogs : Observable<Blog[]>;
  //Deze is nog niet belangrijk
  public blogssnap : Observable<any[]>;

  public model: Blog;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) {}

  login() {
    //this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit(): void {

    this.blogs = this.db.list<Blog>('/blogs').valueChanges();
    this.blogssnap = this.db.list<Blog>('/blogs').snapshotChanges();
    this.model = new Blog();
  }

  public onSubmit(blog: Blog)
  {
    this.db.list('/blogs').push(blog);
    this.model = new Blog();
  }

  public delete(key: string)
  {
    this.db.object('/blogs/' + key).remove();
  }

  

}
