// src/app/services/attendance.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private records: any[] = []; // Store attendance records

  // Add attendance record
  addRecord(record: any) {
    this.records.push(record);
  }

  // Get all stored records
  getRecords() {
    return this.records;
  }
}
