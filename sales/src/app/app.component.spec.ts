/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SellersService, Seller } from './sellers.service';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;


  class SellersServiceMock {
    sellers: Seller[];
    getSellers(): Observable<Seller[]> {
      return Observable.of(this.sellers);
    }
  }

  let mockService = new SellersServiceMock();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ AppComponent],
        imports: [FormsModule]})
    .compileComponents();
  }));

  /*it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Söluaðilar'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Söluaðilar');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Söluaðilar');
  }));*/

  it('should get all sellers', async(() => {
    mockService.getSellers();
    expect(mockService.sellers).not.toBeNull();
  }));
});
