"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cursor {
    constructor(socket, events) {
        this.socket = socket;
        this.events = events;
        this.socket.emit('change-cursors', this.events.getCursorsInfo());
        this.socket.on('init', (cursorInfo, fn) => {
            this.info = cursorInfo;
            this.events.newInit();
            fn(this.events.messages);
        });
        this.socket.on('cursor-move', (cursorInfo) => {
            if (cursorInfo) {
                this.info = cursorInfo;
                this.events.cursorMove(cursorInfo);
            }
        });
        this.socket.on('message', (message) => {
            this.events.sendMessage(message);
        });
        this.socket.on('cursor-leave', () => {
            this.events.deleteCursor(this.socket.id);
        });
    }
}
exports.Cursor = Cursor;
//# sourceMappingURL=Cursor.js.map