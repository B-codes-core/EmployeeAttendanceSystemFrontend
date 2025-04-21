import { Component } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import * as XLSX from 'xlsx'; // For Excel export
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  data: any[]; // Store the report data

  constructor(private service: AttendanceService) {
    // Fetch records from the service
    this.data = service.getRecords();
  }

  // Method to export the data to Excel
  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data); // Convert the data to Excel sheet format
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] }; // Create the workbook
    const excelFile: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Create a Blob and trigger a download of the Excel file
    const blob = new Blob([excelFile], { type: 'application/octet-stream' });
    const fileName = 'attendance_report.xlsx';
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }
}
