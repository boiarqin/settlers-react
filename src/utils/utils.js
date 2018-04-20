
function calculateVP(score) {
    return score.towns.length
        + 2*score.cities.length
        + (score.hasLargestArmy ? 2 : 0)
        + (score.hasLongestRoad ? 2 : 0)
        + (score.cards.reduce((cardVPSum, card) => {
            return cardVPSum + card.VP;
            }, 0));
}

function countPlayedKnights(cards){
    return cards.reduce((numPlayedKnights, card) => {
        return numPlayedKnights + (card.isKnight && card.wasPlayed ? 1 : 0);
    }, 0); 
}

function longestRoadLength(color, playerRoads, allTowns){
    const roadGroups = [];
    roadGroups.push(playerRoads[0]);
    //check if road is broken by town of different color
    //get next road piece that intersects with road[0]

    //check if road is broken by town of different color
    //get next road piece that intersects with road[1]

    
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


export {calculateVP, countPlayedKnights, markRoadSet, divideIntoSets};