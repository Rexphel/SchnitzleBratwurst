import React from 'react';
import { Button, Card, Offcanvas } from "react-bootstrap";
import { event_description_on_card_length } from '../App';
import { ThemeProvider } from '../../node_modules/styled-components/';
import { lightTheme, darkTheme } from '../Styling/Theme';
import { GlobalStyles } from '../Styling/Global';

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
                <ThemeProvider theme={darkTheme}>
                
                    <Card border="primary" bg='dark'  text='light' style={{ width: '16rem' }}>
                        <Card.Header>
                            <Card.Title>{this.props.event_title}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title><h5>Am: {this.props.event_date}</h5> </Card.Title>
                            <Card.Text>
                                {event_description}
                                    <Button variant='link' size='sm'>Weiterlesen</Button>
                                
                            
                            </Card.Text>

                            <Button variant="primary" size='sm'>Bearbeiten</Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" size='sm'>Löschen</Button>
                        </Card.Body>
                    </Card>
                </ThemeProvider>
            )
    }
    
}


export default EventCard;