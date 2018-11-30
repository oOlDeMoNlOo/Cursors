import {Component, Input, OnInit} from '@angular/core';
import {CursorsService} from '../cursors.service';

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss']
})
export class CursorComponent implements OnInit {

  @Input() cursor: any;
  @Input() message: string;

  constructor(public service: CursorsService) {
  }

  ngOnInit() {
  }

}
