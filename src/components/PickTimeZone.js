import React, { useState, useEffect, useRef } from 'react';
import { allTimezones } from './data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, Form, ListGroup } from 'react-bootstrap';

const PickTimeZone = ({ selectedTimezones, setSelectedTimezones }) => {
  const [suggestion, setSuggestion] = useState([]);
  const [showList, setShowList] = useState(false);
  const [val,setVal]=useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowList(false);
      }
    }

    // event listener to detect clicks outside the ListGroup
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOnChange = (value) => {
    let res = [];
    if (value !== '') {
      res = allTimezones.filter(
        (f) =>
          f.name.toLowerCase().includes(value) ||
          f.fullName.toLowerCase().includes(value) ||
          f.country.toLowerCase().includes(value)
      );
    }
    res = res.slice(0, 5);
    setSuggestion(res);
    setShowList(true); // Show the ListGroup when typing
    
  };

  const handleItemClick = (e) => {
    let item = e.target.innerHTML;
    item = item.split(', ');
    let res = allTimezones.filter((f) => f.tz === item[1]);

    // check if item already exists in selectedTimezones
    let isExist = selectedTimezones.find((f) => f.tz === res[0].tz);
    if (isExist) return;

    setSelectedTimezones([...selectedTimezones, res[0]]);
    setSuggestion([]);
    setShowList(false); // Hide the ListGroup when an item is clicked
    
  };

  return (
    <div>
      <InputGroup ref={inputRef}>
        <InputGroup.Text id="search-timezone">
          <FontAwesomeIcon icon={faGlobe} />
        </InputGroup.Text>
        <Form.Control
          placeholder="Add TimeZone, Country"
          aria-label="Search for a timezone"
          aria-describedby="search-timezone"
          onChange={(e) => handleOnChange(e.target.value.toLowerCase())}
          style={{ width: '400px' }}
        />
        {showList && (
          <ListGroup className="position-absolute w-100" style={{ top: '0', zIndex: '1', marginTop: '2.4rem', borderRadius:"5px" }}>
          {suggestion.map((item, index) => (
            <ListGroup.Item key={index} action onClick={handleItemClick}>
              {item.name}, {item.tz}, {item.country}
            </ListGroup.Item>
          ))}
        </ListGroup>
        )}
      </InputGroup>
    </div>
  );
};

export default PickTimeZone;
