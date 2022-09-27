import { Direction, iBotStatus } from './models'
import { captureInput } from './onCommandCapture'
import { DirectionEnum, renderBot } from './renderer'

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

        console.log('Move is: ', isValid ? 'VALID' : '!! INVALID !!')
        botStatus = renderBot(isValid && newStatus ? newStatus : botStatus)
        command = ''
    }


})
