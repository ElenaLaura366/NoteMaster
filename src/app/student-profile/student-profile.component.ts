import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-profile',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent {
  selectedTab: string | null = null;

  note = [
    { materie: 'Matematică', valoare: 9 },
    { materie: 'Română', valoare: 8 },
    { materie: 'Fizică', valoare: 10 }
  ];

  materii = ['Matematică', 'Română', 'Fizică', 'Chimie', 'Istorie'];

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
