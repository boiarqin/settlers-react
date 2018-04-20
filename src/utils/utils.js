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

function getConnectingRoad(initRoad, roads, allTowns){
    const start = initRoad.edge[0];
    const end = initRoad.edge[1];
    const color = initRoad.color;
    const connectingRoads = [];

    // is this road blocked by another town?
    const startBlocked = allTowns.filter(t => t.vertex === start && t.color !== color);
    const endBlocked = allTowns.filter(t => t.vertex === end && t.color !== color);

    if (!startBlocked) {
        roads.filter(r => r.edge[0] === start || r.edge[1] === end);
        connectingRoads.concat()
        return getConnectingRoad()
    }

    if (!endBlocked) {
        roads.filter(r => r.edge[0] === start || r.edge[1] === end);
        return getConnectingRoad();
    }

    return [];
}

export {calculateVP, countPlayedKnights};