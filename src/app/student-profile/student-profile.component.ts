import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  selectedTab: string | null = null;

  student: any = null;
  note: any[] = [];
  materii: string[] = [];
  istoricNote: any[] = [];
  teme: any[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getStudentProfile().subscribe((data) => {
      this.student = data;
      this.note = data.grades.map((g: any) => ({
        materie: g.subject.name,
        valoare: g.value
      }));

      this.teme = data.grades.map((g: any) => ({
        materie: g.subject.name,
        titlu: `Temă din ${new Date(g.date).toLocaleDateString()}`,
        nota: g.value
      }));

      this.istoricNote = data.grades.map((g: any) => ({
        an: new Date(g.date).getFullYear(),
        semestru: new Date(g.date).getMonth() < 6 ? 2 : 1,
        materie: g.subject.name,
        valoare: g.value
      }));

      this.materii = [...new Set(data.grades.map((g: any) => g.subject.name))] as string[];
    });
  }

  get mediaGenerala(): number {
    const total = this.note.reduce((acc, n) => acc + n.valoare, 0);
    return this.note.length ? parseFloat((total / this.note.length).toFixed(2)) : 0;
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
