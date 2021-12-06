import React, { Component } from "react";
import { Button, Modal, } from "react-bootstrap";



//export default class PopUp extends Component {
 
export default function show_popup() {
    return (
        <>
        <Modal
            //show={show}
            //onHide={handleClose}
            backdrop="static"
            keyboard={false}
        > 
            <Modal.Header closeButton>
            <Modal.Title>Neues Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>

        </Modal>   
        </>
    );

}
