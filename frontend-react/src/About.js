import { software_version } from './App';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Styling/Theme';
import { GlobalStyles } from './Styling/Global';
//import process from NodeJS

const Theme = 'dark'
export default class About extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            error: null,
            versions: []
        }
    }

    componentDidMount() {
        console.log("Pulling Versions...")
        fetch("http://localhost:8000/api/version")
        .then(res => res.json())
        .then(result => {
            if (result.error)
                this.setState({isLoaded: true, error: result.error});
            else {
                this.setState({isLoaded: true, versions: result});
            }
        }).catch(err => console.error(`Wasn't able to automatically fetch versions. Err: ${err}`));
    }



    render() {

    const NODE_VERSION = this.state.versions.node;
    const EXPRESS_VERSION = this.state.versions.express;
    const REACT_VERSION = (`v${React.version}`)
    const MONGODB_VERSION = this.state.versions.mongo;
    
    // const [Theme, setTheme] = State('dark'); //Ich weiß nicht was ich mache aber es klappt iwi XD Philip Button ist nur was wierd. 
    // const toggleTheme = () => {
    //     if (Theme === 'dark'){
    //         setTheme('light');
    //     }
        
    //     else{
    //         setTheme('dark');
    //     }  
        
    // }

    return (
        <ThemeProvider theme={Theme === 'dark' ? darkTheme : lightTheme}>
        <GlobalStyles /> 
        <div>
            <br />
            <h1>Simple Event Manager  Ver.&nbsp;{software_version} </h1>

            &nbsp;&nbsp;
            {/* <Button variant="primary" onClick={toggleTheme}>
                Toggle Theme
            </Button> */}

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
}