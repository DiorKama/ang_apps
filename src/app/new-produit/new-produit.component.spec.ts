import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProduitComponent } from './new-produit.component';

describe('NewProduitComponent', () => {
  let component: NewProduitComponent;
  let fixture: ComponentFixture<NewProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
