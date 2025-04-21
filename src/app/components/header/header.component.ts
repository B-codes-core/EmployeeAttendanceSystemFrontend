import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrl: 'header.component.css',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentTime: string = '';
  private timerInterval: any;

  ngOnInit(): void {
    this.updateTime(); // initialize immediately
    this.timerInterval = setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString(); // format: HH:MM:SS AM/PM
  }
}
