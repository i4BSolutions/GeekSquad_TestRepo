import React, { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import DashboardPage from "../page";
import "@testing-library/jest-dom";


// Mock the fetch API
global.fetch = jest.fn();

describe("DashboardPage", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
    global.fetch.mockRestore(); // Restore fetch mock after each test
  });

  it("includes Home text in the dashboard page", () => {
    // Arrange
    render(<DashboardPage />);

    // Act
    const heading = screen.getByRole("heading", { name: /home/i });

    // Assert
    expect(heading).toBeInTheDocument();
  });

  it("should fetch user data and show welcome message", async () => {
    // Arrange
    const hardcodedEmail = "glow@gmail.com";
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ email: hardcodedEmail }),
    });
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<DashboardPage />);
    

    // Act & Assert
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        `Welcome to the Dashboard, ${hardcodedEmail}!`
      );
    });

    // Cleanup
    alertMock.mockRestore();
  });
  describe("Behaviour",()=>{
it("Add to cart clicked and item added to cart", async () => {
  // Arrange
  render(<DashboardPage />);
  //Act
  // When testing, code that causes React state updates should be wrapped into act(...):
  act(() => {
    const addToCart = screen.getAllByTestId("add-to-cart");
    addToCart[0].click();
  });

  //Assert
  const cartcount = screen.getAllByTestId("cart-count");
  expect(cartcount).toHaveLength(1);
});
  })
  
});
