import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Level } from '../../models/level.model';
import { LearningService } from 'src/app/services/learning.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() chats: { id: string; title: string; responses: { question: string; answer: string }[]; levels: Level[] }[] = [];
  @Input() currentChatId: string | null = null;

  constructor(private router: Router, private service: LearningService) {}

  goToDashboard() {
    const currentChat = this.chats.find(chat => chat.id === this.currentChatId);
    if (currentChat) {
      this.service.currentLevels = currentChat.levels;
      this.router.navigate(['/dashboard']);
    }
  }
}
