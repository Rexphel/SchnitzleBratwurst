import React from 'react';
import { Button, Card } from "react-bootstrap";


class EventCard extends React.Component {
    constructor(props){
        super(props)
        this.props = props;
    }   
    render(){ //event_title="" event_duration="" event_date="" event_description=""
        return (
            <Card border="primary" style={{ width: '20rem' }}>
                <Card.Header>{this.props.event_date} - Duration: {this.props.event_duration} </Card.Header>
                <Card.Body>
                    <Card.Title>{this.props.event_title}</Card.Title>
                    <Card.Text>
                        {this.props.event_description}
                    </Card.Text>
                    <Button variant="primary">Bearbeiten</Button>
                    <Button variant="danger">Löschen</Button>
                </Card.Body>
            </Card>
        )
    }
    
}
export default EventCard;