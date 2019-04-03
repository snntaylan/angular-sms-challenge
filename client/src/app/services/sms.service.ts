import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators'
import { Sms } from 'src/api/model/sms.model';

const BACKEND_URL = environment.apiUrl + '/sms/';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  smsList: Sms[] = [];
  totalSmsCount = 0;
  maxPageNumber = 0;
  pageSize = 10;

  constructor(
    private http: HttpClient,
  ) { }

  getSmsList(currentPage: number, sortType: string, sortField: string, startDate?: Date, endDate?: Date) {
    let queryParams = `?pagesize=${this.pageSize}&page=${currentPage}&sorttype=${sortType}&sortfield=${sortField}`;

    if (!!startDate && !!endDate && startDate < endDate) {
      queryParams += `&startDate=${startDate}&endDate=${endDate}`;
    }

    console.log(queryParams);

    return this.http.get<any>(BACKEND_URL + queryParams)
      .pipe(take(1)).toPromise()
      .then(data => {
        console.log(data);
        this.smsList = data.smsList;
        this.totalSmsCount = data.maxSmsList;
        this.maxPageNumber = this.totalSmsCount / this.pageSize;
      });
  }
}

