import React, { useState } from "react";
import DarkMode from "./DarkMode";
import ShareableLink from "./ShareableLink";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import LogoLight from "../assets/time3.png";
import LogoDark from "../assets/time2.png";

const NavigationBar = () => {
  const [img, setImg] = useState(LogoLight);
  const setDarkMode = () => {
    setImg(LogoLight);
    document.querySelector("body").setAttribute("data-bs-theme", "dark");
    localStorage.setItem("theme", "dark");
  };

  const setLightMode = () => {
    setImg(LogoDark);
    document.querySelector("body").setAttribute("data-bs-theme", "light");
    localStorage.setItem("theme", "light");
  };

  return (
    <Navbar className="bg-body-tertiary" expand="lg">
      <Container>
        <div>
          <Navbar.Brand href="#">
            <img src={img} alt="Light Logo" height={70} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
        <div>
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Item className="mx-4">
                <ShareableLink />
              </Nav.Item>
              <Nav.Item className="mx-4">
                <DarkMode
                  setDarkMode={setDarkMode}
                  setLightMode={setLightMode}
                />
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
