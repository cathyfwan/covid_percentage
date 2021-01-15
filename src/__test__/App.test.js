import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../components/App";

jest.mock("../apis");

test("App: renders correctly", async () => {
  const { container, getByText } = render(<App />);

  await waitFor(() => {
    expect(container.querySelectorAll("table.rankTable tbody tr")).toHaveLength(
      10
    );

    const nextBtn = container.querySelector("button.next");
    fireEvent.click(nextBtn);
    expect(container.querySelectorAll("table.rankTable tbody tr")).toHaveLength(
      20
    );

    fireEvent.click(nextBtn);
    expect(container.querySelectorAll("table.rankTable tbody tr")).toHaveLength(
      30
    );
  });
});
