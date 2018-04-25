import * as React from 'react';
import './edge.css';

import { IVertex } from '../../types';

interface IEdgeProps {
    start: IVertex,
    end: IVertex
}

function Edge(props: IEdgeProps) {
    return (
        <div className={"edge edge-" + props.start + "-" + props.end}/>
    );
}

export default Edge;