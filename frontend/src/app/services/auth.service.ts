import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private graphqlUrl = 'http://localhost:4000/graphql';

  constructor(private http: HttpClient) {}

  signup(fullName: string, email: string, password: string): Observable<any> {
    const body = {
      query: `
        mutation Signup($fullName: String!, $email: String!, $password: String!) {
          signup(fullName: $fullName, email: $email, password: $password) {
            id
            fullName
            email
          }
        }
      `,
      variables: {
        fullName,
        email,
        password
      }
    };

    return this.http.post<any>(this.graphqlUrl, body);
  }

  login(email: string, password: string): Observable<any> {
    const body = {
      query: `
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            id
            fullName
            email
          }
        }
      `,
      variables: {
        email,
        password
      }
    };

    return this.http.post<any>(this.graphqlUrl, body);
  }
}