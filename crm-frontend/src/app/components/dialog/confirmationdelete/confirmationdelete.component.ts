import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmationdelete',
  templateUrl: './confirmationdelete.component.html',
  styleUrls: ['./confirmationdelete.component.css']
})
export class ConfirmationdeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
