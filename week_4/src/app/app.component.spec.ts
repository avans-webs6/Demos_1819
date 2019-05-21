import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BlogService } from './blog.service';
import { Mock } from 'protractor/built/driverProviders';
import { Observable, of } from 'rxjs';
import { Blog } from './blog';
import { AngularFireAuth } from '@angular/fire/auth';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

//Mock class
class MockBlogService
{
  getBlogs(){
    return of([
      {id: "1", name: "Blog A", author: "Author A", date: new Date(2000, 0, 1)},
      {id: "1", name: "Blog A", author: "Author A", date: new Date(2001, 0, 1)},
    ])
  }

  addBlog(blog: Blog){};

  deleteBlog(key: String){}
}

//Mock value
const mockAngularFireAuth: any = {
  auth: jasmine.createSpyObj('auth', {
    'signInWithPopup': Promise.resolve(),
    'signOut': Promise.resolve()
  }),
  authState: of(null),
  user: of(null)
};
describe('AppComponent', () => {

  let fixture;
  let app;
  let debugElement;
  let mockBlogServiceObject;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BlogDetailComponent
      ],
      imports: [
        FormsModule,
        BrowserModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: BlogService, useClass: MockBlogService},
        {provide: AngularFireAuth, useValue: mockAngularFireAuth}
      ]
    }).compileComponents();

    //create app
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    // //get service init
    debugElement = fixture.debugElement;
    mockBlogServiceObject = debugElement.injector.get(BlogService);

  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should be able to add a blog`, async(() => {

    //arrange
    let addSpy = spyOn(mockBlogServiceObject, 'addBlog');

    //act
    app.onSubmit({});

    //assert
    expect(addSpy).toHaveBeenCalled();

  }));

  it(`should not able to delete a blog when not logged in`, async(() => {

    //arrange
    let addSpy = spyOn(mockBlogServiceObject, 'deleteBlog');

    //act
    app.delete({});

    //assert
    expect(addSpy).not.toHaveBeenCalled();

  }));

  
  it(`should be able to delete a blog when logged in`, async(() => {

    //arrange
    let addSpy = spyOn(mockBlogServiceObject, 'deleteBlog');
    mockAngularFireAuth.user = of({name: "Stijn"});
    
    //act
    app.delete({});

    //assert
    expect(addSpy).toHaveBeenCalled();

  }));

  it(`should  not break login`, async(() => {

    //arrange

    //act
    app.login();

    //assert
    //expect(addSpy).toHaveBeenCalled();

  }));

});
