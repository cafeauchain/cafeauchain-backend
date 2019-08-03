import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

/* eslint-disable */
import SizeInput from "wholesale/actions/sizeInput"
/* eslint-enable */

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: "100%"
});

class List extends Component {
    onDragEnd = result => {
        const { items, updateOrder } = this.props;

        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const sortedItems = reorder(
            items,
            result.source.index,
            result.destination.index
        );

        updateOrder(sortedItems);
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        const { items, onChange, onRemove } = this.props;
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <SizeInput 
                                                name={item.id} 
                                                label={"Size " + (index + 1) + " (in ounces)"}
                                                onChange={onChange}
                                                value={item.value}
                                                onRemove={onRemove}
                                                idx={index}
                                                disabled={items.length < 2}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

const { array, node, func } = PropTypes;
List.propTypes = {
    items: array,
    children: node,
    updateOrder: func,
    optionFields: array,
    onChange: func,
    onRemove: func
};

export default List;