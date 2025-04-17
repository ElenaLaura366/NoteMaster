import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StudentProfileComponent } from './student-profile.component';

describe('StudentProfileComponent', () => {
  let component: StudentProfileComponent;
  let fixture: ComponentFixture<StudentProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProfileComponent, HttpClientTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
