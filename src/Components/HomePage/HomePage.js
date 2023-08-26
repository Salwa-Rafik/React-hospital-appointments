// src/components/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../../Assets/images/background.jpg";
import NavBar from "../../SharedUI/Navbar/Navbar";
import { Container, Row, Col } from "reactstrap";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <NavBar />
      <Container>
        <Row>
          <Col
            sm={3}
            md={6}
            className="content d-flex align-items-center justify-content-center"
          >
            <div className="text-center mt-5">
              <h2>Welcome to Hospital Appointments</h2>
              <Link to="/appointment/create">
                <button className="btn btn-dark">New Appointment (+)</button>
              </Link>
            </div>
          </Col>

          <Col
            
            md={6}
            className="background-image"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          ></Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
