import { EventsGateway } from "../events.gateway";
import { CursorInfoInterface } from "../../../../common-interfaces/CursorInfo.interface";
export declare class Cursor {
    socket: any;
    private events;
    info: CursorInfoInterface;
    constructor(socket: any, events: EventsGateway);
}
