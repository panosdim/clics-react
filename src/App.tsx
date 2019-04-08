import React from "react";
import {ClicsCodes} from "./components";
import {Typography} from "@material-ui/core";

export const App = () => (
    <>
        <Typography component="h2" variant="h1" gutterBottom align="center">
            CLICS
        </Typography>
        <ClicsCodes/>
    </>
);
