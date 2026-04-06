import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private graphqlUrl = 'http://localhost:4000/graphql';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    const body = {
      query: `
        query {
          getEmployees {
            id
            firstName
            lastName
            email
            department
            position
            image
          }
        }
      `
    };

    return this.http.post<any>(this.graphqlUrl, body);
  }

  getEmployeeById(id: string): Observable<any> {
    const body = {
      query: `
        query GetEmployeeById($id: ID!) {
          getEmployeeById(id: $id) {
            id
            firstName
            lastName
            email
            department
            position
            image
          }
        }
      `,
      variables: { id }
    };

    return this.http.post<any>(this.graphqlUrl, body);
  }

  addEmployee(employee: any): Observable<any> {
    const body = {
      query: `
        mutation AddEmployee(
          $firstName: String!,
          $lastName: String!,
          $email: String!,
          $department: String!,
          $position: String!,
          $image: String
        ) {
          addEmployee(
            firstName: $firstName,
            lastName: $lastName,
            email: $email,
            department: $department,
            position: $position,
            image: $image
          ) {
            id
            firstName
            lastName
            email
            department
            position
            image
          }
        }
      `,
      variables: employee
    };

    return this.http.post<any>(this.graphqlUrl, body);
  }

  updateEmployee(id: string, employee: any): Observable<any> {
    const body = {
      query: `
        mutation UpdateEmployee(
          $id: ID!,
          $firstName: String,
          $lastName: String,
          $email: String,
          $department: String,
          $position: String,
          $image: String
        ) {
          updateEmployee(
            id: $id,
            firstName: $firstName,
            lastName: $lastName,
            email: $email,
            department: $department,
            position: $position,
            image: $image
          ) {
            id
            firstName
            lastName
            email
            department
            position
            image
          }
        }
      `,
      variables: {
        id,
        ...employee
      }
    };

    return this.http.post<any>(this.graphqlUrl, body);
  }

  deleteEmployee(id: string): Observable<any> {
    const body = {
      query: `
        mutation DeleteEmployee($id: ID!) {
          deleteEmployee(id: $id)
        }
      `,
      variables: { id }
    };

    return this.http.post<any>(this.graphqlUrl, body);
  }

  searchEmployees(department?: string, position?: string): Observable<any> {
    const body = {
      query: `
        query SearchEmployees($department: String, $position: String) {
          searchEmployees(department: $department, position: $position) {
            id
            firstName
            lastName
            email
            department
            position
            image
          }
        }
      `,
      variables: {
        department: department || null,
        position: position || null
      }
    };

    return this.http.post<any>(this.graphqlUrl, body);
  }
}