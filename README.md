# settlers-react
Settlers of Catan built with React, Redux, and Typescript. Tested with Jest.

Currently plays a very basic game of Catan with 4 automated "bots"

## Game implementation
(as of 05/16/2018)
- case reducers implemented for building roads/towns/cities and making bank trades, and checking if the requested actions are valid
- event history in right-most panel, which allows spectator to toggle between different levels of detail
- longest road algorithm built out and unit tested

TODO:
- implement reducers and game loop for player trades
- check for longest road and game winner as part of build reducers
- implement mechanism for if bot repeatedly attempts to make invalid action
- build additional bots
- build dropdowns for selecting bots

## Bots implementation
All bots must implement the interface ICatanBot, which informs different situations in which the bot must make a decision.
- getBotName: provide a name that can be displayed on the scoreboard
- makeInitialMove1: provide a valid town and road location, used in the first round.
- makeInitialMove2: provide a valid town and road location, used in the second round. The location of the town will determine what resources the bot will start with
- makeTurn: provide an action that this bot would like to take during its turn (e.g. build, trade, or pass)
- acceptOrDeclineTrade (not implemented yet)
- moveThief (not implemented yet)
- discardResources (not implemented yet)

### Available bots:
- Basic Bot:
    - WILL make random (but valid moves)
        - if there are enough resources and valid spaces, will attempt to:
            1. upgrade city
            2. build town
            3. build road
        - if there are not enough resources to build with, will attempt to:
            1. make a bank trade for the most lacking resource
    - WILL NOT use dev cards or make/accept trades with other players
    - Notes: In a game between 4 basic bots, the bots will generally attempt to fill up the board with roads, before accumulating enough resources to upgrade cities and build towns.