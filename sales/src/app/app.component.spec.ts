/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SellersService, Seller } from './sellers.service';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  class MockRouter { public navigate() {}; }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ AppComponent ],
        imports: [ FormsModule, RouterTestingModule ],
        providers: [
          { provide: Router,
            useValue: MockRouter
          },
        ]})
    .compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  
  it(`should have as title 'Söluaðilar'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Sölusíðan sveittir bændur');
  }));
  
  it('should render title in a (a) tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain('Sölusíðan sveittir bændur');
  }));
});
