import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:5000/api/students/me';

  constructor(private http: HttpClient) {}

  getStudentProfile(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addGradeToStudent(studentId: string, subjectId: string, value: number): Observable<any> {
    return this.http.post(`http://localhost:5000/api/students/${studentId}/add-grade`, {
      subjectId,
      value
    });
  }

  getStudentGrades(studentId: string) {
    return this.http.get(`http://localhost:5000/api/students/${studentId}/grades`);
  }

  addStudent(name: string) {
    return this.http.post('http://localhost:5000/api/students', { name });
  }
  
  getAllStudents() {
    return this.http.get('http://localhost:5000/api/students');
  }  
  
}
