import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Level } from '../models/level.model';

@Injectable({ providedIn: 'root' })
export class LearningService {
  public currentLevels: Level[] = [];
  constructor(private http: HttpClient) {}

  async generateResponse(query: string): Promise<{ finalAnswer: string, level: string }> {
    const res = await this.http.post<any>('http://localhost:5000/api/query', { userQuery: query }).toPromise();
    return {
      finalAnswer: res.finalAnswer,
      level: res.level
    };
  }
}
