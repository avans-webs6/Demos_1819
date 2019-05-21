import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

//Form component
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Blog } from '../blog';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnChanges {

  @Input()
  public key: string;

  public blogForm: FormGroup;

  constructor(private db: AngularFireDatabase, private fb: FormBuilder) { }

  private blog: AngularFireObject<Blog> = null;

  ngOnChanges(changes: SimpleChanges): void {

    //zonder sleutel kunnen we niet verder
    if (!this.key) return;

    //Haal 1 specifieke blog op
    this.blog = this.db.object<Blog>('/blogs/' + this.key);


    //Als de blog word aangepast, dan moet je het formulier updaten 
    this.blog.valueChanges()
      .subscribe((blog: Blog) => {
        //update formulier
        debugger;
        this.blogForm = this.fb.group(blog);
        //op het nieuwe formulier ook de automatische updates binden
        this.blogForm.valueChanges
          .debounceTime(500)
          .subscribe(() => {
            debugger;
            this.blog.update(this.blogForm.value);
          })
      })


  }




}
