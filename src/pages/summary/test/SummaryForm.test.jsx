import React from "react";
import {queryByText, render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

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

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(confirmButton).toBeEnabled();

    userEvent.click(checkbox);
    expect(confirmButton).toBeDisabled();

})

test('popover response to hover', async() => {
    render(<SummaryForm />);
    // popover starts out hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);
    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    //popover disappears when we mouse out
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
        screen.queryByText(/no ice cream will actually be delivered/i)
    );
});