import React from 'react';
// eslint-disable-next-line
import { Badge, Button, Card } from "react-bootstrap";
import EventCard from './Contents/Card';
import EventCanvas from './Contents/EventCanvas';
import LoadingCard from './Contents/LoadingCard';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Styling/Theme';
import { GlobalStyles } from './Styling/Global';
import { NewEventPopup, DeleteAllEventsPopup } from "./Contents/NewPopup";
import { WeatherGUI } from "./Contents/Weather"

export const ModalContext = {
    newEvent: false,
    editEvent: false,
    deleteEvent: false,
    deleteAllEvents: false,
    eventCanvas: false
};

export const CurrentID = {
    id: "null",
    deleteId: "null",
    reFetch: () => { console.log("null lol") }
};

var Theme = 'dark';

export default class Content extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            isLoaded: false,
            error: null,
            events: []

        };


        this.reRender = this.reRender.bind(this);
    }

    // eslint-disable-next-line
    reRender(value, shouldfetch = new Boolean('false'), fetch_type) { //value always "this.state", shouldfetch: Bool -> reFetch?, fetch_type: fetchType
        if (shouldfetch === 'true') {
            fetch("http://localhost:8000/api/events")
                .then(res => res.json())
                .then(result => {
                    if (result.error)
                        this.setState({ isLoaded: true, error: result.error });
                    else {
                        this.setState({ isLoaded: true, events: result });
                        this.setState({ value, t: Math.random() });
                    }
                }).catch(err => console.error(err));
        } else {

            this.setState({ value });
        }
    }

    componentDidMount() {
        this.reRender(this.state, 'true');
        //this.makeApiCall();
        // console.log("Mounted");
    }

    handleShowNewEvent() {
        ModalContext.newEvent = true;
        this.reRender(this.state);
    }

    toggleTheme() {
        if (Theme === 'dark') {
            Theme = 'light';
        }
        else {
            Theme = 'dark';
        }
        this.reRender(this.state);
        console.log(Theme)
    }

    handleShowDeleteAllEvents() {
        ModalContext.deleteAllEvents = true;
        this.reRender(this.state);
    }

    render() {
        // console.log("Rendered")
        //Show x Event Cards
        this.items = [];
        if (this.state.isLoaded) {
            // console.log("isLoaded");
            if (!this.state.error) {
                // console.log("No Error");
                for (const event of this.state.events) {
                    const datetime = event.date.split('-');
                    this.items.push(<EventCard reRender={this.reRender} id={event._id} event_title={event.title} event_description={event.message} event_date={datetime[1]} event_time={datetime[0]} event_duration={event.duration} />);

                }
            }
        } else {
            this.items.push(<LoadingCard />);
            this.items.push(<LoadingCard />);
            this.items.push(<LoadingCard />);
            this.items.push(<LoadingCard />);
        }

        return (
            //Show x Event Cards

            <ThemeProvider theme={Theme === 'dark' ? darkTheme : lightTheme}>
                <GlobalStyles />
                <div className="mt-3">
                    <div class=' d-inline-flex'>
                        {/*-----BUTTONS-----*/}
                        <Button variant="primary" onClick={this.handleShowNewEvent.bind(this)}>
                            Neues Event
                        </Button>
                        &nbsp;&nbsp;
                        <Button variant="primary" onClick={this.handleShowDeleteAllEvents.bind(this)}>
                            Alle Events löschen
                        </Button>
                        &nbsp;&nbsp;
                        <Button variant="primary" onClick={this.toggleTheme.bind(this)}>
                            Toggle Theme
                        </Button>
                        &nbsp;&nbsp;


                    </div>


                    <hr />

                    {/*!!!WORK HERE!!!*/}

                    <div class="d-flex justify-content-center flex-wrap" >
                        {this.items}
                        <WeatherGUI />
                    </div>

                    <NewEventPopup reRender={this.reRender} />
                    <DeleteAllEventsPopup reRender={this.reRender} />
                    <EventCanvas reRender={this.reRender} />
                </div>


            </ThemeProvider>
        );
    }

}