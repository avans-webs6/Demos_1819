import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { UsersComponent } from './users.component';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';


import { UsersService } from './users.service';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], //mock backend
      declarations: [ UsersComponent ],
      providers: [UsersService] //provide service
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get users', () => {

    inject(
      [HttpTestingController, UsersService],
      (
        httpMock: HttpTestingController,
        dataService: UsersService
      ) => {
        expect(component.users.length).toEqual(10);
      }
    )
  })
});
