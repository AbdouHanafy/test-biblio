import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {
  private apiUrl = 'http://localhost:8000'; // replace with your API URL
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    this.token = token;
  }

  private getHeaders() {
    return this.token
      ? new HttpHeaders({ Authorization: `Bearer ${this.token}` })
      : undefined;
  }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/books`, { headers: this.getHeaders() });
  }

  createBook(title: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/books`, { title }, { headers: this.getHeaders() });
  }

  updateBook(id: number, title: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/books/${id}`, { title }, { headers: this.getHeaders() });
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/books/${id}`, { headers: this.getHeaders() });
  }

  publicTest(): Observable<any> {
    return this.http.get(`${this.apiUrl}/public`);
  }

  protectedTest(): Observable<any> {
    return this.http.get(`${this.apiUrl}/protected`, { headers: this.getHeaders() });
  }
}
