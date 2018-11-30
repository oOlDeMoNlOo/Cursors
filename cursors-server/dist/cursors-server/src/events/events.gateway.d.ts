import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Cursor } from "./Cursor/Cursor";
import { CursorInfoInterface } from "../../../common-interfaces/CursorInfo.interface";
export declare class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    server: any;
    cursors: Cursor[];
    messages: any[];
    handleConnection(client: any, ...args: any[]): any;
    handleDisconnect(client: any): any;
    afterInit(server: any): any;
    deleteCursor(id: any): void;
    cursorMove(info: CursorInfoInterface): void;
    newInit(): void;
    getCursorsInfo(): CursorInfoInterface[];
    sendMessage(message: any): void;
}
