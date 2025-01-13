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
  it("include Home text in dashboard Page", async () => {
    
    //Arrange 
    render(<DashboardPage />);
    //Act
    //verify heading text
    const heading = screen.getByRole("heading", { name: /home/i });

    //Assert
   expect(heading).toBeInTheDocument();
  });


});
