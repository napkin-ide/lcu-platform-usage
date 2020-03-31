import { Component, OnInit, Input } from '@angular/core';
import { BoxInfoModel } from '../../models/box-info.model';

@Component({
  selector: 'lcu-total-box',
  templateUrl: './total-box.component.html',
  styleUrls: ['./total-box.component.scss']
})
export class TotalBoxComponent implements OnInit {

  @Input('box-totals') BoxTotals: Array<BoxInfoModel>;

  constructor() { }

  ngOnInit(): void {
  }

}
