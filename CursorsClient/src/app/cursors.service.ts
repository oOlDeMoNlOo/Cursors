import {Injectable, OnDestroy} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Cursor} from './cursor';
import {interval, Subscription} from "rxjs";

@Injectable()
export class CursorsService implements OnDestroy {
  started: boolean;
  countClicks = 0;
  cursors: {};
  rating: {};
  messages: { message: string, color: string, name: string }[];
  currentMessages: any;
  color: string;
  name: string;
  serverOnline: boolean;
  subsInterval: Subscription;

  constructor(private socket: Socket) {

    if (localStorage['name'] && localStorage['color']) {
      this.initNew(localStorage['name'], localStorage['color'])
    }
    this.messages = [];
    this.currentMessages = {};
    this.socket.on('connect', (socket) => {
      console.log('connected')
      this.serverOnline = true;
    });
    this.socket.on('init', (val) => {
      console.log(val);
      this.cursors = {};
      val.forEach(val => {
        this.cursors[val.name] = val;
      })
    });
    this.socket.on('change-cursors', (val) => {
      this.cursors = {};
      val.forEach(val => {
        this.cursors[val.name] = val;
      })
    });

    this.socket.on('cursor-move', (val: Cursor) => {
      this.cursors[val.name] = val;
    });


    this.socket.on('message', (val: any) => {
      this.currentMessages[val.name] = {};
      this.currentMessages[val.name] = {message: val, timer: 3};
      this.messages.unshift(val);
      if (this.messages.length > 50) {
        this.messages.splice(50)
      }
      console.log(`new message from ${val.name}: ${val.message}`);
    });


    this.socket.on('click', (val: number, rating: any) => {
      this.countClicks = val;
      console.log(rating);
      this.rating = this.sort(rating);
    });


    this.socket.on('disconnect', () => {
      console.log('disconnect');
      this.started = false;
      this.serverOnline = false;
    });


    this.subsInterval = interval(1000,).subscribe(() => {
      Object.keys(this.currentMessages).forEach((cursorName) => {
        if (this.currentMessages[cursorName].timer) {
          this.currentMessages[cursorName].timer--;
        } else {
          delete this.currentMessages[cursorName];
        }
      })
    });
  }

  initNew(name: string, color: string) {
    if (this.serverOnline) {
      this.name = name;
      this.color = color;
      this.socket.emit('init', {name, color, cursor: '', x: 10, y: 10}, (messages) => this.messages = messages);
      localStorage['name'] = this.name;
      localStorage['color'] = this.color;
      this.started = true;
    }
  }

  move(clientX: number, clientY: number) {
    this.socket.emit('cursor-move', {name: this.name, color: this.color, cursor: '', x: clientX, y: clientY});
  }

  sendMessage(message: string) {
    if (message && message.replace(/\s/g, ''))
      this.socket.emit('message', {message, name: this.name, color: this.color});
  }

  click() {
    this.socket.emit('click');
  }

  sort(rating: any) {
    console.log(rating);
    return Object.keys(rating).map(value => {
      return ({name: value, count: rating[value]} as { name: string, count: number });
    }).sort((a, b) => (b.count - a.count));
  }

  leave() {
    this.socket.emit('cursor-move', {name: this.name, color: this.color, cursor: '', x: 10, y: 10, leave: true});
  }

  ngOnDestroy(): void {
    if (this.subsInterval) {
      this.subsInterval.unsubscribe();
    }
  }

  leaveCursor() {
    this.started = false;
    delete localStorage['name'];
    delete localStorage['color']
    this.socket.emit('cursor-leave');
  }
}
