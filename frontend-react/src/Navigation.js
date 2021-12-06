import { Navbar, Container, Nav } from "react-bootstrap";

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
      <Container>
        <Navbar.Brand href="/home">Simple Event Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Events</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            {/*<Nav.Link href="/settings">Settings</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/users">Users</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Navbar.Text>
            Live long and SchnitzleBratwurst - The Developers
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
