function deepClone(obj){
    return JSON.parse(JSON.stringify(obj))
}

function markRoadSet(initRoad, playerRoads, allTowns){
    const start = initRoad.edge[0];
    const end = initRoad.edge[1];
    const color = initRoad.color;
    const currentSet = initRoad.set;
    const connectingRoads = [];

    // is this road blocked by another town?
    const startBlocked = typeof allTowns.find(t => t.vertex === start && t.color !== color) !== "undefined";
    const endBlocked = typeof allTowns.find(t => t.vertex === end && t.color !== color) !== "undefined";
    let adjacentRoads = [];

    if (!startBlocked) {
        // get adjacent roads that aren't part of any set
        const adjacentStartRoads = playerRoads.filter(r => r.set === null && (r.edge[0] === start || r.edge[1] === start));
        adjacentRoads = adjacentRoads.concat(adjacentStartRoads);
    }
    if (!endBlocked) {
        // get adjacent roads that aren't part of any set
        const adjacentEndRoads = playerRoads.filter(r => r.set === null && (r.edge[0] === end || r.edge[1] === end));
        adjacentRoads = adjacentRoads.concat(adjacentEndRoads);
    }

    //mark all adjacent start roads as part of currentSet
    adjacentRoads.forEach(r => r.set = currentSet);

    //repeat check for each adjacentRoad
    adjacentRoads.forEach(r => {
        playerRoads = markRoadSet(r, playerRoads, allTowns);
    });

    //return allRoads
    return playerRoads;
}

/* PREREQUISITE:
    -allRoads contains unique roads of all the same color 
    -allTowns contains unique towns
*/
function divideIntoSets(allRoads, allTowns){
    // deep copy allroads; add set property to each
    allRoads.forEach(r => r.set = null);
    // set counter
    let currentSet = 0;
    let currentRoad = null;
    // while there is a road that is not part of a set
    while(allRoads.filter(r => r.set === null).length > 0){
        // get first unmarked road
        currentRoad = allRoads.find(r=> r.set === null);
        currentRoad.set = currentSet;

        allRoads = markRoadSet(currentRoad, allRoads, allTowns);
        
        // increment currentSet
        currentSet = currentSet + 1;
    // end while
    }

    // all roads now belong to a set
    return allRoads;
}

const numUniqSets = ((roads) => {
    const uniqSets = roads.reduce((accm, curr)=> {
        if (!accm.includes(curr.set)){
            accm = accm.concat(curr.set);
        }
        return accm;
    }, []);

    return uniqSets.length;
});

//return true if this road piece is an endpoint
function isEndpoint(currRoad, playerRoads, allTowns) {
    const start = currRoad.edge[0];
    const end = currRoad.edge[1];
    const color = currRoad.color;
    let hasStartRoads = false;
    let hasEndRoads = false;

    const startBlocked = typeof allTowns.find(t => t.vertex === start && t.color !== color) !== "undefined";
    const endBlocked = typeof allTowns.find(t => t.vertex === end && t.color !== color) !== "undefined";

    if (!startBlocked) {
        // get adjacent roads that aren't part of any set (but not the same)
        const adjacentStartRoads = playerRoads.filter(r => (r.edge[0] === start || r.edge[1] === start) && (r !== currRoad));
        hasStartRoads = (adjacentStartRoads.length > 0);
    }
    if (!endBlocked) {
        // get adjacent roads that aren't part of any set (but not the same)
        const adjacentEndRoads = playerRoads.filter(r => (r.edge[0] === end || r.edge[1] === end) && (r !== currRoad));
        hasEndRoads = (adjacentEndRoads.length > 0);
    }

    // check if it has start/end connections, but not both
    // single piece is an endpoint
    return (!hasStartRoads && !hasEndRoads) || ((hasStartRoads || hasEndRoads) && !(hasStartRoads && hasEndRoads));
}

// return array of roads that are endpoints in this set
function getEndpoints(playerRoads, allTowns){
    return playerRoads.reduce((endpoints, currRoad) => {
        if (isEndpoint(currRoad, playerRoads, allTowns)){
            endpoints.push(currRoad);
        }
        return endpoints;
    }, []);
}

/* DEPTH FIRST SEARCH of longest path starting from allRoads[index] piece
/  allTowns is needed to determine if path is blocked
/  lastUsedVtx is needed to prevent path from "doubling back" on itself
*/
function depthFirstSearch(index, lastUsedVtx, allRoads, allTowns) {
    const newRoads = deepClone(allRoads);
    const initRoad = newRoads[index];

    const start = initRoad.edge[0];
    const end = initRoad.edge[1];
    const color = initRoad.color;
    let adjacentRoads = [];
    let adjacentEndRoads = [];
    let adjacentStartRoads = [];

    initRoad.checked = true;

    // is this road blocked by another town?
    const startBlocked = typeof allTowns.find(t => t.vertex === start && t.vertex !== lastUsedVtx && t.color !== color) !== "undefined";
    const endBlocked = typeof allTowns.find(t => t.vertex === end && t.vertex !== lastUsedVtx && t.color !== color) !== "undefined";

    if (!startBlocked) {
        // get adjacent roads that aren't part of any set
        adjacentStartRoads = newRoads.filter(r => !r.checked && (r.edge[0] !== lastUsedVtx && r.edge[1] !== lastUsedVtx) && (r.edge[0] === start || r.edge[1] === start));
        adjacentRoads = adjacentRoads.concat(adjacentStartRoads);
    } 
    if (!endBlocked) {
        adjacentEndRoads = newRoads.filter(r => !r.checked  && (r.edge[0] !== lastUsedVtx && r.edge[1] !== lastUsedVtx) && (r.edge[0] === end || r.edge[1] === end));
        adjacentRoads = adjacentRoads.concat(adjacentEndRoads);
    }

    //repeat check for each adjacentRoad
    let total = 1;
    if (adjacentRoads.length > 0){
        const startResult = adjacentRoads.reduce((accm, currRoad) => {
            const newIndex = newRoads.indexOf(currRoad);
            const newLastUsedVtx = (currRoad.edge[0] === start || currRoad.edge[1] === start) ? start : end;
            const longestSubPath = depthFirstSearch(newIndex, newLastUsedVtx, newRoads, allTowns);
            if (longestSubPath > accm) {
                accm = longestSubPath;
            }
            return accm;
        }, 0);
        total = total + startResult;
    }
    return total;
}

/* PREREQUISITE:
    -allRoads contains unique roads of all the same color 
    -allTowns contains unique towns

    NOTE: Calculates longest road (of >= 5 pieces) for 1 player.
    If player does not have a road of >= 5 pieces, returns 0.
    
    https://stackoverflow.com/a/3192726
*/
/*
function getLongestRoadLength(playerRoads, allTowns){
    // first divide all roads into sets
    const roadsWithSets = divideIntoSets(playerRoads, allTowns);
    let longestRoadLength = 0;
    let currentSet = 0;
    let currentSetOfRoads = roadsWithSets.filter(r => r.set === currentSet);
    while(currentSetOfRoads.length > 0){
        if (currentSetOfRoads.length >= 5){
        // if this set has 5 or more pieces, calculate longest road
        // see if there are any "endpoints"; else road is in loop
        // by depth first search over each piece
            let result = 0;    
            const endpoints = getEndpoints(currentSetOfRoads);
            

            if (endpoints.length > 0){

            } else {

            }
            
            const result = currentSetOfRoads.reduce((accm, currRoad, currIdx) => {
                //reset markers
                //console.log(currIdx)
                currentSetOfRoads.forEach(r => r.checked = false);
                const longestSubPath = depthFirstSearch(currIdx, currentSetOfRoads, allTowns);
                
                if (longestSubPath > accm) {
                    accm = longestSubPath;
                }
                return accm;
            }, 0);

            if (result > longestRoadLength){
                longestRoadLength = result;
            }
        }

        // increment current set
        currentSet = currentSet + 1;
        currentSetOfRoads = playerRoads.filter(r => r.set === currentSet);
    // end while
    }

    return longestRoadLength;
}
*/

export {
    markRoadSet,
    divideIntoSets,
    depthFirstSearch,
    isEndpoint,
    getEndpoints
};