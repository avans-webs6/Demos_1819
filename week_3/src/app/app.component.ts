import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Blog } from './blog';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public blogs : Observable<any[]>;
  public blogssnap : Observable<any[]>;

  public model: Blog;

  login() {
    //this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    //this.afAuth.auth.signOut();
  }

  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore) {}

  ngOnInit(): void {

    this.blogs = this.db.collection('blogs').valueChanges();
    this.blogssnap = this.db.collection('blogs').snapshotChanges()

    this.db.collection('blogs').snapshotChanges()
    .subscribe(b => console.log(b));

    this.model = new Blog();
  }

  public onSubmit(blog: any)
  {
    this.db.collection('blogs').add({...blog});
    this.model = new Blog();
  }

  public delete(key: string)
  {
    this.db.doc('/blogs/' + key).delete();
  }

  

}
