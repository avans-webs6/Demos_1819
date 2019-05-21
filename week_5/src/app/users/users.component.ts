import { Component, OnInit } from '@angular/core';
import { ProviderAst } from '@angular/compiler';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  public users: any[]; 

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.GetUsers().then(users => {
      this.users = users;
    })
  }

}
