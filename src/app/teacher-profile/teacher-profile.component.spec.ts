import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherProfileComponent } from './teacher-profile.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('TeacherProfileComponent', () => {
  let component: TeacherProfileComponent;
  let fixture: ComponentFixture<TeacherProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherProfileComponent, CommonModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a default selectedTab as null', () => {
    expect(component.selectedTab).toBeNull();
  });

  it('should switch selectedTab when selectTab is called', () => {
    component.selectTab('elevi');
    expect(component.selectedTab).toBe('elevi');
  });

  it('should throw error when addNote is called', () => {
    expect(() => component.addNote()).toThrowError('Method not implemented.');
  });

  it('should throw error when addElev is called', () => {
    expect(() => component.addElev()).toThrowError('Method not implemented.');
  });

  it('should throw error when delElev is called', () => {
    expect(() => component.delElev()).toThrowError('Method not implemented.');
  });

  it('should have initial notes and students', () => {
    expect(component.note.length).toBeGreaterThan(0);
    expect(component.elevi.length).toBeGreaterThan(0);
  });
});
