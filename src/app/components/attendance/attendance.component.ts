import { Component } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  name = '';
  empId = '';
  department = '';
  checkInTime: string | null = null;
  checkOutTime: string | null = null;

  constructor(private service: AttendanceService) {}

  checkIn() {
    this.checkInTime = new Date().toLocaleString();
  }

  checkOut() {
    this.checkOutTime = new Date().toLocaleString();
    this.service.addRecord({
      name: this.name,
      empId: this.empId,
      department: this.department,
      checkIn: this.checkInTime,
      checkOut: this.checkOutTime
    });

    // Reset after storing
    this.name = '';
    this.empId = '';
    this.department = '';
    this.checkInTime = null;
    this.checkOutTime = null;
  }
}
