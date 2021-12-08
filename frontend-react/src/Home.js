import { useState } from "react";
import React from 'react';
// eslint-disable-next-line
import { Button, Modal, Form, Offcanvas } from "react-bootstrap";
import { BsExclamationTriangle } from "react-icons/bs";
import { Row, Col, Container } from 'react-bootstrap';
import EventCard from './Contents/Card';
//import { popup_new_event, popup_delete_event } from './Contents/Popups'
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
//import EventCanvas from './Contents/Offcanvas';
//import { DateTime } from 'react-datetime-bootstrap';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Styling/Theme';
import { GlobalStyles } from './Styling/Global';
import { NewEventPopup, DeleteAllPopup } from "./Contents/NewPopup";

export const ModalContext = {
    newEvent: false,
    editEvent: false,
    deleteEvent: false,
    deleteAllEvents: false,
    eventCanvas: false
};

const num = 6
const API = "localhost:8000/api/events"
const bgColor = darkTheme.body
const txtColor = darkTheme.text
var event_title = "Mega wichtiges Event";
var event_description = "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular.s Außerdem: BRABBELf kufbwakfbakfuhgbgkjbgnasginwekugsekgu be7hasklg jnbadpg8wepgoisjw nezwiuiuherg o gg glwejgöosuhas.lsakngiuesröbl-aiskngöioeli-fjwsgoiäeLAFJKn weg8923o0wrq9ij43n29oö rihf384woerisjf knmwpeasdk,mxc we8 9ü   23o9öwiedkhjk";
var event_duration = "SS:MM";
var event_date = "TT.MM.JJJJ";

class Content extends React.Component {

    constructor(props) {
        super(props);

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
    }

    handleShowNewEvent() {
        ModalContext.newEvent = true;
        this.setState({});
    }

   

    handleShowDeleteAllEvents() {
        ModalContext.deleteAllEvents = true;
        this.setState({});
    }

    render() {
      
       //Show x Event Cards
        this.items = [];
        for (var i = 1; i <= num; i++) {
            this.items.push(<EventCard event_title={event_title} event_description={event_description} event_duration={event_duration} event_date={event_date} />);

        }
        return (
            //Show x Event Cards

            <ThemeProvider theme={darkTheme}>
                <GlobalStyles />
                <div className="mt-3">

                    {/*-----BUTTONS-----*/}
                    <Button variant="primary" onClick={this.handleShowNewEvent.bind(this)}>
                        Neues Event
                    </Button>
                    &nbsp;&nbsp;
                    <Button variant="primary" onClick={this.handleShowDeleteAllEvents.bind(this)}>
                        Alle Events löschen
                    </Button>
                    {/* &nbsp;&nbsp;
            <Button variant="secondary" onClick={handleShow_event_canvas}>
                Testknopp
            </Button>
            &nbsp;&nbsp;
            <Button variant="secondary" onClick={handleShow_delete_event}>
                Testknopp2
            </Button>
            &nbsp;&nbsp;
            <Button variant="secondary" onClick={handleShow_edit_event}>
                Testknopp3
            </Button>           */}
         


        <hr />
            {/*!!!WORK HERE!!!*/} 
            {/*   class="m-auto d-flex justify-content-between"*/}

                    <div class="d-flex justify-content-center flex-wrap" >
                        {this.items}   
                    </div> 

                    <NewEventPopup/>

                    <>
                    {/*-----EDIT EVENT POPUP-----*/}
                    {/* <Modal
                        show={show_edit_event}
                        onHide={handleClose_edit_event}
                        backdrop="static"
                        keyboard={false}

                    >
                        <Modal.Header style={{ backgroundColor: bgColor }}>
                            <Modal.Title>Event bearbeiten</Modal.Title>
                        </Modal.Header>

                        <Modal.Body style={{ backgroundColor: bgColor }}>
                            <Form>
                                <Form.Group className="mb-3" controlId="inputEventTitle" style={{ backgroundColor: bgColor }}>
                                    <Form.Label>Titel</Form.Label>
                                    <Form.Control type="text" style={{ backgroundColor: bgColor, color: txtColor }} placeholder="Mega wichtiges Event!" />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="inputEventDescription">
                                    <Form.Label>Beschreibung</Form.Label>
                                    <Form.Control as="textarea" style={{ height: '100px', backgroundColor: bgColor, color: txtColor }} placeholder="Ganz wichtige Beschreibung für mega wichtiges Event!" />
                                </Form.Group>


                                <Form className="mb-3 d-md-flex justify-content-between">
                                    <Form.Group className="mb-3" controlId="inputEventDate">
                                        <Form.Label>Datum</Form.Label>
                                        <Form.Control type="date" style={{ width: '135px', backgroundColor: bgColor, color: txtColor }} required="true" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="inputEventDate">
                                        <Form.Label>Zeit</Form.Label>
                                        <Form.Control type="time" style={{ width: '135px', backgroundColor: bgColor, color: txtColor }} required="true" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="inputEventDuration">
                                        <Form.Label>Dauer</Form.Label>
                                        <Form.Control type="time" defaultValue="00:00" style={{ width: '135px', backgroundColor: bgColor, color: txtColor }} required="true" />
                                    </Form.Group>

                                </Form>

                            </Form>
                        </Modal.Body>

                        <Modal.Footer style={{ backgroundColor: bgColor }}>
                            <Button variant="secondary" onClick={handleClose_edit_event}>
                                Abbrechen
                            </Button>
                            <Button variant="primary" onClick={handleClose_edit_event}>
                                Speichern
                            </Button>
                        </Modal.Footer>
                    </Modal> */}


                    {/*-----DELETE EVENT POPUP-----*/}
                    {/* <Modal
                        show={show_delete_event}
                        onHide={handleClose_delete_event}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header style={{ backgroundColor: bgColor }}>
                            <Modal.Title>Event löschen?</Modal.Title>
                        </Modal.Header>

                        <Modal.Body style={{ backgroundColor: bgColor }}>
                            <h4> <BsExclamationTriangle />  &nbsp;  Ganz ganz wirklich ernsthaft sicher löschen? </h4>
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: bgColor }}>
                            <Button variant="success" onClick={handleClose_delete_event}>
                                Doch nich!
                            </Button>
                            <Button variant="danger" onClick={handleClose_delete_event}>
                                Jaaa!
                            </Button>
                        </Modal.Footer>
                    </Modal> */}

                    {/*-----DELETE ALL EVENTS POPUP-----*/}

                    <DeleteAllPopup />

{/* 
                    <Offcanvas show={show_event_canvas} onHide={handleClose_event_canvas} style={{ backgroundColor: bgColor }} >
                        <Offcanvas.Header closeButton closeVariant='white'>
                            <Offcanvas.Title><h3>{event_title}</h3></Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body bg-color='dark'>
                            <Offcanvas.Title><h4> Am: {event_date}</h4><h5> für {event_duration}</h5> </Offcanvas.Title>
                            <hr />
                            {event_description}
                        </Offcanvas.Body>
                    </Offcanvas> */}
                    </>
                </div>
            </ThemeProvider>
        );
    }

}

function fetchCardInfo() {

    //-> Fetch Event Count
    //-> Fetch all Event Information
    //-> Show Cards with Event Info

}

function fetchCanvasInfo() {

    //-> Fetch Event
    //-> Show Canvas with Event Information

}

function EditEvent() {

    //-> Fetch Event
    //-> Show Edit Modal with current Event Information
    //-> Let user Edit Modal
    //-> Save updated Event

}

export default Content;