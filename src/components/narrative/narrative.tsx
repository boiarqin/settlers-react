import * as React from 'react';
import { connect } from 'react-redux';
import './narrative.css';

import {ICatanState} from '../../types';

interface INarrativeProps {
    eventList: string[];
}

const mapStateToProps = (state: ICatanState, ownProps: INarrativeProps) => ({
    eventList: state.eventList
});

function Narrative(props: INarrativeProps) {
    const events = props.eventList.map((e, idx) => {
        return (<li key={idx}>{e}</li>);
    });
    return (
        <div className="narrative">
            <ul>{events}</ul>
        </div>
    );
};

export default connect<INarrativeProps>(mapStateToProps)(Narrative);