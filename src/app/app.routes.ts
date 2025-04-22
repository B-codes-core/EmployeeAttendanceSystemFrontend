import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AttendanceHistoryComponent } from './components/attendance-history/attendance-history.component';
import { ReportComponent } from './components/report/report.component';

export const routes: Routes = [
  { path: '', redirectTo: 'attendance', pathMatch: 'full' },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'attendance/history', component: AttendanceHistoryComponent },
  { path: 'reports', component: ReportComponent },
];

export const appRouterProviders = [provideRouter(routes)];
