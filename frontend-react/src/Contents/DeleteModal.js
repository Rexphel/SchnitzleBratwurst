import React from "react";
import { Modal, Button } from 'react-bootstrap';
import { BsExclamationTriangle } from "react-icons/bs";
import { darkTheme } from "../Styling/Theme";


const bgColor = darkTheme.body;
// const txtColor = darkTheme.text;

export class DeleteModal extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleDeleteClick() {
        this.props.delete();
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.hide}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header style={{ backgroundColor: bgColor }}>
                    <Modal.Title>Event löschen? {this.props.id}</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ backgroundColor: bgColor }}>
                    <h4> <BsExclamationTriangle />  &nbsp;  Ganz ganz wirklich ernsthaft sicher löschen? </h4>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: bgColor }}>
                    <Button variant="success" onClick={this.props.hide}>
                        Doch nich!
                    </Button>
                    <Button variant="danger" onClick={this.handleDeleteClick}>
                        Jaaa!
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

}