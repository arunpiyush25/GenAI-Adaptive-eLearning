import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/services/learning.service';
import { Level } from '../../models/level.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading = false;
  response: string = '';
  chats: { id: string; title: string; responses: { question: string; answer: string }[]; levels: Level[] }[] = [];
  currentChatId: string | null = null;

  constructor(private router: Router, private service: LearningService) {}

  ngOnInit() {
    const savedChats = localStorage.getItem('chats');
    const savedChatId = localStorage.getItem('currentChatId');
  
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      // Ensure backward compatibility if previous format used strings
      this.chats = parsedChats.map((chat: any) => ({
        ...chat,
        responses: chat.responses.map((r: any) =>
          typeof r === 'string' ? { question: 'Unknown', answer: r } : r
        )
      }));
    }
  
    if (savedChatId) {
      this.currentChatId = savedChatId;
    }
  }

  goToDashboard() {
    const currentChat = this.chats.find(chat => chat.id === this.currentChatId);
    if (currentChat) {
      this.service.currentLevels = currentChat.levels;
      this.router.navigate(['/dashboard']);
    }
  }

  startNewChat() {
    const existingIds = this.chats.map(chat => parseInt(chat.id));
    const newChatId = (Math.max(0, ...existingIds) + 1).toString();
    const newChat = {
      id: newChatId,
      title: `Chat ${newChatId}`,
      responses: [],
      levels: [
        { name: 'Remembering', progress: 0 },
        { name: 'Understanding', progress: 0 },
        { name: 'Applying', progress: 0 },
        { name: 'Analyzing', progress: 0 },
        { name: 'Evaluating', progress: 0 },
        { name: 'Creating', progress: 0 }
      ]
    };
    this.chats.push(newChat);
    this.selectChat(newChatId);
    this.saveToLocalStorage();
  }

  selectChat(chatId: string) {
    this.currentChatId = chatId;
    localStorage.setItem('currentChatId', chatId);
    const chat = this.chats.find(c => c.id === chatId);
    this.response = chat ? chat.responses.join('\n') : '';
  }

  deleteChat(chatId: string) {
    this.chats = this.chats.filter(chat => chat.id !== chatId);
  
    // If the deleted chat was the current one, reset current chat
    if (this.currentChatId === chatId) {
      this.currentChatId = null;
      this.response = '';
    }
  
    // ✅ Save updated chat list to localStorage
    localStorage.setItem('chats', JSON.stringify(this.chats));
    localStorage.setItem('currentChatId', this.currentChatId ?? '');
  }
  

  scrollToInteraction() {
    const interactionSection = document.getElementById('interactionSection');
    if (interactionSection) {
      interactionSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async handleQuery(userQuery: string) {
    if (!userQuery.trim()) return;
  
    if (!this.currentChatId) {
      this.startNewChat();
    }
  
    this.isLoading = true;
  
    try {
      const { finalAnswer, level } = await this.service.generateResponse(userQuery);
      const currentChat = this.chats.find(chat => chat.id === this.currentChatId);
      if (currentChat) {
        currentChat.responses.push({ question: userQuery, answer: finalAnswer });
        this.updateProgress(currentChat, level, 10);
        this.saveToLocalStorage();
      }
    } catch (err) {
      const currentChat = this.chats.find(chat => chat.id === this.currentChatId);
      if (currentChat) {
        currentChat.responses.push({ question: userQuery, answer: 'Something went wrong. Please try again.' });
      }
    } finally {
      this.isLoading = false;
    }
  }

  updateProgress(chat: any, levelName: string, progressIncrease: number) {
    const level = chat.levels.find((l: Level) => l.name.toLowerCase() === levelName.toLowerCase().trim());
    if (level) {
      level.progress = Math.min(level.progress + progressIncrease, 100);
    }
  }

  getCurrentChatLevels() {
    const currentChat = this.chats.find(chat => chat.id === this.currentChatId);
    return currentChat ? currentChat.levels : [];
  }

  saveToLocalStorage() {
    localStorage.setItem('chats', JSON.stringify(this.chats));
    if (this.currentChatId) {
      localStorage.setItem('currentChatId', this.currentChatId);
    }
  }

  get currentResponses() {
    const currentChat = this.chats.find(chat => chat.id === this.currentChatId);
    return currentChat ? currentChat.responses : [];
  }
  
}
