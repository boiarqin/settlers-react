import * as React from 'react';
import './vertex.css';

// import houseSVG from '../../images/icons/house.svg';

import { Color, IVertex } from '../../types';

interface IVertexProps {
    index: IVertex,
    type: string,
    color: Color
}

function Vertex(props: IVertexProps) {
    const townIcon = <svg className="embed"><use xlinkHref="#houseIcon" x="0px" y="0px" width="15px" height="15px"/></svg>;
    const cityIcon = <svg className="embed"><use xlinkHref="#villageIcon" x="0px" y="0px" width="25px" height="25px"/></svg>;
    return (
        <div className={"vtx vtx-" + props.index + " " + props.type + " " + props.color}>
            {props.type === 'town' ? townIcon : cityIcon}
        </div>
    );
}

export default Vertex;