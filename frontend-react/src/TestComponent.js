import Button from '@restart/ui/esm/Button';
import React from 'react';

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
        
    }

    test() {
        console.log("Hello, World");
    }

    render() {
        return (<div>
            <Button onClick={this.test}>Click Me</Button>
        </div>);
    }
}

export default MyComponent;