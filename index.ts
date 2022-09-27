import { captureInput, captureInput2 } from './onCommandCapture'
import { Command, Direction, iBotStatus } from './models'
import { DirectionEnum, renderBot } from './renderer'
import { TypePredicateKind } from 'typescript'

var botStatus: iBotStatus = {
    x: 3,
    y: 3,
    direction: 'NORTH'
}


export const validateAndExecute = (command: string, botStatus: iBotStatus): { isValid: boolean, newStatus?: iBotStatus } => {
    const { x, y, direction } = botStatus
    switch (command) {
        case 'LEFT':
        case 'RIGHT':
            return { isValid: true, newStatus: { ...botStatus, direction: DirectionEnum[botStatus.direction][command] as Direction } }
        case 'MOVE':
            if (direction === 'NORTH' && y > 1) return { isValid: true, newStatus: { ...botStatus, y: y - 1 } }
            if (direction === 'SOUTH' && y < 5) return { isValid: true, newStatus: { ...botStatus, y: y + 1 } }
            if (direction === 'WEST' && x > 1) return { isValid: true, newStatus: { ...botStatus, x: x - 1 } }
            if (direction === 'EAST' && x < 5) return { isValid: true, newStatus: { ...botStatus, x: x + 1 } }
            return { isValid: false }
        case 'REPORT':
            return { isValid: true, newStatus: botStatus }
        default:
            return { isValid: false }
    }
}

var command = ''
captureInput((key: string) => {
    if (!['return', 'enter'].includes(key)) {
        command = command + key
    }

    if (key === 'return') {
        const _command = command.toUpperCase()
        const { isValid, newStatus } = validateAndExecute(_command, botStatus)

        if (isValid && newStatus) {
            botStatus = renderBot(newStatus)
        } else {
            console.log('That move is invalid')
        }
        command = ''
    }


})
