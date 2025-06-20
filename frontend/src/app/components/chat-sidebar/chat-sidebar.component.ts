import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.css']
})
export class ChatSidebarComponent {
  @Input() chats: { id: string, title: string }[] = [];
  @Input() currentChatId: string = '';
  @Output() newChat = new EventEmitter<void>();
  @Output() selectChat = new EventEmitter<string>();
  @Output() deleteChat = new EventEmitter<string>();

  isOpen = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  handleNewChat() {
    this.newChat.emit();
    console.log("New Chat");
  }

  handleSelectChat(chatId: string) {
    this.selectChat.emit(chatId);
    console.log("Selected Chat");
  }

  handleDeleteChat(chatId: string) {
    if (confirm("Are you sure you want to delete this chat?")) {
      this.deleteChat.emit(chatId);
      console.log("Deleted Chat");
    }
  }
}
