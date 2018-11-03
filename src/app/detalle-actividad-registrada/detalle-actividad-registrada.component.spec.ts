import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleActividadRegistradaComponent } from './detalle-actividad-registrada.component';

describe('DetalleActividadRegistradaComponent', () => {
  let component: DetalleActividadRegistradaComponent;
  let fixture: ComponentFixture<DetalleActividadRegistradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleActividadRegistradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleActividadRegistradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
