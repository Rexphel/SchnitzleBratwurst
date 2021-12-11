import { ModalContext, CurrentID } from '../Home';
import React from 'react';
import { Offcanvas } from "react-bootstrap";
import { darkTheme } from '../Styling/Theme';
// import { _id, _title, _description, _date, _time, _duration } from './Card';

export function updateThis(text) {
    this.setState({text});
}

export default class EventCanvas extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            event: []
        }

        this.handleClose = this.handleClose.bind(this);
        updateThis = updateThis.bind(this);
    }

    handleClose() {
        ModalContext.eventCanvas = false;
        this.setState({});
    }

    fetchData() {
        fetch(`http://localhost:8000/api/events/${CurrentID.id}`)
        .then(res => res.json())
        .then(result => {
            this.setState({error: null});
            if (result.error)
                this.setState({ isLoaded: true, error: result.error });
            else
                this.setState({ isLoaded: true, event: result[0] });
        }).catch(err => { console.error(err); this.setState({ isLoaded: true, error: err }) });
    }

    componentDidMount() {
        this.fetchData();
        CurrentID.reFetch = this.fetchData.bind(this);
    }


    render() {
        if (!ModalContext.eventCanvas) {
            return <></>;
        }

        const { isLoaded, error, event } = this.state;

        if (error) {
            return (
                <Offcanvas show={true} onHide={this.handleClose} style={{ backgroundColor: darkTheme.body }}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Error</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body bg-color='dark'>
                        {error}
                    </Offcanvas.Body>
                </Offcanvas>
            );
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <Offcanvas show={ModalContext.eventCanvas} onHide={this.handleClose} style={{ backgroundColor: darkTheme.body }} >
                    {/* {console.log("CHAHCHA")} */}
                    <Offcanvas.Header closeButton closeVariant='white'>
                        <Offcanvas.Title><h3>{event.title}</h3></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body bg-color='dark'>
                        <Offcanvas.Title><h4> Am: {event.date}</h4><h5> für {event.duration}</h5> </Offcanvas.Title>
                        <hr />
                        {event.message}
                    </Offcanvas.Body>
                </Offcanvas>
            );
        }
    }
}
