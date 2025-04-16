import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../services/student.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './teacher-profile.component.html',
  styleUrl: './teacher-profile.component.css'
})
export class TeacherProfileComponent implements OnInit {
  selectedTab: string | null = null;

  elevi: any[] = [];
  subjects: any[] = [];

  selectedStudentId: string = '';
  selectedSubjectId: string = '';
  nota: number | null = null;
  studentGrades: any[] = [];
  selectedStudentForHistory: string = '';
  students: any[] = [];
  newStudentName: string = '';

  constructor(private http: HttpClient, private studentService: StudentService) {
    this.loadAllStudents();
  }

  ngOnInit(): void {
    this.loadElevi();
    this.loadMaterii();
  }

  loadElevi() {
    this.http.get<any[]>('http://localhost:5000/api/students').subscribe(data => {
      this.elevi = data;
    });
  }

  loadMaterii() {
    this.http.get<any[]>('http://localhost:5000/api/subjects').subscribe(data => {
      this.subjects = data;
    });
  }

  addNote() {
    if (!this.selectedStudentId || !this.selectedSubjectId || this.nota == null) {
      alert("Completează toate câmpurile!");
      return;
    }

    this.studentService
      .addGradeToStudent(this.selectedStudentId, this.selectedSubjectId, this.nota)
      .subscribe({
        next: () => {
          alert("✅ Notă adăugată cu succes!");
          this.nota = null;
        },
        error: () => alert("❌ Eroare la adăugarea notei")
      });
  }

  delElev() {
    throw new Error('Method not implemented.');
  }

  addElev() {
    throw new Error('Method not implemented.');
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  loadGradesForStudent(studentId: string) {
    this.studentService.getStudentGrades(studentId).subscribe({
      next: (grades) => {
        this.studentGrades = grades as any[];
      },
      error: () => alert("Eroare la încărcarea notelor elevului.")
    });
  }

  loadAllStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (data) => this.students = data as any[],
      error: () => alert("Eroare la încărcarea elevilor")
    });
  }
  
  addStudent() {
    if (!this.newStudentName.trim()) return;
  
    this.studentService.addStudent(this.newStudentName).subscribe({
      next: () => {
        this.newStudentName = '';
        this.loadAllStudents();
      },
      error: () => alert("Eroare la adăugarea elevului")
    });
  }
}
