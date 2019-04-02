import { Component, OnInit } from '@angular/core';
import { SmsService } from 'src/app/services/sms.service';

@Component({
  selector: 'app-sms-list',
  templateUrl: './sms-list.component.html',
  styleUrls: ['./sms-list.component.scss']
})
export class SmsListComponent implements OnInit {

  sortedColName = 'city';
  sortedType: 'asc' | 'desc' = 'asc';
  currentPage = 95;

  constructor(
    public smsService: SmsService
  ) { }

  ngOnInit() {
    this.smsService.getSmsList(this.currentPage, this.sortedType, this.sortedColName);
  }

  onSort(colName) {
    console.log(colName);
    if (colName === this.sortedColName) {
      this.sortedType = this.sortedType === 'asc' ? 'desc' : 'asc';
    }
    this.sortedColName = colName;
    this.smsService.getSmsList(this.currentPage, this.sortedType, this.sortedColName);
  }

  goToPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > this.smsService.maxPageNumber) {
      return;
    }

    this.smsService.getSmsList(pageNumber, this.sortedType, this.sortedColName)
      .then(_ => {
        this.currentPage = pageNumber;
      })
  }
}