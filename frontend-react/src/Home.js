import React from 'react';
// eslint-disable-next-line
import { Button, Card} from "react-bootstrap";

import EventCard from './Contents/Card';
import LoadingCard from './Contents/LoadingCard';
import EventCanvas from './Contents/EventCanvas';

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Styling/Theme';
import { GlobalStyles } from './Styling/Global';
import { NewEventPopup, DeleteEventPopup, DeleteAllEventsPopup } from "./Contents/NewPopup";


export const ModalContext = {
    newEvent: false,
    editEvent: false,
    deleteEvent: false,
    deleteAllEvents: false,
    eventCanvas: false
};

var Theme = 'dark';

class Content extends React.Component {



    constructor(props) {
        super(props);

            this.state = {
                isLoaded: false,
                error: null,
                events: [],
                
            };
        
   
            this.reRender = this.reRender.bind(this)
    }
    
    reRender(value, shouldfetch = new Boolean('false') , fetch_type) { //value always "this.state", shouldfetch: Bool -> reFetch?, fetch_type: fetchType
        if (shouldfetch === 'true') {
            fetch("http://localhost:8000/api/events")
            .then(res => res.json())
            .then(result => {
                if (result.error)
                    this.setState({isLoaded: true, error: result.error});
                else {
                    this.setState({isLoaded: true, events: result});
                    this.setState({value});
                }
            }).catch(err => console.error(err)); 
    } else {
        
        this.setState({value});
    }
}   

    componentDidMount() {
        console.log("Hello, sdfasdg yo");
        fetch("http://localhost:8000/api/events")
            .then(res => res.json())
            .then(result => {
                if (result.error)
                    this.setState({isLoaded: true, error: result.error});
                else {
                    this.setState({isLoaded: true, events: result});
                }
            }).catch(err => console.error(err));
    }

    handleShowNewEvent() {
        ModalContext.newEvent = true;
        this.reRender(this.state);
    }

    toggleTheme(){
        if (Theme === 'dark'){
            Theme = 'light';
        }  
        else{
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
      
       //Show x Event Cards
    this.items = []
        if (this.state.isLoaded) {
            if (!this.state.error) {
                for (const event of this.state.events) {
                    const datetime = event.date.split('-');
                    this.items.push(<EventCard reRender={this.reRender} id={event._id} event_title={event.title} event_description={event.message} event_date={datetime[1]} event_time={datetime[0]} event_duration={event.duration} />);
                }
            }
        }  else {
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

                    <NewEventPopup />
                    <DeleteEventPopup />
                    <DeleteAllEventsPopup />
                    <EventCanvas />
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
                    
                </div>
                

            </ThemeProvider>
        );
    }

}

export default Content;