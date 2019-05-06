import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, filter, flatMap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: Observable<User>;
  private woman: Observable<User>;

  constructor(private http: HttpClient) { }

  public getUsers() {
    if (!this.users) {
      //retreive users only once!
      this.retrieveData();
    }

    return this.users;
  }

  retrieveData() {
    
    this.users = this.http.get<any>('https://randomuser.me/api/')
      .pipe(flatMap(res => res.results)) //results only

    //all woman
    this.users
      .pipe(filter(u => {
        debugger;
        return u.gender == 'female';
      }))
      .subscribe(w => console.log(w));
  }
}
