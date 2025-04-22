import { Component, OnInit } from '@angular/core';
import { CheckInService } from '../../services/checkin.service';
import { CheckOutService } from '../../services/checkout.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CheckInDTO, CheckOutDTO } from '../../models/employee.model';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, HttpClientModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  name = '';
  empId = '';
  department = '';
  checkInTime: string | null = null;
  checkOutTime: string | null = null;

  constructor(
    private checkInService: CheckInService,
    private checkOutService: CheckOutService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Load state from service when component initializes
    const employee = this.checkInService.getCurrentEmployee();
    if (employee) {
      this.name = employee.employee_name || '';
      this.empId = employee.employee_id || '';
      this.department = employee.department || '';
    }
    
    if (this.checkInService.getCheckedInStatus()) {
      this.checkInTime = this.checkInService.getCheckinTime();
    }
  }

  // Method to handle check-in
  checkIn() {
    // Create CheckInDTO object
    const employee: CheckInDTO = {
      employee_name: this.name,
      employee_id: this.empId,
      department: this.department
    };

    // Call CheckInService to send check-in data to backend
    this.checkInService.checkIn(employee).subscribe({
      next: (response) => {
        this.checkInTime = new Date().toLocaleString();
        this.checkInService.setCurrentEmployee(employee);
        this.snackBar.open('Check In successful!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.snackBar.open('Check-in allowed only once during the day!', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        } else {
          this.snackBar.open('Check In failed. Please try again!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      }
    });
  }

  // Method to handle check-out
  checkOut() {
    // Create CheckOutDTO object
    const checkOutDTO: CheckOutDTO = {
      employee_id: this.empId
    };

    // Call CheckOutService to send check-out data to backend
    this.checkOutService.checkOut(checkOutDTO).subscribe({
      next: (response) => {
        this.checkOutTime = new Date().toLocaleString();
        this.checkInService.resetCheckInStatus(); // Reset the check-in status
        this.snackBar.open('Check Out successful!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        // Reset after storing
        setTimeout(() => {
          this.name = '';
          this.empId = '';
          this.department = '';
          this.checkInTime = null;
          this.checkOutTime = null;
        }, 2000); // Show the checkout time for 2 seconds before clearing
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.snackBar.open('Already checked in once today!', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        } else {
          this.snackBar.open('Check Out failed. Please try again!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      }
    });
  }
}