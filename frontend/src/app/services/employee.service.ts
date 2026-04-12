import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
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
      `,
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
      variables: { id },
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
      variables: employee,
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
        ...employee,
      },
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
      variables: { id },
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
        position: position || null,
      },
    };

    return this.http.post<any>(this.graphqlUrl, body);
  }

  submitAvailability(employeeName: string, availableDays: string[], preferredShift: string) {
    const body = {
      query: `
      mutation SubmitAvailability($employeeName: String!, $availableDays: [String!]!, $preferredShift: String!) {
        submitAvailability(
          employeeName: $employeeName
          availableDays: $availableDays
          preferredShift: $preferredShift
        ) {
          id
          employeeName
          availableDays
          preferredShift
          createdAt
        }
      }
    `,
      variables: {
        employeeName,
        availableDays,
        preferredShift,
      },
    };

    return this.http.post<any>(this.graphqlUrl, body);
  }

  submitTimeOffRequest(employeeName: string, startDate: string, endDate: string, reason: string) {
    const body = {
      query: `
      mutation SubmitTimeOffRequest($employeeName: String!, $startDate: String!, $endDate: String!, $reason: String!) {
        submitTimeOffRequest(
          employeeName: $employeeName
          startDate: $startDate
          endDate: $endDate
          reason: $reason
        ) {
          id
          employeeName
          startDate
          endDate
          reason
          createdAt
        }
      }
    `,
      variables: {
        employeeName,
        startDate,
        endDate,
        reason,
      },
    };

    return this.http.post<any>(this.graphqlUrl, body);
  }

  submitIncidentReport(
    employeeName: string,
    incidentDate: string,
    incidentType: string,
    description: string,
  ) {
    const body = {
      query: `
      mutation SubmitIncidentReport(
        $employeeName: String!
        $incidentDate: String!
        $incidentType: String!
        $description: String!
      ) {
        submitIncidentReport(
          employeeName: $employeeName
          incidentDate: $incidentDate
          incidentType: $incidentType
          description: $description
        ) {
          id
          employeeName
          incidentDate
          incidentType
          description
          createdAt
        }
      }
    `,
      variables: {
        employeeName,
        incidentDate,
        incidentType,
        description,
      },
    };

    return this.http.post<any>(this.graphqlUrl, body);
  }

  submitDailyChecklist(
    employeeName: string,
    shiftType: string,
    checklistItems: string[],
    notes: string,
  ) {
    const body = {
      query: `
      mutation SubmitDailyChecklist(
        $employeeName: String!
        $shiftType: String!
        $checklistItems: [String!]!
        $notes: String
      ) {
        submitDailyChecklist(
          employeeName: $employeeName
          shiftType: $shiftType
          checklistItems: $checklistItems
          notes: $notes
        ) {
          id
          employeeName
          shiftType
          checklistItems
          notes
          createdAt
        }
      }
    `,
      variables: {
        employeeName,
        shiftType,
        checklistItems,
        notes,
      },
    };

    return this.http.post<any>(this.graphqlUrl, body);
  }

  submitNewHireForm(
    fullName: string,
    email: string,
    phoneNumber: string,
    position: string,
    department: string,
    startDate: string,
    emergencyContact: string,
  ) {
    const body = {
      query: `
      mutation SubmitNewHireForm(
        $fullName: String!
        $email: String!
        $phoneNumber: String!
        $position: String!
        $department: String!
        $startDate: String!
        $emergencyContact: String!
      ) {
        submitNewHireForm(
          fullName: $fullName
          email: $email
          phoneNumber: $phoneNumber
          position: $position
          department: $department
          startDate: $startDate
          emergencyContact: $emergencyContact
        ) {
          id
          fullName
          email
          phoneNumber
          position
          department
          startDate
          emergencyContact
          createdAt
        }
      }
    `,
      variables: {
        fullName,
        email,
        phoneNumber,
        position,
        department,
        startDate,
        emergencyContact,
      },
    };

    return this.http.post<any>(this.graphqlUrl, body);
  }
}
