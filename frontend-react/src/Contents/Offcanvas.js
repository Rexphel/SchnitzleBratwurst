
import { useState } from "react";
import React from 'react';
import { Button, Offcanvas } from "react-bootstrap";


function EventCanvas(event_title, event_description, showState) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);    
    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                
                <Button variant="danger">Löschen</Button>
            </Offcanvas.Body>
        </Offcanvas>
    )
    
    
}

export default EventCanvas;