import { ModalContext } from '../Home';
import React from 'react';
import { Offcanvas } from "react-bootstrap";
import { darkTheme } from '../Styling/Theme';
import { _id, _title, _description, _date, _time, _duration} from './Card';

export default class EventCanvas extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            event: []
        }
       
        this.handleClose = this.handleClose.bind(this);
    }   

    handleClose() {
        ModalContext.eventCanvas = false;
        this.setState({});
    }

    
    render () {
       
        return (
            <Offcanvas show={ModalContext.eventCanvas} onHide={this.handleClose} style={{ backgroundColor: darkTheme.body }} >
                {console.log("CHAHCHA")}
                <Offcanvas.Header closeButton closeVariant='white'>
                    <Offcanvas.Title><h3>{_title}</h3></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body bg-color='dark'>
                    <Offcanvas.Title><h4> Am: {this.state.event.date}</h4><h5> für {this.state.event.duration}</h5> </Offcanvas.Title>
                    <hr />
                    {this.state.event.message}
                </Offcanvas.Body>
            </Offcanvas>
    )
    
        }
}
