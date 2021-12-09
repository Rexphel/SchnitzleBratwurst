import React from 'react';
import { Card, Placeholder } from "react-bootstrap";

class LoadingCard extends React.Component {

    render() {
        return(

            <div class=" m-1 ">
   <Card border="primary" bg='dark' text='light' style={{ width: '16rem' }} >
        <Card.Header>
            <Placeholder animation="wave">
                <Placeholder as={Card.Title} xs={10} />
            </Placeholder>
        </Card.Header>
        
        <Card.Body>
            <Placeholder as={Card.Title} animation="wave">
                <Placeholder xs={8} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="wave">
                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                <Placeholder xs={6} /> <Placeholder xs={8} />
                <Placeholder xs={10} />
            </Placeholder>

        </Card.Body>
        <Card.Footer>
            <Placeholder.Button variant="primary" animation='wave' size='lg' xs={5} />
                &nbsp;
            <Placeholder.Button variant="danger" animation='wave'size='lg' sm={4} />
        </Card.Footer>
    </Card>
    </div>
        )
    }
}

export default LoadingCard;