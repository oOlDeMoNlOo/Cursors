import {BrowserModule} from '@angular/platform-browser';
import {isDevMode, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CursorsService} from './cursors.service';
import {CursorComponent} from './cursor/cursor.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {KeysPipe} from './keys.pipe';

const config: SocketIoConfig = {
  url: 'http://185.228.234.111:3000', options: {
    upgrade: false,
    transports: ['websocket'],
  }
};

@NgModule({
  declarations: [
    AppComponent,
    CursorComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    ColorPickerModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [CursorsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
