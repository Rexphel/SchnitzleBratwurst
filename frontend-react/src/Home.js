import React from 'react';
// eslint-disable-next-line
import { Badge, Button, Card } from "react-bootstrap";
import EventCard from './Contents/Card';
import EventCanvas from './Contents/EventCanvas';
import LoadingCard from './Contents/LoadingCard';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Styling/Theme';
import { GlobalStyles } from './Styling/Global';
import { NewEventPopup, DeleteEventPopup, DeleteAllEventsPopup } from "./Contents/NewPopup";
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

    // refreshMain = refreshMain.bind(this);
    // this.updateText1 = this.updateText1.bind(this);

    // const new_event = useState(false);
    // this.show_new_event = new_event[0];
    // this.setShow_new_event = new_event[1];
    // // const [show_new_event, setShow_new_event] = useState(false);
    // this.handleClose_new_event = () => this.setShow_new_event(false);
    // this.handleShow_new_event = () => this.setShow_new_event(true);
    // this.handleClose_new_event = () => this.setState({show_new_event: false});
    // this.handleShow_new_event = () => this.setState({show_new_event: true});

    // const [show_edit_event, setShow_edit_event] = useState(false);
    // const handleClose_edit_event = () => setShow_edit_event(false);
    // const handleShow_edit_event = () => setShow_edit_event(true);

    // const [show_delete_event, setShow_delete_event] = useState(false);
    // const handleClose_delete_event = () => setShow_delete_event(false);
    // const handleShow_delete_event = () => setShow_delete_event(true);

    // const delete_all_events = useState(false);
    // this.show_delete_all_events = delete_all_events[0];
    // this.setShow_delete_all_events = delete_all_events[1];
    // // const [show_delete_all_events, setShow_delete_all_events] = useState(false);
    // this.handleClose_delete_all_events = () => this.setShow_delete_all_events(false);
    // this.handleShow_delete_all_events = () => this.setShow_delete_all_events(true);
    // this.handleClose_delete_all_events = () => this.setState({show_delete_all_events: false});
    // this.handleShow_delete_all_events = () => this.setState({show_delete_all_events: true});

    // const [show_event_canvas, setShow_event_canvas] = useState(false);
    // const handleClose_event_canvas = () => setShow_event_canvas(false);
    // const handleShow_event_canvas = () => setShow_event_canvas(true);

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
                    console.log(this.state);
                }).catch(err => console.error(err));
        } else {

            this.setState({ value });
        }
    }

    // makeApiCall() {
    //     // console.log("Api Call");
    //     fetch("http://localhost:8000/api/events")
    //         .then(res => res.json())
    //         .then(result => {
    //             if (result.error)
    //                 this.setState({ isLoaded: true, error: result.error });
    //             else {
    //                 this.setState({ isLoaded: true, events: result });
    //             }
    //         }).catch(err => console.error(err));
    // }

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

    clareItemArray() {
        this.items = [];
        this.reRender("asdfasdf", false);
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
                    <DeleteEventPopup reRender={this.reRender} />
                    <DeleteAllEventsPopup reRender={this.reRender} />
                    <EventCanvas reRender={this.reRender} />

                    <Button onClick={this.clareItemArray.bind(this)}>Hello</Button>
                </div>


            </ThemeProvider>
        );
    }

}