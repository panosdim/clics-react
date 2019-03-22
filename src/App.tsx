import React from 'react';
import { SessionProvider, ViewCodes } from "./components";
import { Typography } from '@material-ui/core';

export const App = () =>
    <SessionProvider>
        <Typography component="h2" variant="h1" gutterBottom align="center">
            CLICS
        </Typography>
        <ViewCodes />
    </SessionProvider>
