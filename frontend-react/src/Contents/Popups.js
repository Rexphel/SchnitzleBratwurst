import React from 'react';
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { BsExclamationTriangle } from "react-icons/bs";
import Content from '../Home';



function Popup_new_event() {

    const handleClick_new_event = () => {
        setShow_new_event(!show_new_event)
    }

    const [show_new_event, setShow_new_event] = useState(false);
    
    const handleClose_new_event = () => setShow_new_event(false);
    const handleShow_new_event = () => setShow_new_event(true);

    return (
        <>
            <Content handleClick_new_event={handleClick_new_event} />
            <Modal
                show={show_new_event}
                onHide={handleClose_new_event}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Neues Event</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="inputEventTitle">
                            <Form.Label>Titel</Form.Label>
                            <Form.Control type="text" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="inputEventDescription">
                            <Form.Label>Beschreibung</Form.Label>
                            <Form.Control as="textarea" style={{ height: '100px' }} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose_new_event}>
                        Abbrechen
                    </Button>
                    <Button variant="primary" onClick={handleClose_new_event}>
                        Speichern
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


function Popup_delete_event() {
        
    const [show_delete_event, setShow_delete_event] = useState(false);
    const handleClose_delete_event = () => setShow_delete_event(false);
    const handleShow_delete_event = () => setShow_delete_event(true);

        return (
            <Modal
                show={show_delete_event}
                onHide={handleClose_delete_event}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Event l??schen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4> <BsExclamationTriangle />  &nbsp;  Ganz ganz wirklich ernsthaft sicher l??schen? </h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose_delete_event}>
                        Doch nich!
                    </Button>
                    <Button variant="danger" onClick={handleClose_delete_event}>
                        Jaaa!
                    </Button>
                </Modal.Footer>
            </Modal>
    );
}

export default {Popup_new_event, Popup_delete_event};