import * as React from 'react';
import './vertex.css';

import {IVertex} from '../../types';

interface IVertexProps {
    index: IVertex,
    type: string
}

function Vertex(props: IVertexProps) {
    return (
        <div className={"vtx vtx-" + props.index + " " + props.type}/>
    );
}

export default Vertex;