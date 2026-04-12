const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    fullName: String!
    email: String!
    password: String!
    createdAt: String
    updatedAt: String
  }

  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    department: String!
    position: String!
    image: String
    createdAt: String
    updatedAt: String
  }

  type AvailabilityRequest {
    id: ID
    employeeName: String
    availableDays: [String]
    preferredShift: String
    createdAt: String
    updatedAt: String
  }
  type TimeOffRequest {
    id: ID
    employeeName: String
    startDate: String
    endDate: String
    reason: String
    createdAt: String
    updatedAt: String
  }

  type IncidentReport {
    id: ID
    employeeName: String
    incidentDate: String
    incidentType: String
    description: String
    createdAt: String
    updatedAt: String
  }

  type DailyChecklist {
  id: ID
  employeeName: String
  shiftType: String
  checklistItems: [String]
  notes: String
  createdAt: String
  updatedAt: String
}

type NewHireForm {
  id: ID
  fullName: String
  email: String
  phoneNumber: String
  position: String
  department: String
  startDate: String
  emergencyContact: String
  createdAt: String
  updatedAt: String
}

  type Query {
    hello: String
    getEmployees: [Employee]
    getEmployeeById(id: ID!): Employee
    searchEmployees(department: String, position: String): [Employee]
    getAvailabilityRequests: [AvailabilityRequest]
    getTimeOffRequests: [TimeOffRequest]
    getIncidentReports: [IncidentReport]
    getDailyChecklists: [DailyChecklist]
    getNewHireForms: [NewHireForm]
  }

  type Mutation {
    signup(fullName: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    addEmployee(
      firstName: String!
      lastName: String!
      email: String!
      department: String!
      position: String!
      image: String
    ): Employee

    updateEmployee(
      id: ID!
      firstName: String
      lastName: String
      email: String
      department: String
      position: String
      image: String
    ): Employee

    deleteEmployee(id: ID!): String

    submitAvailability(
      employeeName: String!
      availableDays: [String!]!
      preferredShift: String!
    ): AvailabilityRequest

    submitTimeOffRequest(
      employeeName: String!
      startDate: String!
      endDate: String!
      reason: String!
    ): TimeOffRequest

    submitIncidentReport(
      employeeName: String!
      incidentDate: String!
      incidentType: String!
      description: String!
    ): IncidentReport

    submitDailyChecklist(
  employeeName: String!
  shiftType: String!
  checklistItems: [String!]!
  notes: String
): DailyChecklist

submitNewHireForm(
  fullName: String!
  email: String!
  phoneNumber: String!
  position: String!
  department: String!
  startDate: String!
  emergencyContact: String!
): NewHireForm

  }
`;

module.exports = typeDefs;