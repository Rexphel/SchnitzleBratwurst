import { ModalContext } from '../Home';
import React from 'react';
import { Button, Modal, Form, } from "react-bootstrap";
import { BsExclamationTriangle } from "react-icons/bs";
import { darkTheme } from '../Styling/Theme';

const bgColor = darkTheme.body
const txtColor = darkTheme.text

export class NewEventPopup extends React.Component {

    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        ModalContext.newEvent = false;
        this.setState({});

    }

    componentDidMount() {
        this.setState({});
    }

    render() {
        // console.log("render");
        return (
            <Modal
                show={ModalContext.newEvent}
                onHide={this.handleClose}
                backdrop="static"
                keyboard={false}>

                <Modal.Header style={{ backgroundColor: bgColor, color: txtColor}}>
                    <Modal.Title>Neues Event</Modal.Title>
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
                    <Button variant="secondary" onClick={this.handleClose}>
                        Abbrechen
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                        Speichern
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export class DeleteAllPopup extends React.Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }
    handleClose() {
        ModalContext.deleteAllEvents = false;
        this.setState({});
    }
    
    componentDidMount() {
        this.setState({});
    }


    render() {
        return (
            <Modal
            show={ModalContext.deleteAllEvents}
            onHide={this.handleClose}
            backdrop="static"
            keyboard={false}>
            <Modal.Header style={{ backgroundColor: bgColor }}>
                <Modal.Title>Alle Events löschen?</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: bgColor }}>
                <h4> <BsExclamationTriangle />  &nbsp;  Ganz ganz wirklich ernsthaft sicher wirklich ALLE Events löschen?
                    <br></br><br></br>
                    Rückgängig is nich! </h4>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: bgColor }}>
                <Button variant="success" onClick={this.handleClose}>
                    Ok ne
                </Button>
                <Button variant="danger" onClick={this.handleClose}>
                    *nuke it*
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}