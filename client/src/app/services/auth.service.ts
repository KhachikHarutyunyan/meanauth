import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  domain = 'http://localhost:5000/';
  authToken: any;
  user: any;

  constructor(
    private http: HttpClient
  ) { }

  register(user) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    // headers.append('Content-Type', 'application/json');
    return this.http.post(this.domain + 'users/register', user, {headers: headers});
  }

  login(user) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    // headers.append('Content-Type', 'application/json');
    return this.http.post(this.domain + 'users/authenticate', user, { headers: headers });
  }

  getProfile() {
    // const headers = new HttpHeaders({
    //   'Authorization': this.authToken,
    //   'Content-Type': 'application/json'
    // });
    // this.loadToken();
    // headers.append('Authorization', this.authToken);
    // headers.append('Content-Type', 'application/json');
    // return this.http.get(this.domain + 'users/profile', { headers: headers });
    return this.http.get(this.domain + 'users/profile', {
      headers: { 'Authorization': localStorage.getItem('id_token') }
    });
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

}
