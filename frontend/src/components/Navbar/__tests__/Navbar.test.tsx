import React from "react";
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../Navbar";
import * as localStorageUtils from "@localStorage/utils";

jest.mock("@localStorage/utils");

describe("Navbar", () => {
    it("renders the Navbar component", () => {
        (localStorageUtils.getUserIdFromLocalStorage as jest.Mock).mockReturnValue(null);
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );
        expect(screen.getByText("MockExperiences")).toBeInTheDocument();
    });

    it("renders routes for logged-in user", () => {
        (localStorageUtils.getUserIdFromLocalStorage as jest.Mock).mockReturnValue("123");
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );
        expect(screen.getByText("Prenota")).toBeInTheDocument();
        expect(screen.getByText("Gestisci")).toBeInTheDocument();
        expect(screen.getByText("Logout")).toBeInTheDocument();
    });

    it("does not render routes for logged-out user", () => {
        (localStorageUtils.getUserIdFromLocalStorage as jest.Mock).mockReturnValue(null);
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );
        expect(screen.queryByText("Prenota")).toBeNull();
        expect(screen.queryByText("Gestisci")).toBeNull();
        expect(screen.queryByText("Logout")).toBeNull();
    });
});
