import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent implements OnInit {
  fullname?: string;
  total?: number;

  constructor(private location: Location) { }

  ngOnInit(): void {
    const state = this.location.getState() as { fullname: string, total: number } | undefined;
    if (!state) return;
    this.fullname = state.fullname;
    this.total = state.total;
  }

}
