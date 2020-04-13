import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FlashCardComponent implements OnInit {
  public flipped : boolean = false;

  @Input() public frontContent : string;
  @Input() public backContent : string;
  
  constructor() { }

  ngOnInit() {}

  public flip() {
    this.flipped = !this.flipped;
  }

}


