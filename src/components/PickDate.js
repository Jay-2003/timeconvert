import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from '@fortawesome/free-solid-svg-icons';


const PickDate = ({ selectedDate, setSelectedDate }) => {
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
    <InputGroup>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MMMM d, yyyy"
        popperPlacement="bottom-start"
        className='form-control'
        placeholderText='Select a date'
      />
      <InputGroup.Text>
        <FontAwesomeIcon icon={faCalendar} />
      </InputGroup.Text>
      </InputGroup>
      </>
  );
};

export default PickDate;
