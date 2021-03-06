import React from 'react';
import { Button, Card, Modal, Alert, Form } from "react-bootstrap";
import { event_description_on_card_length } from '../App';
import { ModalContext, CurrentID } from '../Home';
import { darkTheme } from '../Styling/Theme';
import { DeleteModal } from './DeleteModal';

const bgColor = darkTheme.body
const txtColor = darkTheme.text

export default class EventCard extends React.Component {


    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            isLoaded: false,
            error: null,
            event: [],
            id: this.props.id,
            showEdit: false,
            showError: false,
            title: this.props.event_title,
            message: this.props.event_description,
            date: this.props.event_date,
            time: this.props.event_time,
            duration: this.props.event_duration,
            showDelete: false
        };

        this.handleOpen = this.handleShowEventCanvas.bind(this);
        this.handleOpen2 = this.handleShowDeleteEvent.bind(this)
        this.editEventHandler = this.editEventHandler.bind(this);
        this.closeModalHandler = this.closeModalHandler.bind(this);
        this.deleteThisEvent = this.deleteThisEvent.bind(this);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleMessageeChange = this.handleMessageeChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.newDate = this.props.event_date;
        this.splitted = this.newDate.split(".");
        this.realDate = this.splitted[2] + "-" + this.splitted[1] + "-" + this.splitted[0];
    }

    handleShowDeleteEvent() {
        this.setState({ showDelete: true });
    }

    deleteThisEvent() {
        fetch(`http://localhost:8000/api/events/${this.props.id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(result => {
                if (result.error)
                    alert(result.error);
                else {
                    this.setState({ showDelete: false, id: this.props.id });

                    this.props.reRender(this.state, 'true');
                }
            }).catch(err => console.error(err));
    }

    handleShowEventCanvas() {
        //fetch(`http://localhost:8000/api/events/${_id}`)
        ModalContext.eventCanvas = true;
        CurrentID.id = this.state.id;
        this.props.reRender(this.state, 'true');
        // updateThis(Math.random() * 100);
        CurrentID.reFetch();
        // console.log(CurrentID);
    }

    editEventHandler() {
        this.setState({ showEdit: true });
    }

    closeModalHandler() {
        this.setState({ showEdit: false });
        this.props.reRender(this.state, 'true')
    }

    handleTitleChange(event) { this.setState({ title: event.target.value }); }
    handleMessageeChange(event) { this.setState({ message: event.target.value }); }
    handleDateChange(event) { this.setState({ date: event.target.value }); }
    handleTimeChange(event) { this.setState({ time: event.target.value }); }
    handleDurationChange(event) { this.setState({ duration: event.target.value }); }

    handleSubmit() {
        const title = this.state.title;
        const message = this.state.message;
        const date = this.state.date;
        const time = this.state.time;
        const duration = this.state.duration;

        const oldTitle = this.props.event_title;
        const oldMessage = this.props.event_description;
        const oldDate = this.props.event_date;
        const oldTime = this.props.event_time;
        const oldDuration = this.props.event_duration;
        // console.log(`Title: ${title} == ${oldTitle}: ${title == oldTitle}`);
        // console.log(`Message: ${message} == ${oldMessage}: ${message == oldMessage}`);
        // console.log(`Date: ${date} == ${oldDate}: ${date == oldDate}`);
        // console.log(`Time: ${time} == ${oldTime}: ${time == oldTime}`);
        // console.log(`Duration: ${duration} == ${oldDuration}: ${duration == oldDuration}`);
        if (title === oldTitle && message === oldMessage && date === oldDate && time === oldTime && duration === oldDuration) {
            this.setState({ showError: true });
            return;
        }
        this.setState({ showError: false });

        let dateTime;
        if (date.includes(".")) {
            dateTime = time + "-" + date;
        } else {
            let dateArray = date.split("-");
            let newDate = dateArray[2] + "." + dateArray[1] + "." + dateArray[0];
            dateTime = time + "-" + newDate;
        }

        let data = {
            title: title,
            message: message,
            date: dateTime,
            duration: duration
        };

        fetch(`http://localhost:8000/api/events/${this.props.id}`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.error)
                    this.setState({ isLoaded: true, error: result.error });
                else {
                    this.setState({ isLoaded: true, event: result })
                    this.closeModalHandler();
                }
            }).catch(err => console.error(err));
    }

    render() {

        this.title = [];
        this.description = [];

        if (this.props.event_title.length > 13) {
            this.title.push(this.props.event_title.substring(0, 13) + "...")
        } else {
            this.title.push(this.props.event_title)

        }

        if (this.props.event_description.length > event_description_on_card_length) {
            this.description.push(this.props.event_description.substring(0, event_description_on_card_length) + "...")
            this.description.push(<Button variant='link' size='sm' onClick={this.handleShowEventCanvas.bind(this)} >Weiterlesen</Button>)

        } else {
            this.description.push(this.props.event_description)
        }
        return (
            <>
                <Modal
                    show={this.state.showEdit}
                    onHide={this.closeModalHandler}
                    backdrop="static"
                    keyboard={false}

                >
                    <Modal.Header style={{ backgroundColor: bgColor }}>
                        <Modal.Title>Event bearbeiten: {this.state.id}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{ backgroundColor: bgColor }}>

                        <Alert variant="warning" show={this.state.showError} onClose={() => this.setState({ showError: false })} dismissible>Keine Werte ge??ndert!</Alert>

                        <Form>
                            <Form.Group className="mb-3" controlId="inputEventTitle" style={{ backgroundColor: bgColor }}>
                                <Form.Label>Titel</Form.Label>
                                <Form.Control type="text" style={{ backgroundColor: bgColor, color: txtColor }} placeholder="Mega wichtiges Event!" defaultValue={this.props.event_title} onChange={this.handleTitleChange} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="inputEventDescription">
                                <Form.Label>Beschreibung</Form.Label>
                                <Form.Control as="textarea" style={{ height: '100px', backgroundColor: bgColor, color: txtColor }} placeholder="Ganz wichtige Beschreibung f??r mega wichtiges Event!" defaultValue={this.props.event_description} onChange={this.handleMessageeChange} />
                            </Form.Group>


                            <Form className="mb-3 d-md-flex justify-content-between">
                                <Form.Group className="mb-3" controlId="inputEventDate">
                                    <Form.Label>Datum</Form.Label>
                                    <Form.Control type="date" style={{ width: '135px', backgroundColor: bgColor, color: txtColor }} required="true" defaultValue={this.realDate} onChange={this.handleDateChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="inputEventDate">
                                    <Form.Label>Zeit</Form.Label>
                                    <Form.Control type="time" style={{ width: '135px', backgroundColor: bgColor, color: txtColor }} required="true" defaultValue={this.props.event_time} onChange={this.handleTimeChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="inputEventDuration">
                                    <Form.Label>Dauer</Form.Label>
                                    <Form.Control type="time" defaultValue={this.props.event_duration} style={{ width: '135px', backgroundColor: bgColor, color: txtColor }} required="true" onChange={this.handleDurationChange} />
                                </Form.Group>

                            </Form>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer style={{ backgroundColor: bgColor }}>
                        <Button variant="secondary" onClick={this.closeModalHandler}>
                            Abbrechen
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Speichern
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div class=" m-1 ">
                    <Card border="primary" bg='dark' text='light' style={{ width: '16rem', height: '18rem' }}>
                        <Card.Header >
                            <Card.Title>{this.title}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title><h5>Am: {this.props.event_date}</h5> </Card.Title>
                            <Card.Text>
                                {this.description}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="primary" size='sm' onClick={this.editEventHandler.bind(this)}>Bearbeiten</Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" size='sm' onClick={this.handleShowDeleteEvent.bind(this)}>L??schen</Button>
                        </Card.Footer>
                    </Card>

                </div>
                <DeleteModal show={this.state.showDelete} id={this.props.id} hide={() => this.setState({ showDelete: false })} delete={this.deleteThisEvent} reRender={this.props.reRender} />
            </>

        )
    }

}