const mongoose = require('mongoose');
const User = require('../models/User');
const Employee = require('../models/Employee');

const resolvers = {
  Query: {
    hello: () => 'Backend is working!',

    getEmployees: async () => {
      try {
        return await Employee.find().sort({ createdAt: -1 });
      } catch (error) {
        throw new Error('Sorry, but we have failed to fetch employees');
      }
    },

    getEmployeeById: async (_, { id }) => {
      try {
        if (!mongoose.isValidObjectId(id)) {
          throw new Error('This is an invalid employee ID');
        }

        const employee = await Employee.findById(id);

        if (!employee) {
          throw new Error('Employee has not found');
        }

        return employee;
      } catch (error) {
        throw new Error(error.message || 'Sorry, but we have failed to fetch employee');
      }
    },

    searchEmployees: async (_, { department, position }) => {
      try {
        const filter = {};

        if (department) {
          filter.department = { $regex: department, $options: 'i' };
        }

        if (position) {
          filter.position = { $regex: position, $options: 'i' };
        }

        return await Employee.find(filter).sort({ createdAt: -1 });
      } catch (error) {
        throw new Error('Sorry, but we have failed to search employees');
      }
    }
  },

  Mutation: {
    signup: async (_, { fullName, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          throw new Error('User already exists with this email');
        }

        const newUser = new User({
          fullName,
          email,
          password
        });

        return await newUser.save();
      } catch (error) {
        throw new Error(error.message || 'Signup failed');
      }
    },

    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error('We cannot find the user at this time');
        }

        if (user.password !== password) {
          throw new Error('The password is invalid');
        }

        return user;
      } catch (error) {
        throw new Error(error.message || 'Sorry, but we have failed to login');
      }
    },

    addEmployee: async (_, { firstName, lastName, email, department, position, image }) => {
      try {
        const existingEmployee = await Employee.findOne({ email });

        if (existingEmployee) {
          throw new Error('The employee is already exists with this email');
        }

        const newEmployee = new Employee({
          firstName,
          lastName,
          email,
          department,
          position,
          image
        });

        return await newEmployee.save();
      } catch (error) {
        throw new Error(error.message || 'Failed to add employee');
      }
    },

    updateEmployee: async (_, { id, firstName, lastName, email, department, position, image }) => {
      try {
        if (!mongoose.isValidObjectId(id)) {
          throw new Error('Invalid employee ID');
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
          id,
          {
            ...(firstName !== undefined && { firstName }),
            ...(lastName !== undefined && { lastName }),
            ...(email !== undefined && { email }),
            ...(department !== undefined && { department }),
            ...(position !== undefined && { position }),
            ...(image !== undefined && { image })
          },
          {
            new: true,
            runValidators: true
          }
        );

        if (!updatedEmployee) {
          throw new Error('Employee has not found');
        }

        return updatedEmployee;
      } catch (error) {
        throw new Error(error.message || 'Failed to update employee');
      }
    },

    deleteEmployee: async (_, { id }) => {
      try {
        if (!mongoose.isValidObjectId(id)) {
          throw new Error('Invalid employee ID');
        }

        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
          throw new Error('Employee not found');
        }

        return 'Employee deleted successfully';
      } catch (error) {
        throw new Error(error.message || 'Sorry, but we have failed to delete employee');
      }
    }

  }
};

module.exports = resolvers;