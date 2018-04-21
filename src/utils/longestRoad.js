
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

function depthFirstSearch(initRoad, allRoads) {
    const start = initRoad.edge[0];
    const end = initRoad.edge[1];
    let adjacentRoads = [];

    initRoad.checked = true;

    // get adjacent roads that aren't part of any set
    const adjacentStartRoads = allRoads.filter(r => !r.checked && (r.edge[0] === start || r.edge[1] === start));
    adjacentRoads = adjacentRoads.concat(adjacentStartRoads);

    const adjacentEndRoads = allRoads.filter(r => !r.checked && (r.edge[0] === end || r.edge[1] === end));
    adjacentRoads = adjacentRoads.concat(adjacentEndRoads);

    //repeat check for each adjacentRoad
    if (adjacentRoads.length > 0){
        const result = adjacentRoads.reduce((accm, currRoad) => {
            const longestSubPath = depthFirstSearch(currRoad, allRoads);
            if (longestSubPath > accm) {
                accm = longestSubPath;
            }
            return accm;
        }, 0);
        return result + 1;
    } else {
        return 1;
    }
}

/* PREREQUISITE:
    -allRoads contains unique roads of all the same color 
    -allTowns contains unique towns

    NOTE: Calculates longest road (of >= 5 pieces) for 1 player.
    If player does not have a road of >= 5 pieces, returns 0.
    
    https://stackoverflow.com/a/3192726
*/
function getLongestRoadLength(playerRoads, allTowns){
    // first divide all roads into sets
    const roadsWithSets = divideIntoSets(playerRoads, allTowns);
    let longestRoadLength = 0;
    let currentSet = 0;
    let currentSetOfRoads = playerRoads.filter(r => r.set === currentSet);
    while(currentSetOfRoads.length > 0){
        if (currentSetOfRoads.length >= 5){
        // if this set has 5 or more pieces, calculate longest road
        // by depth first search over each piece
            //reset markers
            currentSetOfRoads.forEach(r => r.checked = false);
            const result = currentSetOfRoads.reduce((accm, currRoad) => {
                const longestSubPath = depthFirstSearch(currRoad, allRoads);
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

export {
    markRoadSet,
    divideIntoSets,
    depthFirstSearch,
    getLongestRoadLength
};