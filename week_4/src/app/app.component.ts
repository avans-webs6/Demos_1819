import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { Blog } from './blog';
import { Observable } from 'rxjs';
import { BlogService } from './blog.service';

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
  public selected: any;

  private isLoggedIn: boolean;

  constructor(public afAuth: AngularFireAuth, private db: BlogService) {}


  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(data => this.db.addBlog(null))
      .catch(data => this.db.deleteBlog(null));
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit(): void {

    this.blogs = this.db.getBlogs();
    this.model = new Blog();

    this.afAuth.user.subscribe(user => {
      this.isLoggedIn = user != null;
    })
  }

  public onSubmit(blog: Blog)
  {
    this.db.addBlog(blog);
    this.model = new Blog();
  }

  public delete(key: string)
  {
    if(this.isLoggedIn)
      this.db.deleteBlog(key);
  }

  

}
