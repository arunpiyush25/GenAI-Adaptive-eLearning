import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { QueryInputComponent } from './components/query-input/query-input.component';
import { ResponseDisplayComponent } from './components/response-display/response-display.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ChatSidebarComponent } from './components/chat-sidebar/chat-sidebar.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    QueryInputComponent,
    ResponseDisplayComponent,
    LoaderComponent,
    NavbarComponent,
    DashboardComponent,
    HomeComponent,
    ChatSidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,            // ✅ Add this
    HttpClientModule, 
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
