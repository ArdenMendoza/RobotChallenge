import { captureInput, captureInput2 } from './onCommandCapture'
import { Command, Direction, iBotStatus } from './models'
import { DirectionEnum, renderBot } from './renderer'

var botStatus: iBotStatus = {
    x: 3,
    y: 3,
    direction: 'NORTH'
}


export const isCommandValid = (command: Command, botStatus: iBotStatus): { isValid: boolean, newStatus?: iBotStatus } => {
    const { x, y, direction } = botStatus
    switch (command) {
        case 'LEFT':
        case 'RIGHT':
            return { isValid: true, newStatus: getBotStatus(command, botStatus) }
        case 'MOVE':
            if (direction === 'NORTH' && y > 1) return { isValid: true, newStatus: getBotStatus(command, botStatus) }
            if (direction === 'SOUTH' && y < 5) return { isValid: true, newStatus: getBotStatus(command, botStatus) }
            if (direction === 'WEST' && x > 1) return { isValid: true, newStatus: getBotStatus(command, botStatus) }
            if (direction === 'EAST' && x < 5) return { isValid: true, newStatus: getBotStatus(command, botStatus) }
            return { isValid: false }
        default:
            return { isValid: false }
    }
}

const getBotStatus = (command: Command, botStatus: iBotStatus): iBotStatus => {
    switch (command) {
        case 'LEFT':
        case 'RIGHT':
            return { ...botStatus, direction: DirectionEnum[botStatus.direction][command] as Direction }
        default:
            return botStatus
    }
}

var command = ''
captureInput((key: string) => {
    if (!['return', 'enter'].includes(key)) {
        command = command + key
    }
    if (key === 'return') {
        console.log('executing commands', command.toUpperCase())
        const { isValid, newStatus } = isCommandValid(command.toUpperCase() as any, botStatus)
        console.log({ isValid, newStatus })
        if (isValid && newStatus) {
            renderBot(newStatus)
            botStatus = newStatus
        }
        command = ''
    }


})
