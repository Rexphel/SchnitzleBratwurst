import React from 'react';
import { Alert } from 'react-bootstrap';

class FetchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            count: -1
        }
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/eventcount")
            .then(res => res.json())
            .then(result => {
                if (result.error) {
                    this.setState({
                        isLoaded: true,
                        error: result.error
                    })
                } else
                this.setState({
                    isLoaded: true,
                    count: result.count
                });
            }).catch(err => console.error(err));
    }

    render() {
        const {error, isLoaded, count } = this.state;
        if (error) {
            return <Alert variant="danger" dismissible>Error: {error}</Alert>
        } else if (!isLoaded) {
            return <Alert variant="warning" dismissible>Loading...</Alert>;
        } else {
            return (
                <Alert variant="dark">Count: {count}</Alert>
            );
        }
    }

}

export default FetchComponent;