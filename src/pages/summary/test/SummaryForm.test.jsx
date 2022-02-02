import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test('Checkbox is unchecked by default and button is disabled', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions'});
    const confirmButton = screen.getByRole('button', {name: 'Confirm order'})

    expect(checkbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();

})

test('Checking checkbox enables button', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions'});
    const confirmButton = screen.getByRole('button', {name: 'Confirm order'})

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(confirmButton).toBeEnabled();

    fireEvent.click(checkbox);
    expect(confirmButton).toBeDisabled();

})