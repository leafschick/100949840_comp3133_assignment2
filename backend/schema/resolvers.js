const mongoose = require("mongoose");
const User = require("../models/User");
const Employee = require("../models/Employee");
const AvailabilityRequest = require("../models/AvailabilityRequest");
const TimeOffRequest = require("../models/TimeOffRequest");
const IncidentReport = require("../models/IncidentReport");
const DailyChecklist = require("../models/DailyChecklist");
const NewHireForm = require("../models/NewHireForm");

const resolvers = {
  Query: {
    hello: () => "Backend is working!",

    getEmployees: async () => {
      try {
        return await Employee.find().sort({ createdAt: -1 });
      } catch (error) {
        throw new Error("Sorry, but we have failed to fetch employees");
      }
    },

    getEmployeeById: async (_, { id }) => {
      try {
        if (!mongoose.isValidObjectId(id)) {
          throw new Error("This is an invalid employee ID");
        }

        const employee = await Employee.findById(id);

        if (!employee) {
          throw new Error("Employee has not found");
        }

        return employee;
      } catch (error) {
        throw new Error(
          error.message || "Sorry, but we have failed to fetch employee",
        );
      }
    },

    searchEmployees: async (_, { department, position }) => {
      try {
        const filter = {};

        if (department) {
          filter.department = { $regex: department, $options: "i" };
        }

        if (position) {
          filter.position = { $regex: position, $options: "i" };
        }

        return await Employee.find(filter).sort({ createdAt: -1 });
      } catch (error) {
        throw new Error("Sorry, but we have failed to search employees");
      }
    },

    getAvailabilityRequests: async () => {
      try {
        return await AvailabilityRequest.find().sort({ createdAt: -1 });
      } catch (error) {
        throw new Error("Failed to fetch availability requests");
      }
    },

    getTimeOffRequests: async () => {
      try {
        return await TimeOffRequest.find().sort({ createdAt: -1 });
      } catch (error) {
        throw new Error("Failed to fetch time-off requests");
      }
    },

    getIncidentReports: async () => {
      try {
        return await IncidentReport.find().sort({ createdAt: -1 });
      } catch (error) {
        throw new Error("Failed to fetch incident reports");
      }
    },

    getDailyChecklists: async () => {
      try {
        return await DailyChecklist.find().sort({ createdAt: -1 });
      } catch (error) {
        throw new Error("Failed to fetch daily checklists");
      }
    },

    getNewHireForms: async () => {
      try {
        return await NewHireForm.find().sort({ createdAt: -1 });
      } catch (error) {
        throw new Error("Failed to fetch new hire forms");
      }
    },
  },

  Mutation: {
    signup: async (_, { fullName, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          throw new Error("User already exists with this email");
        }

        const newUser = new User({
          fullName,
          email,
          password,
        });

        return await newUser.save();
      } catch (error) {
        throw new Error(error.message || "Signup failed");
      }
    },

    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("We cannot find the user at this time");
        }

        if (user.password !== password) {
          throw new Error("The password is invalid");
        }

        return user;
      } catch (error) {
        throw new Error(error.message || "Sorry, but we have failed to login");
      }
    },

    addEmployee: async (
      _,
      { firstName, lastName, email, department, position, image },
    ) => {
      try {
        const existingEmployee = await Employee.findOne({ email });

        if (existingEmployee) {
          throw new Error("The employee is already exists with this email");
        }

        const newEmployee = new Employee({
          firstName,
          lastName,
          email,
          department,
          position,
          image,
        });

        return await newEmployee.save();
      } catch (error) {
        throw new Error(error.message || "Failed to add employee");
      }
    },

    updateEmployee: async (
      _,
      { id, firstName, lastName, email, department, position, image },
    ) => {
      try {
        if (!mongoose.isValidObjectId(id)) {
          throw new Error("Invalid employee ID");
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
          id,
          {
            ...(firstName !== undefined && { firstName }),
            ...(lastName !== undefined && { lastName }),
            ...(email !== undefined && { email }),
            ...(department !== undefined && { department }),
            ...(position !== undefined && { position }),
            ...(image !== undefined && { image }),
          },
          {
            new: true,
            runValidators: true,
          },
        );

        if (!updatedEmployee) {
          throw new Error("Employee has not found");
        }

        return updatedEmployee;
      } catch (error) {
        throw new Error(error.message || "Failed to update employee");
      }
    },

    deleteEmployee: async (_, { id }) => {
      try {
        if (!mongoose.isValidObjectId(id)) {
          throw new Error("Invalid employee ID");
        }

        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
          throw new Error("Employee not found");
        }

        return "Employee deleted successfully";
      } catch (error) {
        throw new Error(
          error.message || "Sorry, but we have failed to delete employee",
        );
      }
    },

    submitAvailability: async (
      _,
      { employeeName, availableDays, preferredShift },
    ) => {
      try {
        const newAvailability = new AvailabilityRequest({
          employeeName,
          availableDays,
          preferredShift,
        });

        await newAvailability.save();
        return newAvailability;
      } catch (error) {
        throw new Error("Failed to submit availability form");
      }
    },

    submitTimeOffRequest: async (
      _,
      { employeeName, startDate, endDate, reason },
    ) => {
      try {
        const newRequest = new TimeOffRequest({
          employeeName,
          startDate,
          endDate,
          reason,
        });

        await newRequest.save();
        return newRequest;
      } catch (error) {
        throw new Error("Failed to submit time-off request");
      }
    },

    submitIncidentReport: async (
      _,
      { employeeName, incidentDate, incidentType, description },
    ) => {
      try {
        const newReport = new IncidentReport({
          employeeName,
          incidentDate,
          incidentType,
          description,
        });

        await newReport.save();
        return newReport;
      } catch (error) {
        throw new Error("Failed to submit incident report");
      }
    },

    submitDailyChecklist: async (
      _,
      { employeeName, shiftType, checklistItems, notes },
    ) => {
      try {
        const newChecklist = new DailyChecklist({
          employeeName,
          shiftType,
          checklistItems,
          notes,
        });

        await newChecklist.save();
        return newChecklist;
      } catch (error) {
        throw new Error("Failed to submit daily checklist");
      }
    },

    submitNewHireForm: async (
      _,
      {
        fullName,
        email,
        phoneNumber,
        position,
        department,
        startDate,
        emergencyContact,
      },
    ) => {
      try {
        const newHire = new NewHireForm({
          fullName,
          email,
          phoneNumber,
          position,
          department,
          startDate,
          emergencyContact,
        });

        await newHire.save();
        return newHire;
      } catch (error) {
        throw new Error("Failed to submit new hire form");
      }
    },
  },
};

module.exports = resolvers;
