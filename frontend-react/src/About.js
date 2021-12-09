import { software_version } from './App';
import { useState } from "react";
import React from 'react';
import { Button } from "react-bootstrap";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Styling/Theme';
import { GlobalStyles } from './Styling/Global';
//import process from NodeJS

const NODE_VERSION = process.version
const EXPRESS_VERSION = "---"
const REACT_VERSION = React.version
const MONGODB_VERSION = "---"

export default function About() {

    const [Theme, setTheme] = useState('dark'); //Ich weiß nicht was ich mache aber es klappt iwi XD Philip Button ist nur was wierd. 
    const toggleTheme = () => {
        if (Theme === 'dark'){
            setTheme('light');
        }
        
        else{
            setTheme('dark');
        }  
        
    }

    return (
        <ThemeProvider theme={Theme === 'dark' ? darkTheme : lightTheme}>
        <GlobalStyles /> 
        <div>
            <br />
            <h1>Simple Event Manager  Ver.&nbsp;{software_version} </h1>

            &nbsp;&nbsp;
            <Button variant="primary" onClick={toggleTheme}>
                Toggle Theme
            </Button>

            <br />
            <h2>Made by </h2>
            <h4>Jan-Luca Wolf, Colin Schubert, Philip Rexroth, Marvin Rock</h4>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            
            <h4> NodeJS Version: {NODE_VERSION}</h4>
            <h4> ExpressJS Version: {EXPRESS_VERSION}</h4>
            <h4> ReactJS Version: {REACT_VERSION}</h4>
            <h4> MongoDB Version: {MONGODB_VERSION}</h4>

            {/* <FetchComponent /> */}
        </div>
        </ThemeProvider>
    );
}