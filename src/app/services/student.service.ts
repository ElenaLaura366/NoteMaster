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
}
