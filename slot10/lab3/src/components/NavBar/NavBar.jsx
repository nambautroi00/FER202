import React from "react";
import { 
  Navbar, 
  Nav, 
  Form, 
  FormControl, 
  Button, 
  Container,
  NavDropdown 
} from "react-bootstrap";
import "./NavBar.css";

class MyNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }

  handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${this.state.searchTerm}`);
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { onNavigate } = this.props;
    const { searchTerm } = this.state;

    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container fluid>
          <Navbar.Brand href="#" onClick={() => onNavigate('home')}>
            <i className="bi bi-film me-2"></i>
            Movie Management
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0">
              <Nav.Link onClick={() => onNavigate('home')}>
                <i className="bi bi-house-door-fill me-1"></i>
                Home
              </Nav.Link>
              <Nav.Link onClick={() => onNavigate('movies')}>
                <i className="bi bi-collection-play-fill me-1"></i>
                Movies
              </Nav.Link>
              <Nav.Link onClick={() => onNavigate('about')}>
                <i className="bi bi-info-circle-fill me-1"></i>
                About
              </Nav.Link>
              <Nav.Link onClick={() => onNavigate('contact')}>
                <i className="bi bi-envelope-fill me-1"></i>
                Contact
              </Nav.Link>
            </Nav>
            
            <Form className="d-flex me-3" onSubmit={this.handleSearch}>
              <FormControl
                type="search"
                placeholder="Quick search"
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={this.handleSearchChange}
              />
              <Button variant="outline-success" type="submit">
                <i className="bi bi-search"></i>
              </Button>
            </Form>
            
            <Nav>
              <NavDropdown 
                title={
                  <span>
                    <i className="bi bi-person-circle me-1"></i>
                    Accounts
                  </span>
                } 
                id="account-dropdown"
              >
                <NavDropdown.Item onClick={() => onNavigate('account')}>
                  <i className="bi bi-person-badge me-2"></i>
                  Manage Your Profiles
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => onNavigate('account')}>
                  <i className="bi bi-person-gear me-2"></i>
                  Build your Account
                </NavDropdown.Item>
                <NavDropdown.Item href="#password">
                  <i className="bi bi-key-fill me-2"></i>
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
              
              <Nav.Link href="#login">
                <i className="bi bi-box-arrow-in-right me-1"></i>
                Login
              </Nav.Link>
              
              <Nav.Link onClick={() => onNavigate('favourites')}>
                <i className="bi bi-heart-fill me-1"></i>
                Favourites
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default MyNavBar;

