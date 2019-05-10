import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from './blog';

import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private db:  AngularFirestore) { }

  getBlogs() : Observable<Blog[]>
  {
    return this.db.collection<Blog>('/blogs') 
      .snapshotChanges()
      .pipe(map(data => data.map(blog => { 
        return {id: blog.payload.doc.id, ...blog.payload.doc.data()}
      })));   
  }

  getBlog(key: string){
    return this.db.doc<Blog>('/blogs/' + key);
  }

  addBlog(blog: Blog)
  {
    this.db.collection<Blog>('/blogs').add({...blog});
  }

  updateBlog(blog: Blog){

  }

  deleteBlog(key: String){
    this.db.doc('/blogs/' + key).delete();

  }




}
