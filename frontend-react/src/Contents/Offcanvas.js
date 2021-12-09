
import { useState } from "react";
import React from 'react';
import { Button, Offcanvas } from "react-bootstrap";
import { darkTheme } from '../Styling/Theme';

class EventCanvas extends React.Component {

    constructor(props) {
        super(props)
        this.props = props;
    }   

    render () {
        return (
            <Offcanvas show={show_event_canvas} onHide={handleClose_event_canvas} style={{ backgroundColor: darkTheme.body }} >
                <Offcanvas.Header closeButton closeVariant='white'>
                    <Offcanvas.Title><h3>{this.props.event_title}</h3></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body bg-color='dark'>
                    <Offcanvas.Title><h4> Am: {this.props.event_date}</h4><h5> für {this.props.event_duration}</h5> </Offcanvas.Title>
                    <hr />
                    {this.props.event_description}
                </Offcanvas.Body>
            </Offcanvas>
    )
    
        }
}

export default EventCanvas;