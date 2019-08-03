import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

/* eslint-disable */
import stylevar from "stylesheets/variables.scss";
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
    padding: grid,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : stylevar.offwhite,

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: "100%"
});

const portal = document.createElement('div');
portal.classList.add('my-super-cool-portal');

if (!document.body) {
    throw new Error('body not ready for portal creation!');
}

document.body.appendChild(portal);

const PortalAwareItem = ({ provided, snapshot, component }) => {
    const usePortal = snapshot.isDragging;

    const child = (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
            )}
        >
            {component}
        </div>
    );

    if (!usePortal) {
        return child;
    }

    // if dragging - put the item in a portal
    return ReactDOM.createPortal(child, portal);
};

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
        const { items, component: Inner, passedProps } = this.props;
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
                                        <PortalAwareItem 
                                            provided={provided}
                                            snapshot={snapshot}
                                            component={(
                                                <Inner
                                                    {...passedProps}
                                                    index={index}
                                                    length={items.length}
                                                    item={item}
                                                />
                                            )}
                                        />
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

const { array, node, func, object } = PropTypes;
List.propTypes = {
    items: array,
    children: node,
    updateOrder: func,
    passedProps: object,
    component: func
};

export default List;