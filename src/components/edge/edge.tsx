import * as React from 'react';
import './edge.css';

import { Color, IVertex } from '../../types';

interface IEdgeProps {
    start: IVertex,
    end: IVertex,
    color: Color
}

function Edge(props: IEdgeProps) {
    return (
        <div className={"edge edge-" + props.start + "-" + props.end + " " + props.color}/>
    );
}

export default Edge;