import { Component, OnInit } from '@angular/core';
import { CheckInService } from '../../services/checkin.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance-history',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './attendance-history.component.html',
  styleUrls: ['./attendance-history.component.css']
})
export class AttendanceHistoryComponent implements OnInit {
  history: any[] = [];
  isLoading: boolean = true;
  hasCheckedIn: boolean = false;

  constructor(
    private service: CheckInService,
    private router: Router
  ) {}

  ngOnInit() {
    const employee = this.service.getCurrentEmployee();

    if (employee && employee.employee_id) {
      this.hasCheckedIn = true;
      this.fetchAttendanceHistory(employee.employee_id);
    } else {
      this.isLoading = false;
      this.hasCheckedIn = false;
    }
  }

  fetchAttendanceHistory(employeeId: string) {
    this.isLoading = true;
    this.service.getAttendanceHistory(employeeId).subscribe({
      next: (data) => {
        this.history = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching attendance history:', err);
        this.history = [];
        this.isLoading = false;
      }
    });
  }

  goToCheckIn() {
    this.router.navigate(['/attendance']);
  }
}