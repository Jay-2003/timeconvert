import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ReverseOrder = ({ selectedTimezones, setSelectedTimezones }) => {
  const handleReverseClick = () => {
    const reversedTimezones = [...selectedTimezones].reverse();
    setSelectedTimezones(reversedTimezones);
  };

  return (
    <Button
      variant="outline-primary"
      size='sm'
      onClick={handleReverseClick}
      style={{ padding: '7px 10px'  }}
    >
      <FontAwesomeIcon icon={faArrowUp} />
      <FontAwesomeIcon icon={faArrowDown} />
    </Button>
  );
};

export default ReverseOrder;

