import React from 'react';
import { connect } from 'react-redux';
import './narrative.css';

const mapStateToProps = (state, ownProps) => ({
    eventList: state.eventList
});

function Narrative(props) {
    const events = props.eventList.map(e => {
        return (<li>{e}</li>);
    });
    return (
        <div className="narrative">
            <ul>{events}</ul>
        </div>
    );
};

export default connect(mapStateToProps)(Narrative);