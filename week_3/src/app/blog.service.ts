import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Blog } from './blog';

@Injectable()
export class BlogService {
  
  blogsCollection: AngularFirestoreCollection<Blog>;

  constructor(private db: AngularFirestore) {}

  public getBlogs(){
    this.blogsCollection = this.db.collection<Blog>('/blogs');
  }

  public addBlog(blog: Blog){
    this.db.collection<Blog>('/blogs').add(blog);
  }

}
