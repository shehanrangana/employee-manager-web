import AddForm from "@/pages/employee/add";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

jest.mock("next/router", () => require("next-router-mock"));

describe("AddForm", () => {
  const initialState = {
    employees: {
      submit: {
        loading: false,
        success: false,
      },
    },
  };

  const mockStore = configureStore();

  it("Add Employee page title should be 'Add Employee'", () => {
    const store = mockStore(initialState);
    const { getByRole } = render(
      <Provider store={store}>
        <AddForm />
      </Provider>
    );

    const title = getByRole("heading", { name: "Add Employee" });
    expect(title).toBeTruthy();
  });

  it("All the add form elements should be in the Add Employee page", () => {
    const store = mockStore(initialState);
    const { getByRole, getByLabelText } = render(
      <Provider store={store}>
        <AddForm />
      </Provider>
    );

    const firstNameInput = getByRole("textbox", { name: "First Name" });
    const lastNameInput = getByRole("textbox", { name: "Last Name" });
    const emailInput = getByRole("textbox", { name: "Email" });
    const phoneNumberInput = getByRole("textbox", { name: "Phone" });
    const genderSelect = getByLabelText("Gender");
    const addBtn = getByRole("button", { name: "Add" });

    expect(firstNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(phoneNumberInput).toBeTruthy();
    expect(genderSelect).toBeTruthy();
    expect(addBtn).toBeTruthy();
  });
});
