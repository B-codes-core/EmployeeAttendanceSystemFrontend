// Modify checkin.service.ts to include check-in status
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckInDTO } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class CheckInService {
  private employeeData: any = null;
  private apiUrl = "http://localhost:5000/api/attendance/checkin";
  private isCheckedIn: boolean = false;
  private checkinTime: string | null = null;

  constructor(private http: HttpClient) {}

  checkIn(data: CheckInDTO): Observable<any> {
    // Set check-in status when API call is made
    return this.http.post(this.apiUrl, data);
  }

  setCurrentEmployee(data: any) {
    this.employeeData = data;
    this.isCheckedIn = true;
    this.checkinTime = new Date().toLocaleString();
  }

  getCurrentEmployee() {
    return this.employeeData;
  }

  getCheckedInStatus() {
    return this.isCheckedIn;
  }

  getCheckinTime() {
    return this.checkinTime;
  }

  resetCheckInStatus() {
    this.isCheckedIn = false;
    this.checkinTime = null;
    this.employeeData = null;
  }

  getAttendanceHistory(empId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:5000/api/attendance/${empId}`);
  }
}