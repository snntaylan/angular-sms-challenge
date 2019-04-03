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
  currentPage = 1;
  startDate: Date;
  endDate: Date;

  constructor(
    public smsService: SmsService
  ) { }

  ngOnInit() {
    this.loadTable();
  }

  onSort(colName) {
    console.log(colName);
    if (colName === this.sortedColName) {
      this.sortedType = this.sortedType === 'asc' ? 'desc' : 'asc';
    }
    this.sortedColName = colName;
    this.loadTable();
  }

  onStartDateChange(event) {
    this.startDate = new Date(event.value);
    console.log('startDate:', this.startDate);
  }

  onEndDateChange(event) {
    this.endDate = new Date(event.value);
    console.log('endDate:', this.endDate);

  }

  filterDate() {
    if (!this.startDate || !this.endDate) {
      return;
    }

    if (this.endDate < this.startDate) {
      return;
    }

    this.currentPage = 1;
    this.loadTable();
  }


  goToPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > this.smsService.maxPageNumber) {
      return;
    }
    this.smsService.getSmsList(pageNumber, this.sortedType, this.sortedColName, this.startDate, this.endDate)
      .then(_ => {
        this.currentPage = pageNumber;
      });
  }

  loadTable(pageNumber?: number) {
    if (!!pageNumber) {
      pageNumber = 1;
    }
    this.smsService.getSmsList(this.currentPage, this.sortedType, this.sortedColName, this.startDate, this.endDate);
  }
}