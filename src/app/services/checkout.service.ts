import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckOutDTO } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  private apiUrl = 'http://127.0.0.1:5000/api/attendance/checkout';

  constructor(private http: HttpClient) {}

  checkOut(data: CheckOutDTO): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAttendanceHistory(empId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:5000/api/attendance/${empId}`);
  }
}