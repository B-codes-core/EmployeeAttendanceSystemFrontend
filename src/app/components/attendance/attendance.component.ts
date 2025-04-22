import { Component } from '@angular/core';
import { CheckInService } from '../../services/checkin.service';
import { CheckOutService } from '../../services/checkout.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CheckInDTO, CheckOutDTO } from '../../models/employee.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, HttpClientModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
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
        this.snackBar.open('Check In successful!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        this.snackBar.open('Check In failed. Please try again!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });

    this.checkInService.setCurrentEmployee(employee)
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
        this.snackBar.open('Check Out successful!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        // Reset after storing
        this.name = '';
        this.empId = '';
        this.department = '';
        this.checkInTime = null;
        this.checkOutTime = null;
      },
      error: (error) => {
        this.snackBar.open('Check Out failed. Please try again!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });
  }
}
