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
}

//Mock value
const mockAngularFireAuth: any = {
  auth: jasmine.createSpyObj('auth', {
    'signInWithPopup': Promise.reject(),
    'signOut': Promise.reject()
  }),
  authState: of(null)
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

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
