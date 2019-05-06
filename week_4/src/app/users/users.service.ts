import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UsersService
{
    private base = 'https://jsonplaceholder.typicode.com/users';

    constructor(private http: HttpClient){}

    public GetUsers() : Promise<any[]>
    {
        return this.http.get(this.base).toPromise() as Promise<any>;
    }

}