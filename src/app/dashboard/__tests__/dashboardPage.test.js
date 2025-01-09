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

  it("renders DashboardPage", () => {
    // Render the DashboardPage component
    render(<DashboardPage />);

    // Verify the heading
    const heading = screen.getByText(/^dashboard$/i); // Case-insensitive match
    expect(heading).toBeInTheDocument();
  });

  it("renders user email on Dashboard Page", async () => {
    // Mock the API response
    const mockUserData = { email: "glow@gmail.com" };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockUserData),
    });

    // Render the DashboardPage component
    render(<DashboardPage />);

    // Wait for the email to appear
    await waitFor(() => {
      const email = screen.getByText("glow@gmail.com");
      expect(email).toBeInTheDocument();
    });

    // Ensure fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith("/api/auth/login", {
      method: "GET",
      credentials: "include",
    });
  });
});
