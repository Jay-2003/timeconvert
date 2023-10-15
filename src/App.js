import NavigationBar from "./components/NavigationBar";
import TimeZone from "./components/TimeZone";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import styled from "styled-components";

function App() {
  return (
    <Main>
      <NavigationBar />
      <Container className="mt-4">
        <Router>
          <Routes>
            <Route path="/" element={<TimeZone />} />
          </Routes>
        </Router>
      </Container>
    </Main>
  );
}

export default App;

const Main = styled.div`
  text-align: center;
  min-height: 100vh;
`;
