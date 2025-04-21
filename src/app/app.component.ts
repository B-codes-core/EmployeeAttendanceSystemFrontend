import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { OptionsHeaderComponent } from './components/options-header/options-header.component';
import { HomeComponent } from "./components/home-employee/home-employee.component";
import { AttendanceComponent } from "./components/attendance/attendance.component";
import { AttendanceHistoryComponent } from "./components/attendance-history/attendance-history.component";
import { ReportComponent } from "./components/report/report.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, OptionsHeaderComponent, HomeComponent, AttendanceComponent, AttendanceHistoryComponent, ReportComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EmployeeAttendanceSystem';
}
