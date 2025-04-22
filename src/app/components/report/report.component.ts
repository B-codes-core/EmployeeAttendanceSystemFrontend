import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { AttendanceReportService } from '../../services/report.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  data: any[] = [];
  filteredData: any[] = [];

  // Search fields
  searchName: string = '';
  searchDept: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(private reportService: AttendanceReportService) {}

  filterRecords() {
    this.reportService.getFilteredReports(
      this.searchName,
      this.searchDept,
      this.startDate,
      this.endDate
    ).subscribe((response: any[]) => {
      this.filteredData = response;
    }, error => {
      console.error('Error fetching filtered reports:', error);
    });
  }

  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelFile: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelFile], { type: 'application/octet-stream' });
    const fileName = 'attendance_report.xlsx';
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }
}