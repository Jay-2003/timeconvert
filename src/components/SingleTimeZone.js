import React, { useEffect, useState } from "react";
import SliderComponent from "./SliderComponent";
import moment from "moment-timezone";
import CloseButton from "react-bootstrap/CloseButton";

import styled from "styled-components";
import { Card } from "react-bootstrap";

const SingleTimeZone = ({
  tz,
  name,
  fullName,
  onDelete,
  difference,
  setDifference,
  selectedDate,
  setSelectedDate,
}) => {
  //set current time to selected timezone
  let [currentTime, setCurrentTime] = useState(moment().tz(tz));

  useEffect(() => {
    if (selectedDate) {
      setCurrentTime(moment(selectedDate).tz(tz));
    }
  }, [selectedDate, tz]);

  //console.log("SingleTimeZone: currentTime: ", currentTime)
  let totalMinutes = currentTime.hours() * 60 + currentTime.minutes();
  let [curSliderValue, setCurSliderValue] = useState(totalMinutes);
  let [prevSliderValue, setPrevSliderValue] = useState(-1);

  // To apply the difference to the current time
  const getCurValue = () => {
    if (totalMinutes + difference < 0) return totalMinutes + difference + 1440;
    else return (totalMinutes + difference) % 1440;
  };

  // useEffect hook if curSliderValue modification
  useEffect(() => {
    setPrevSliderValue(curSliderValue);
    setCurSliderValue(getCurValue());
  }, [difference]);

  useEffect(() => {
    const interval = setInterval(() => {
      getHoursMinutes(curSliderValue);
    }, 1000); // Update time every second

    return () => clearInterval(interval);
  }, [tz]);

  const getHoursMinutes = (value) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    if (hours === 0) {
      return `${12}:${minutes.toString().padStart(2, "0")} AM`;
    }
    if (hours < 12) {
      return `${hours}:${minutes.toString().padStart(2, "0")} AM`;
    }
    if (hours === 12) {
      return `${hours}:${minutes.toString().padStart(2, "0")} PM`;
    }
    if (hours > 12) {
      return `${hours - 12}:${minutes.toString().padStart(2, "0")} PM`;
    }
    //return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleChange = (value) => {
    const newSliderValue = parseInt(value);
    setDifference(newSliderValue - totalMinutes);
    setCurSliderValue(newSliderValue);
    // 8:00am to 6:00pm in minutes
    // 8 * 60 = 480
    // 18 * 60 = 1080

    if(value >= 480 && value<= 1080){
      document.querySelector("body").setAttribute("data-bs-theme", "light");
      localStorage.setItem("theme", "light");
    }else{
      document.querySelector("body").setAttribute("data-bs-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const getAdjustedDate = () => {
    console.log("getAdjustedDate: ", getCurValue(), prevSliderValue);
    if (
      getCurValue() >= 1425 &&
      getCurValue() < 1440 &&
      prevSliderValue >= 0 &&
      prevSliderValue < 15
    ) {
      currentTime.subtract(1, "day");
    } else if (
      getCurValue() >= 0 &&
      getCurValue() < 15 &&
      prevSliderValue >= 1425 &&
      prevSliderValue < 1440
    ) {
      currentTime.add(1, "day");
    }
    return currentTime.format("dddd, MMMM Do");
  };

  return (
    <div>
      <Card>
        <Card.Header>
          {name} | {tz}
        </Card.Header>
        <RightSide>
          <CloseButton onClick={onDelete} />
        </RightSide>
        <Card.Body>
          <Card.Title>{fullName}</Card.Title>
          <Card.Text>
            {getAdjustedDate()}
            <br />
            {getHoursMinutes(getCurValue())}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          {/* <p>Current: { curSliderValue }</p>
      <p>Prev: { prevSliderValue }</p> */}
          <SliderComponent
            handleChange={handleChange}
            min={0}
            max={1439}
            value={curSliderValue}
            step={15}
          />
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SingleTimeZone;

const RightSide = styled.div`
  justify-content: right;
  align-items: right;
  display: flex;
  padding: 0;
  position: absolute;
  top: 8px;
  right: 5px;
`;
