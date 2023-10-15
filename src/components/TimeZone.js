import React, { useEffect, useRef, useState } from "react";
import SingleTimeZone from "./SingleTimeZone";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { allTimezones } from "./data";
import PickTimeZone from "./PickTimeZone";
import { useLocation, useNavigate } from "react-router-dom";
import PickDate from "./PickDate";
import { Container, Row } from "react-bootstrap";
import ReverseOrder from "./ReverseOrder";
import styled from "styled-components";

let isFirstLoad = true;

const TimeZone = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  let [difference, setDifference] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const location = useLocation();


  // Set selected timezones into querystring
  const [query, setQuery] = useState("");
  const queryRef = useRef(query);
  queryRef.current = query;

  // Get selected timezones from querystring
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newSelected = [];

    for (let param of params) {
      const [id, tz] = param;
      let queryData = allTimezones.find((f) => f.tz === tz);
      if (queryData) {
        newSelected.push(queryData);
      }
    }
    if (newSelected.length === 0 && isFirstLoad === true) {
      isFirstLoad = false;
      newSelected.push(allTimezones[0]);
    }
    setSelected(newSelected);
  }, [query]);

  // Update querystring when selected timezones change
  useEffect(() => {
    const params = new URLSearchParams();
    selected.forEach((item, index) => {
      params.append("tz" + index, item.tz);
    });
    setQuery(params.toString());
    navigate(`/?${params.toString()}`);
  }, [selected]);
  const handleOnDragEnd = (result) => {
    console.log(result)
    const { source, destination, type } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (type === "group") {
      const reorderedSelected = [...selected];
      const sourceIdx = source.index;
      const destinationIdx = destination.index;
      // const [removed] = reorderedSelected.splice(sourceIdx, 1);
      // reorderedSelected.splice(destinationIdx, 0, removed);
      console.log(reorderedSelected)
      let tmp = reorderedSelected[destinationIdx];
      reorderedSelected[destinationIdx] = reorderedSelected[sourceIdx];
      reorderedSelected[sourceIdx] = tmp;
      //reorderedSelected.splice(destinationIdx, 0, removed);

      return setSelected(reorderedSelected);
    }
  };

  const handleDelete = (index) => {
    const newSelected = [...selected];
    newSelected.splice(index, 1);
    setSelected(newSelected);
  };

  return (
    <Container>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <HeaderRow>
          <LeftSide>
            <HeaderCol>
              <PickTimeZone
                selectedTimezones={selected}
                setSelectedTimezones={setSelected}
              />
            </HeaderCol>
          </LeftSide>
          <RightSide>
            <HeaderCol>
              <PickDate
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </HeaderCol>
            <HeaderCol>
              <ReverseOrder
                selectedTimezones={selected}
                setSelectedTimezones={setSelected}
              />
            </HeaderCol>
          </RightSide>
        </HeaderRow>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {selected.map((item, index) => (
                <Draggable draggableId={item.id} key={item.id} index={index}>
                  {(provided) => (
                    <Row
                      style={{ width: "18rem" }}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="mt-4"
                    >
                      <SingleTimeZone
                        difference={difference}
                        setDifference={setDifference}
                        name={item.name}
                        fullName={item.fullName}
                        tz={item.tz}
                        onDelete={() => handleDelete(index)}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                      />
                    </Row>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default TimeZone;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin: 0;
`;
const HeaderCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin: 0;
`;

const LeftSide = styled.div`
  display: flex;
  width: 50%;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 24%;
`;
