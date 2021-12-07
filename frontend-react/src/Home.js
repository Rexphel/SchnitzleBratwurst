import { useState } from "react";
// eslint-disable-next-line
import { Button, Modal, Form, Card } from "react-bootstrap";
import { BsExclamationTriangle } from "react-icons/bs";
import { Row, Col, Container } from 'react-bootstrap';
import EventCard from './Card';
import { popup_new_event, popup_delete_event } from './Popups'
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

export default function Content() {

    const [show_new_event, setShow_new_event] = useState(false);
    const handleClose_new_event = () => setShow_new_event(false);
    const handleShow_new_event = () => setShow_new_event(true);

    const [show_delete_event, setShow_delete_event] = useState(false);
    const handleClose_delete_event = () => setShow_delete_event(false);
    const handleShow_delete_event = () => setShow_delete_event(true);

    const num = 5
    const items = []

    //Show x Event Cards
    for (var i=1;i<=num;i++) {
        items.push(<EventCard event_title={"Event Nr. " + i}  event_description="Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular.s Außerdem: BRABBELf kufbwakfbakfuhgbgkjbgnasginwekugsekgu be7hasklg jnbadpg8wepgoisjw nezwiu" event_duration="XX.YY" event_date="TT.MM.JJJJ"/> );        

    }
    return (
        
        <div className="mt-3">
            {/*-----BUTTONS-----*/}
            <Button variant="primary" onClick={handleShow_new_event}>
                Neues Event
            </Button>
            &nbsp;&nbsp;
            <Button variant="primary" onClick={handleShow_delete_event}>
                Alle Events löschen
            </Button>



            {/*-----NEW EVENT POPUP-----*/}
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
                            <Form.Control as="textarea"  style={{ height: '100px' }}/>
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


            {/*-----DELETE EVENT POPUP-----*/}
            <Modal
                show={show_delete_event}
                onHide={handleClose_delete_event}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Event löschen</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h4> <BsExclamationTriangle />  &nbsp;  Ganz ganz wirklich ernsthaft sicher löschen? </h4>
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
        <hr />
            {/*!!!WORK HERE!!!*/} 
                <Row xs={1} sm={2} md={3} lg={3} xl={3} xxl={4}> {/*xs <576px, sm >=576px, md >=768px, lg >=992px, xl >=1200px, xxl >=1400 */}
                    {items}
                </Row>
           
        </div>
        
        
    
    );

}