import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-action-btn',
  templateUrl: './table-action-btn.component.html',
  styleUrls: ['./table-action-btn.component.scss'],
})
export class TableActionBtnComponent implements OnInit {
  @Input() actionTitle: string;
  @Input() actionIcon: string;
  @Input() actionLink: string | null = null;
  @Input() ActionBtnPosition: 'left' | 'center' | 'right' = 'center';
  @Output() actionClicked = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  onActionClick() {
    this.actionClicked.emit();
  }
}
