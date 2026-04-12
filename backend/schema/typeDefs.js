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

  type Query {
    hello: String
    getEmployees: [Employee]
    getEmployeeById(id: ID!): Employee
    searchEmployees(department: String, position: String): [Employee]
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
  }

  type AvailabilityRequest {
    id: ID!
    employeeName: String!
    availableDays: [String]!
    preferredShift: String!
    createdAt: String
    updatedAt: String
  }


`;

module.exports = typeDefs;