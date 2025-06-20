import { Component, Input } from '@angular/core';
import { Level } from '../../models/level.model'; // Import Level interface
import { LearningService } from 'src/app/services/learning.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private service: LearningService) {
    this.levels = this.service.currentLevels;
  }

  @Input() levels: Level[] = []; // Use Level[] type

  onHover(level: Level) { // Explicitly define type for level
    // Increase the progress a bit when hovered
    level.progress += 5;
    if (level.progress > 100) {
      level.progress = 100; // Prevent exceeding 100%
    }
  }

  onLeave(level: Level) { // Explicitly define type for level
    // Reduce the progress back to original when hover leaves
    if (level.progress > 40) {
      level.progress -= 5;
    }
  }
}
