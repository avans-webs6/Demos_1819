import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  //just a list
  public users = [];

  //a special list
  public $users: Observable<any> 

  constructor(public userService: UserService, private http: HttpClient){}

  ngOnInit(): void {
    //promise
    this.http.get('https://randomuser.me/api?results=20')
      .toPromise()
      .then((res:any) => this.users = res.results);
    

    //observable
    this.http.get('https://randomuser.me/api/')
      .subscribe((res:any) => this.users = res.results);

    //service
    this.$users = this.userService.getUsers();
  }
}
