import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("should have Docs Text", () => {
    render(<Home />); //Arrange

    const myElem = screen.getByText(/docs/i) //Act

    expect(myElem).toBeInTheDocument(); //Assert
  });
});
