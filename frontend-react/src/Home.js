import { useEffect, useState } from "react";
// eslint-disable-next-line
import { Button } from "react-bootstrap";
import MyComponent from './TestComponent';

export default function Content() {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
        <div className="mt-5">
            <Button variant="primary" disabled={isLoading} onClick={!isLoading ? handleClick : null}>
                {isLoading ? "Creating Event..." : "Create Event"}
            </Button>   
            <Button variant="primary" disabled={isLoading} onClick={!isLoading ? handleClick : null}>
                {isLoading ? "Deleting Event..." : "Delete Event"}
            </Button>
            <MyComponent />
        </div>
    );
}

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}