import React from "react";
import styled from "styled-components";
import "../styles/SliderStyle.css";

const SliderComponent = ({ value, handleChange, min, max, step }) => {
  value = parseInt(value);

  return (
    <Container>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        onChange={(event) => handleChange(event.target.value)}
        step={step}
        className="slider"
        list="values"
      />
      <Subcontainer>
      <datalist id="values">
        <option value="12am" label="12am"></option>
        <option value="3am" label="3am"></option>
        <option value="6am" label="6am"></option>
        <option value="9am" label="9am"></option>
        <option value="12pm" label="12pm"></option>
        <option value="3pm" label="3pm"></option>
        <option value="6pm" label="6pm"></option>
        <option value="9pm" label="9pm"></option>
      </datalist>
      </Subcontainer>
    </Container>
  );
};

export default SliderComponent;

const Container = styled.div`
  display: grid;
  place-items: center;
  margin-left: 10px;
`;

const Subcontainer = styled.div`
  margin:0;
  width: 100%;
`;
