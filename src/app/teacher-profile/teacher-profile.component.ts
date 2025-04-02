import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-profile',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './teacher-profile.component.html',
  styleUrl: './teacher-profile.component.css'
})
export class TeacherProfileComponent {
delElev() {
throw new Error('Method not implemented.');
}
addElev() {
throw new Error('Method not implemented.');
}

  selectedTab: string | null = null;

  note = [
    { materie: 'Matematică', valoare: 9 },
    { materie: 'Română', valoare: 8 },
    { materie: 'Fizică', valoare: 10 }
  ];

  elevi = ['Popa Isabela', 'Istrate Mihaela', 'Dumbravă Francesca', 'Popescu Andrei', 'Ionescu Mihai', 'Dumitrescu Maria', 'Vasile Elena', 'Radu Andreea', 'Marin Alina'];

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  addNote() {
    throw new Error('Method not implemented.');
  }
}
