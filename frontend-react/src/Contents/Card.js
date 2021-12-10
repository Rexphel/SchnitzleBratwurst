import React from 'react';
import { Button, Card} from "react-bootstrap";
import { event_description_on_card_length } from '../App';
import EventCanvas from './EventCanvas';
import { ModalContext, reRender } from '../Home';
var text = ''
var _id = ''
export default class EventCard extends React.Component {

    constructor(props) {
        super(props)
        this.props = props;
        this.state = {id: this.props.id};
        this.handleOpen = this.handleShowEventCanvas.bind(this);
    }

    
    handleShowEventCanvas() {
    
        ModalContext.eventCanvas = true;
        console.log(`${ModalContext.eventCanvas.valueOf()}`)
        this.props.reRender(this.state)
        
    }

    deleteThisEvent() {
        fetch(`http://localhost:8000/api/events/${this.state.id}`, {method: "DELETE"})
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    render() { //event_title="" event_duration="" event_date="" event_description=""

   
        _id = this.props.id;
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

            <div class=" m-1 ">
                <Card border="primary" bg='dark' text='light' style={{ width: '16rem', height: '18rem'}}>
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
                        <Button variant="primary" size='sm'>Bearbeiten</Button>
                        &nbsp;&nbsp;
                        <Button variant="danger" size='sm' onClick={this.deleteThisEvent.bind(this)}>Löschen</Button>
                    </Card.Footer>
                </Card>
            </div>

        )
    }

}
export { _id as _id };