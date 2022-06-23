import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title = 'Конвертер валют';
  response: any;
  usd: any;
  eur: any;

  constructor(private http: HttpClient) {}
  ngAfterViewInit() {
    setTimeout((_: any) => this.search());
  }
  search() {
    this.http
      .get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
      .subscribe((response) => {
        this.response = response;
        this.usd = this.response[0].sale;
        this.eur = this.response[1].sale;
        return response;
      });
  }
  ngOnInit(): void {}
}
