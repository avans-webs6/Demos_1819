import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';



//Form component
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Blog } from '../blog';

import { debounceTime } from 'rxjs/operators';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnChanges {

  @Input()
  public key: string;

  public blogForm: FormGroup;

  constructor(private db: BlogService, private fb: FormBuilder) { }

  private blog: AngularFirestoreDocument<Blog> = null;

  ngOnChanges(changes: SimpleChanges): void {

    //zonder sleutel kunnen we niet verder
    if (!this.key) return;

    //Haal 1 specifieke blog op
    this.blog = this.db.getBlog(this.key);


    //Als de blog word aangepast, dan moet je het formulier updaten 
    this.blog.valueChanges()
      .subscribe((blog: Blog) => {
        //update formulier
        this.blogForm = this.fb.group(blog);
        //op het nieuwe formulier ook de automatische updates binden
        this.blogForm.valueChanges
          .pipe(debounceTime(500))
          .subscribe(() => {
            this.blog.update(this.blogForm.value);
          })
      })


  }




}
