import { useEffect, useState } from "react";
// eslint-disable-next-line
import { Button, Row, Col} from "react-bootstrap";

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
        <div>
            <Button variant="primary" disabled={isLoading} onClick={!isLoading ? handleClick : null}>
                {isLoading ? "Creating Event..." : "Create Event"}
            </Button>
        </div>
    );
}

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}