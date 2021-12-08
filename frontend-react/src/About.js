import { software_version } from './App';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Styling/Theme';
import { GlobalStyles } from './Styling/Global';
<<<<<<< HEAD
//import process from NodeJS
=======
>>>>>>> fa87ea4c491b3fcae5c154cba792cc92c54cf8e8

const NODE_VERSION = process.version
const EXPRESS_VERSION = "---"
const REACT_VERSION = React.version
const MONGODB_VERSION = "---"

export default function About() {
    return (
<<<<<<< HEAD

        <ThemeProvider theme={darkTheme}>
        <GlobalStyles />   
=======
        <ThemeProvider theme={darkTheme}>
        <GlobalStyles /> 
>>>>>>> fa87ea4c491b3fcae5c154cba792cc92c54cf8e8
        <div>
            <br />
            <h1>Simple Event Manager  Ver.&nbsp;{software_version} </h1>
            <br />
            <h2>Made by </h2>
            <h4>Jan-Luca Wolf, Colin Schubert, Philip Rexroth, Marvin Rock</h4>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

            <h4> NodeJS Version: {NODE_VERSION}</h4>
            <h4> ExpressJS Version: {EXPRESS_VERSION}</h4>
            <h4> ReactJS Version: {REACT_VERSION}</h4>
            <h4> MongoDB Version: {MONGODB_VERSION}</h4>
        </div>
        </ThemeProvider>
    );
}