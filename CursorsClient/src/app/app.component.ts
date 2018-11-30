import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CursorsService} from './cursors.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  color: any;
  name: string;


  constructor(private http: HttpClient, public service: CursorsService) {
    if(localStorage['name'] && localStorage['color']) {
      this.name = localStorage['name'];
      this.color = localStorage['color'];
    } else {
      this.http.get(`https://randomuser.me/api/`).subscribe((value: any) => {
        this.name = value.results[0].login.username;
        this.color = '#' + this.decimalToHex(Math.abs(new Date(value.results[0].dob.date).getTime() % 16777215), 6);
        console.log(this.decimalToHex(value.results[0].location.postcode, 6));
      });
    }
  }

  ngOnInit(): void {
  }


  private decimalToHex(d, padding) {
    let hex = Number(d).toString(16);
    padding = typeof (padding) === undefined || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = '0' + hex;
    }

    return hex;
  }

  start() {
    this.service.initNew(this.name, this.color);
  }

  mmove(event) {
    this.service.move(event.clientX, event.clientY);
  }

  tbInfo(index, val) {
    return val;
  }

  leave() {
    this.service.leaveCursor();
  }
}
