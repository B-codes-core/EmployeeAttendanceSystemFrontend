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

  constructor(private http: HttpClient) {}

  checkIn(data: CheckInDTO): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  setCurrentEmployee(data: any) {
    this.employeeData = data;
  }

  getCurrentEmployee() {
    return this.employeeData;
  }

  getAttendanceHistory(empId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:5000/api/attendance/${empId}`);
  }
}