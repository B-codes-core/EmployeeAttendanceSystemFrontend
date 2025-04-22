import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options-header',
  standalone: true,
  templateUrl: './options-header.component.html',
  styleUrls: ['./options-header.component.css'],
  imports: [MatIcon, MatButton]
})
export class OptionsHeaderComponent {
  constructor(private router: Router) { }

  goToEmployeeAttendance() {
    this.router.navigate(['/attendance']);
  }

  goToEmployeeAttendanceHistory() {
    this.router.navigate(['/attendance/history']);
  }

  goToManager() {
    this.router.navigate(['/reports']);
  }
}