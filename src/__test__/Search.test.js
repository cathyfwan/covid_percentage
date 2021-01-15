import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Search from "../components/Search";

test("Search: renders correctly", () => {
  const { getByText } = render(<Search />);
  const linkElement = getByText("Clear");
  expect(linkElement).toBeInTheDocument();
});

test("Search: if props of value changes to abc, text displayed on input box should abc", () => {
  const mockOnchangeFn = jest.fn();
  const mockClearFn = jest.fn();

  const { getByPlaceholderText } = render(
    <Search value="abc" onChange={mockOnchangeFn} clear={mockClearFn} />
  );

  const input = getByPlaceholderText("Search a country..");
  expect(input.value).toBe("abc");
});

test("Search: if i enter 'au' in the input box, the onchange should be called with 'au'", () => {
  const mockOnchangeFn = jest.fn();
  const mockClearFn = jest.fn();

  const { getByPlaceholderText } = render(
    <Search value="abc" onChange={mockOnchangeFn} clear={mockClearFn} />
  );

  const input = getByPlaceholderText("Search a country..");
  fireEvent.change(input, { target: { value: "au" } });
  expect(mockOnchangeFn).toBeCalledWith("au");
});

test("Search: clear button works!", () => {
  const mockOnchangeFn = jest.fn();
  const mockClearFn = jest.fn();

  const { getByTestId } = render(
    <Search value="abc" onChange={mockOnchangeFn} clear={mockClearFn} />
  );

  const clear = getByTestId("clearBtn");
  fireEvent.click(clear);
  expect(mockClearFn).toBeCalled();
});
