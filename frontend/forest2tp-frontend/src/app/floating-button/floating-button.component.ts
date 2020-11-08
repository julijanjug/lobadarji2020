import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent implements OnInit {

  @Input() disabled: boolean;
  @Output() cllickEventEmited = new EventEmitter ()

  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick() {
    this.cllickEventEmited.emit();
  }

}
