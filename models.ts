export type Command = 'PLACE' | 'MOVE' | 'LEFT' | 'RIGHT' | 'REPORT'
export type Direction = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST'
export interface iBotStatus {
    x: number,
    y: number,
    direction: Direction
}
export interface iObstacle {
    x: number,
    y: number
}