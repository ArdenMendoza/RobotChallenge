import { iBotStatus } from "./models"

export const renderBot = (botStatus: iBotStatus) => {
    console.log(' ')
    console.log('---------------------')
    botStatus.y === 1 ? renderRow(botStatus) : emptyRow()
    console.log('---------------------')
    botStatus.y === 2 ? renderRow(botStatus) : emptyRow()
    console.log('---------------------')
    botStatus.y === 3 ? renderRow(botStatus) : emptyRow()
    console.log('---------------------')
    botStatus.y === 4 ? renderRow(botStatus) : emptyRow()
    console.log('---------------------')
    botStatus.y === 5 ? renderRow(botStatus) : emptyRow()
    console.log('---------------------')
    console.log(' ')
}

const emptyRow = () => {
    console.log('|   |   |   |   |   |')
}

const renderRow = (botStatus: iBotStatus) => {
    const { y, direction } = botStatus
    const robot = DirectionIconEnum[direction]
    switch (y) {
        case 1:
            console.log(`| ${robot} |   |   |   |   |`)
            break
        case 2:
            console.log(`|   | ${robot} |   |   |   |`)
            break
        case 3:
            console.log(`|   |   | ${robot} |   |   |`)
            break
        case 4:
            console.log(`|   |   |   | ${robot} |   |`)
            break
        case 5:
            console.log(`|   |   |   |   | ${robot} |`)
            break
    }
}

const DirectionIconEnum = {
    NORTH: '^',
    SOUTH: 'v',
    EAST: '>',
    WEST: '<'
}

export const DirectionEnum = {
    NORTH: { LEFT: 'WEST', RIGHT: 'EAST' },
    WEST: { LEFT: 'SOUTH', RIGHT: 'NORTH' },
    SOUTH: { LEFT: 'EAST', RIGHT: 'WEST' },
    EAST: { LEFT: 'NORTH', RIGHT: 'SOUTH' },
}