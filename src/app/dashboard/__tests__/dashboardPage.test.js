import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import DashboardPage from "../page";
import "@testing-library/jest-dom";

// Mock the fetch API
global.fetch = jest.fn();

describe("DashboardPage", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });
  


});
