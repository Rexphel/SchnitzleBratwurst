import "./App.css"; 
import Navigation from './Navigation';
import Home from './Home';
import About from './About';
import { BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Container } from "react-bootstrap";

export default function App() {
    return (
        <Router>
            <div>
                <Navigation />

                <Container>
                    <Switch>
                        <Router path="/about">
                            <About />
                        </Router>
                        <Route path="/settings">
                            <Settings />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Container>
            </div>
        </Router>
    );
}


function Settings() {
    return <h2>Settings</h2>;
}
