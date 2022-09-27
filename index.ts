import { Direction, iBotStatus, iObstacle } from './models'
import { captureInput } from './onCommandCapture'
import { DirectionEnum, renderBot } from './renderer'

var botStatus: iBotStatus = {
    x: 3,
    y: 3,
    direction: 'NORTH'
}

var obstacles: iObstacle[] = [{ x: 2, y: 2 }]

export const validateAndExecute = (command: string, botStatus: iBotStatus): { isValid: boolean, newStatus?: iBotStatus } => {
    const { x, y, direction } = botStatus
    switch (command) {
        case 'LEFT':
        case 'RIGHT':
            return { isValid: true, newStatus: { ...botStatus, direction: DirectionEnum[botStatus.direction][command] as Direction } }
        case 'MOVE':
            let nextPosition = { x: botStatus.x, y: botStatus.y }
            if (direction === 'NORTH' && y > 1) nextPosition = { x: botStatus.x, y: y - 1 }
            if (direction === 'SOUTH' && y < 5) nextPosition = { x: botStatus.x, y: y + 1 }
            if (direction === 'WEST' && x > 1) nextPosition = { x: x - 1, y: botStatus.y }
            if (direction === 'EAST' && x < 5) nextPosition = { x: x + 1, y: botStatus.y }

            return {
                isValid: ['NORTH', 'WEST', 'SOUTH', 'EAST'].includes(direction) &&
                    !obstacles.some(s => s.x === nextPosition.x && s.y === nextPosition.y),
                newStatus: { ...botStatus, ...nextPosition }
            }
        case 'REPORT':
            return { isValid: true, newStatus: botStatus }
        default:
            if (command.includes('PLACE')) {
                const c1 = command.indexOf(' ')
                const c2 = command.indexOf(',')
                const x = parseInt(command.substring(c1 + 1, c2))
                const y = parseInt(command.substring(c2 + 1, command.length))
                if (!isNaN(x) && !isNaN(y)) {
                    console.log('hooray!')
                    return {
                        isValid: true, newStatus: { ...botStatus, x, y }
                    }
                }
            }
            return { isValid: false }
    }
}


var command = ''
captureInput((char: string) => {
    if (!['\r', '\n'].includes(char)) {
        command = command + char
    }

    if (char === '\r') {
        const _command = command.toUpperCase()
        command = command.replace('SPACE', ' ')
        const { isValid, newStatus } = validateAndExecute(_command, botStatus)
        console.log('')
        console.log(`Command(${_command}) is: `, isValid ? 'VALID' : '!! INVALID !!')
        botStatus = renderBot(isValid && newStatus ? newStatus : botStatus)
        command = ''
    }


})
