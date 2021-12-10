import { ModalContext } from '../Home';
import React from 'react';
import { Button, Modal, Form, } from "react-bootstrap";
import { BsExclamationTriangle } from "react-icons/bs";
import { darkTheme } from '../Styling/Theme';
import { Alert } from 'react-bootstrap';
// import { refreshMain } from '../Home';

const bgColor = darkTheme.body
const txtColor = darkTheme.text

export class NewEventPopup extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            title: null,
            message: null,
            date: null,
            time: null,
            duration: null,
            errorShow: false
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleMessageeChange = this.handleMessageeChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
    }

    /*
    Titel
    Beschreibung
    Datum
    Zeit
    Dauer
    */

    handleClose() {
        ModalContext.newEvent = false;
        this.setState({});

    }

    componentDidMount() {
        this.setState({});
    }

    handleSubmit(event) {
        const { title, message, date, time, duration } = this.state;

        if (title == null || message == null || date == null || time == null || duration == null) {
            this.setState({ errorShow: true });
            return;
        }

        let dateArray = date.split("-");
        let newDate = dateArray[2] + "." + dateArray[1] + "." + dateArray[0];
        let dateTime = time + "-" + newDate;

        let s = `${title}\n${message}\n${dateTime}\n${duration}`;

        let data = {
            title: title,
            message: message,
            date: dateTime,
            duration: duration
        }
        fetch("http://localhost:8000/api/events", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(res => res.text())
        .then(txt => console.log(txt))
        .catch(err => console.error(err));


        // refreshMain(Math.random());
        this.props.refresh(Math.random());
        this.handleClose();
    }

    handleTitleChange(event) { this.setState({ title: event.target.value }); }
    handleMessageeChange(event) { this.setState({ message: event.target.value }); }
    handleDateChange(event) { this.setState({ date: event.target.value }); }
    handleTimeChange(event) { this.setState({ time: event.target.value }); }
    handleDurationChange(event) { this.setState({ duration: event.target.value }); }

    render() {
        return (
            <Modal
                show={ModalContext.newEvent}
                onHide={this.handleClose}
                backdrop="static"
                keyboard={false}
                id="test123">

                <Form>
                    <Modal.Header style={{ backgroundColor: bgColor }}>
                        <Modal.Title>Neues Event</Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{ backgroundColor: bgColor }}>

                        <Alert variant="danger" show={this.state.errorShow} onClose={() => this.setState({errorShow: false})}dismissible>Bitte alle werte eingeben!</Alert>

                        <Form.Group className="mb-3" controlId="inputEventTitle" style={{ backgroundColor: bgColor }}>
                            <Form.Label>Titel</Form.Label>
                            <Form.Control type="text" style={{ backgroundColor: bgColor, color: txtColor }} placeholder="Mega wichtiges Event!" onChange={this.handleTitleChange} />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="inputEventDescription">
                            <Form.Label>Beschreibung</Form.Label>
                            <Form.Control as="textarea" style={{ height: '100px', backgroundColor: bgColor, color: txtColor }} placeholder="Ganz wichtige Beschreibung für mega wichtiges Event!" onChange={this.handleMessageeChange} />
                        </Form.Group>


                        <Form className="mb-3 d-md-flex justify-content-between">
                            <Form.Group className="mb-3" controlId="inputEventDate">
                                <Form.Label>Datum</Form.Label>
                                <Form.Control type="date" style={{ width: '135px', backgroundColor: bgColor, color: txtColor }} required="true" onChange={this.handleDateChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="inputEventDate">
                                <Form.Label>Zeit</Form.Label>
                                <Form.Control type="time" style={{ width: '135px', backgroundColor: bgColor, color: txtColor }} required="true" onChange={this.handleTimeChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="inputEventDuration">
                                <Form.Label>Dauer</Form.Label>
                                <Form.Control type="time" defaultValue="00:00" style={{ width: '135px', backgroundColor: bgColor, color: txtColor }} required="true" onChange={this.handleDurationChange} />
                            </Form.Group>

                        </Form>

                    </Modal.Body>

                    <Modal.Footer style={{ backgroundColor: bgColor }}>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Abbrechen
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Speichern
                        </Button>
                    </Modal.Footer>
                </Form>
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