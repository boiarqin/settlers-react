import * as React from 'react';
import './vertex.css';

import { Color, IVertex } from '../../types';

interface IVertexProps {
    index: IVertex,
    type: string,
    color: Color
}

function Vertex(props: IVertexProps) {
    return (
        <div className={"vtx vtx-" + props.index + " " + props.type + " " + props.color}/>
    );
}

export default Vertex;