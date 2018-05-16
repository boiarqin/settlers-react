import * as React from 'react';
import { connect } from 'react-redux';
import './narrative.css';

import {ICatanState, IEvent} from '../../types';

interface INarrativeProps {
    eventList: IEvent[];
}

interface INarrativeState {
    eventsShown: number | string;
    verbosity: number;
}

const mapStateToProps = (state: ICatanState, ownProps: INarrativeProps) => ({
    eventList: state.eventList
});

class Narrative extends React.Component<INarrativeProps, INarrativeState> {
    constructor(props: INarrativeProps) {
        super(props);
        this.state = {
            eventsShown: 'all',
            verbosity: 3
        }
        this.changeEventsShown = this.changeEventsShown.bind(this);
        this.changeVerbosity = this.changeVerbosity.bind(this);
    }
    public render() {
        const events = this.props.eventList
        .filter(e => e[0] <= this.state.verbosity)
        .slice(this.state.eventsShown === 'all' ? 0 : -(this.state.eventsShown))
        .map((e, idx) => {
            return (
                <li key={idx} className={'narrative-event ' + (e[1] ? e[1] : '')}>
                {(e[1] ? e[1] + ' ' : '') + e[2] + ((e[0] + 1 <= this.state.verbosity) ? ' ' + e[3] : '')}
                </li>
            );
        });

        return (
            <div className="narrative">
                <div className="show-options">
                    <strong>Show:</strong>
                    <span
                        className={'narrative-option' + (this.state.eventsShown === 20 ? ' selected' : '')}
                        onClick={() => this.changeEventsShown(20)}>
                        20
                    </span> 
                    <span 
                        className={'narrative-option' + (this.state.eventsShown === 40 ? ' selected' : '')}
                        onClick={() => this.changeEventsShown(40)}>
                        40
                    </span> 
                    <span 
                        className={'narrative-option' + (this.state.eventsShown === 'all' ? ' selected' : '')}
                        onClick={() => this.changeEventsShown('all')}>
                        All
                    </span> 
                </div>
                <div className="verbosity-options">
                    <strong>Verbosity:</strong>
                    <span 
                        className={'narrative-option' + (this.state.verbosity === 1 ? ' selected' : '')}
                        onClick={() => this.changeVerbosity(1)}>
                        -v
                    </span> 
                    <span
                        className={'narrative-option' + (this.state.verbosity === 2 ? ' selected' : '')}
                        onClick={() => this.changeVerbosity(2)}>
                        -vv
                    </span> 
                    <span
                        className={'narrative-option' + (this.state.verbosity === 3 ? ' selected' : '')}
                        onClick={() => this.changeVerbosity(3)}>
                        -vvv
                    </span> 
                </div>
                <ol>{events}</ol>
            </div>
        );
    }
    private changeEventsShown(eventsShown: number | string) {
        this.setState({eventsShown});
    }
    private changeVerbosity(verbosity: number) {
        this.setState({verbosity});
    }
};

export default connect<INarrativeProps>(mapStateToProps)(Narrative);