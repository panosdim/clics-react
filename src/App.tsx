import React from "react";
import {LoginPage, MainPage} from "./pages";
import {isLoggedIn} from "./stitch";

export const App = () => isLoggedIn() ? (
    <MainPage/>
) : (
    <LoginPage/>
);
