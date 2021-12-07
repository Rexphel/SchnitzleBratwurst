import React from 'react';
import { Button, Card, Offcanvas } from "react-bootstrap";
import { event_description_on_card_length } from '../App';

class EventCard extends React.Component {

 
    
    constructor(props){
        super(props)
        this.props = props;
    }   

        render(){ //event_title="" event_duration="" event_date="" event_description=""
            var event_description;
            var long_event_description;
            var id = this.props.id;
            if (this.props.event_description.length > event_description_on_card_length) {
                event_description = this.props.event_description.substring(0,event_description_on_card_length) + "..."
                long_event_description=true;
            } else {
                event_description = this.props.event_description
            }
            return (
                <Card border="primary" style={{ width: '16rem' }}>
                    <Card.Header>{this.props.event_date} - Duration: {this.props.event_duration} </Card.Header>
                    <Card.Body>
                        <Card.Title>{this.props.event_title}</Card.Title>
                        <Card.Text>
                            {event_description}
                            long_event_description 
                                <Button variant="link" size="sm">Weiterlesen</Button>
                            
                        
                        </Card.Text>

                        <Button variant="primary">Bearbeiten</Button>
                        <Button variant="danger">Löschen</Button>
                    </Card.Body>
                </Card>
            )
    }
    
}


export default EventCard;