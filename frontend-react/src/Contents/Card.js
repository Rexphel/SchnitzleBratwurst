import React from 'react';
import { Button, Card } from "react-bootstrap";
import { event_description_on_card_length } from '../App';
class EventCard extends React.Component {

    constructor(props) {
        super(props)
        this.props = props;
        this.state = {id: this.props.id};
    }

    deleteThisEvent() {
        fetch(`http://localhost:8000/api/events/${this.state.id}`, {method: "DELETE"})
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    render() { //event_title="" event_duration="" event_date="" event_description=""

        var event_description;
        if (this.props.event_description.length > event_description_on_card_length) {
            event_description = this.props.event_description.substring(0, event_description_on_card_length) + "..."
        } else {
            event_description = this.props.event_description
        }
        return (

            <div class=" m-1 ">
                <Card border="primary" bg='dark' text='light' style={{ width: '16rem' }}>
                    <Card.Header >
                        <Card.Title>{this.props.event_title}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title><h5>Am: {this.props.event_date}</h5> </Card.Title>
                        <Card.Text>
                            {event_description}
                            <Button variant='link' size='sm'>Weiterlesen</Button>

                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" size='sm'>Bearbeiten</Button>
                        &nbsp;&nbsp;
                        <Button variant="danger" size='sm' onClick={this.deleteThisEvent.bind(this)}>Löschen</Button>
                    </Card.Footer>
                </Card>
            </div>

        )
    }

    // render() { //event_title="" event_duration="" event_date="" event_description=""

    //     var event_description;
    //     var long_event_description;
    //     var id = this.props.id;
    //     if (this.props.event_description.length > event_description_on_card_length) {
    //         event_description = this.props.event_description.substring(0, event_description_on_card_length) + "..."
    //         long_event_description = true;
    //     } else {
    //         event_description = this.props.event_description
    //     }
    //     return (
    //         <ThemeProvider theme={darkTheme}>

    //             <Card border="primary" bg='dark' text='light' style={{ width: '16rem' }}>
    //                 <Card.Header>
    //                     <Card.Title>{this.props.event_title}</Card.Title>
    //                 </Card.Header>
    //                 <Card.Body>
    //                     <Card.Title><h5>Am: {this.props.event_date}</h5> </Card.Title>
    //                     <Card.Text>
    //                         {event_description}
    //                         <Button variant='link' size='sm'>Weiterlesen</Button>


    //                     </Card.Text>

    //                     <Button variant="primary" size='sm'>Bearbeiten</Button>
    //                     &nbsp;&nbsp;
    //                     <Button variant="danger" size='sm'>Löschen</Button>
    //                 </Card.Body>
    //             </Card>
    //         </ThemeProvider>
    //     )
    // }

}


export default EventCard;