import React from "react";

import {ClicsApp} from "../components";
import {Typography} from "@material-ui/core";

// noinspection HtmlDeprecatedAttribute
export const MainPage = () => (
    <>
        <Typography component="h2" variant="h1" gutterBottom align="center">
            CLICS
        </Typography>
        <ClicsApp/>
    </>
);