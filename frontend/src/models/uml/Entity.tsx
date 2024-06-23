export type Entity = {
    id?:string,
    name: string,
    type?:string
    graphics?: {x?: number, y?: number, width?: number, height?: number},
}