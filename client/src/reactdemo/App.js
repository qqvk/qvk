import React, { Component } from 'React';

function World(props) {
    return (
        <div className="greeting">Hello, {props.greet}</div>
    );
}
export default World;
