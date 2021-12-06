import { useState } from "react";
// eslint-disable-next-line
import { Button, Modal, Form } from "react-bootstrap";
import { BsExclamationTriangle } from "react-icons/bs";

export default function Content() {

    const [show_new_event, setShow_new_event] = useState(false);
    const handleClose_new_event = () => setShow_new_event(false);
    const handleShow_new_event = () => setShow_new_event(true);

    const [show_delete_event, setShow_delete_event] = useState(false);
    const handleClose_delete_event = () => setShow_delete_event(false);
    const handleShow_delete_event = () => setShow_delete_event(true);

    return (
        <div className="mt-5">

            <Button variant="primary" onClick={handleShow_new_event}>
                Neues Event
            </Button>
            <Button variant="primary" onClick={handleShow_delete_event}>
                Event löschen
            </Button>


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
                            <Form.Control type="textarea"  style={{ height: '100px' }}/>
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
        </div>
    );
}
