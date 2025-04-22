import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceReportService {
  private apiUrl = 'http://127.0.0.1:5000/api/attendance/reports/all';

  constructor(private http: HttpClient) {}

  getFilteredReports(
    name?: string,
    department?: string,
    startDate?: string,
    endDate?: string
  ): Observable<any[]> {
    let params = new HttpParams();

    if (name) params = params.set('name', name);
    if (department) params = params.set('department', department);
    if (startDate) params = params.set('start_date', startDate);
    if (endDate) params = params.set('end_date', endDate);

    return this.http.get<any[]>(this.apiUrl, { params });
  }

  getAllReports():Observable<any[]> {
    return this.http.get<any[]>("http://localhost:5000/api/attendance");
  }
}