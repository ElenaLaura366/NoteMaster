import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentProfileComponent } from './student-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentService } from '../services/student.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

const mockStudentData = {
  name: 'Anto',
  grades: [
    {
      subject: { name: 'Matematică' },
      value: 9,
      date: new Date('2024-01-10')
    },
    {
      subject: { name: 'Română' },
      value: 8,
      date: new Date('2024-04-20')
    }
  ]
};

describe('StudentProfileComponent', () => {
  let component: StudentProfileComponent;
  let fixture: ComponentFixture<StudentProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StudentProfileComponent,
        HttpClientTestingModule,
        CommonModule,
        RouterOutlet
      ],
      providers: [
        {
          provide: StudentService,
          useValue: {
            getStudentProfile: () => of(mockStudentData)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should populate student data correctly', () => {
    expect(component.student.name).toBe('Anto');
    expect(component.note.length).toBe(2);
    expect(component.teme.length).toBe(2);
    expect(component.istoricNote.length).toBe(2);
    expect(component.materii).toEqual(['Matematică', 'Română']);
  });

  it('should compute mediaGenerala correctly', () => {
    expect(component.mediaGenerala).toBe(8.5);
  });

  it('should select the correct tab', () => {
    component.selectTab('note');
    expect(component.selectedTab).toBe('note');
  });
});
