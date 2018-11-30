"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const websockets_1 = require("@nestjs/websockets");
const Cursor_1 = require("./Cursor/Cursor");
let EventsGateway = class EventsGateway {
    handleConnection(client, ...args) {
        console.log(client.id, 'connected');
        this.cursors.push(new Cursor_1.Cursor(client, this));
    }
    handleDisconnect(client) {
        this.deleteCursor(client.id);
        console.log(client.id, 'disconnected');
    }
    afterInit(server) {
        this.cursors = [];
        this.messages = [];
    }
    deleteCursor(id) {
        const idCursor = this.cursors.findIndex(value => value.socket.id === id);
        if (idCursor !== -1) {
            delete this.cursors[idCursor].info;
            this.server.emit('change-cursors', this.getCursorsInfo());
        }
    }
    cursorMove(info) {
        this.server.emit('cursor-move', info);
    }
    newInit() {
        this.server.emit('change-cursors', this.getCursorsInfo());
    }
    getCursorsInfo() {
        return this.cursors.map(val => val.info).filter(val => val);
    }
    sendMessage(message) {
        this.server.emit('message', message);
        this.messages.unshift(message);
        if (this.messages.length > 50) {
            this.messages.splice(50);
        }
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], EventsGateway.prototype, "server", void 0);
EventsGateway = __decorate([
    websockets_1.WebSocketGateway()
], EventsGateway);
exports.EventsGateway = EventsGateway;
//# sourceMappingURL=events.gateway.js.map