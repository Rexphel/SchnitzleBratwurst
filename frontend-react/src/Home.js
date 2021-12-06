import { useState } from "react";
// eslint-disable-next-line
import { Button, Modal } from "react-bootstrap";

export default function Content() {

    const [show_new_event, setShow_new_event] = useState(false);
    const [show_delete_event, setShow_delete_event] = useState(false);

    const handleClose_new_event = () => setShow_new_event(false);
    const handleShow_new_event = () => setShow_new_event(true);


    return (
        <div className="mt-5">

            <Button variant="primary" onClick={handleShow}>
                Neues Event
            </Button>
            <Button variant="primary" onClick={handleShow}>
                Event löschen
            </Button>


            <Modal
                show={show_new_event}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Neues Event</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Abbrechen
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Speichern
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={show_delete_event}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Event löschen</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Ganz ganz ganz sicher löschen?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Doch nich!
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Jaaa!
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
