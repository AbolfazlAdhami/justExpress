const express = require("express");
const config = require("../../config");
const router = express.Router();

// middleware

// Controllers
const { api: ControllerApi } = config.path.controller;

// Admin Controller
const CourseController=require(`${ControllerApi}/admin/Course`)