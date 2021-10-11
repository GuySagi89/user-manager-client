import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private serverURL = `${environment.serverURL}/users`;
  private usersSubject= new ReplaySubject<User>();

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.serverURL);
  }

  getUserByID(id: number): Observable<User> {
    const url = `${this.serverURL}/${id}`;
    return this.httpClient.get<User>(url);
  }

  getUsersCount() {
    return this.httpClient
      .get<User[]>(this.serverURL)
      .pipe(map((u) => u.length));
  }

  deleteUserByID(id: number) {
    const url = `${this.serverURL}/${id}`;
    return this.httpClient.delete(url).toPromise();
  }

  addUser(user: User) {
    return this.httpClient.post<User>(this.serverURL, user).toPromise();
  }

  editUser(user: User) {
    const url = `${this.serverURL}/${user.id}`;
    return this.httpClient.put<User>(url, user).toPromise();
  }
}
