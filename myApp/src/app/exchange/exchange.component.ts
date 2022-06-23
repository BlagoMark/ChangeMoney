import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css'],
})
export class ExchangeComponent implements OnInit {
  constructor(private http: HttpClient) {}
  response: any;
  usduah: any;
  euruah: any;
  btcusd: any;
  input: any;
  output: any;
  inputCurrency: any;
  outputCurrency: 'USD' | any;

  ngAfterViewInit() {
    setTimeout((_: any) => this.search());
  }
  search() {
    this.http
      .get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
      .subscribe((response) => {
        this.response = response;
        this.inputCurrency = this.response[3].ccy;
        this.outputCurrency = this.response[0].ccy;
        this.input = 1;
        this.output = ((this.input * this.response[3].sale) / 1).toFixed(3);
        this.usduah = (this.response[0].sale / 1).toFixed(3);
        this.euruah = (this.response[1].sale / 1).toFixed(3);
        this.btcusd = (this.response[3].sale / 1).toFixed(3);
        console.log(
          this.inputCurrency,
          this.output,
          this.input,
          this.outputCurrency
        );
        return response;
      });
  }

  onChangeInputCurrency(option: any) {
    this.inputCurrency = option.value;
  }

  onChangeOutputCurrency(option: any) {
    this.outputCurrency = option.value;
  }

  onChangeInput(value: any) {
    this.input = value.value;
  }

  convert() {
    // USD/RUR
    if (this.inputCurrency == 'USD' && this.outputCurrency == 'RUR') {
      this.output = (this.input * this.response[0].sale * 2).toFixed(3);
    } else if (this.inputCurrency == 'RUR' && this.outputCurrency == 'USD') {
      this.output = (this.input / (this.response[0].sale * 2)).toFixed(3);
    }
    // EUR/USD
    else if (this.inputCurrency == 'EUR' && this.outputCurrency == 'USD') {
      this.output = (
        (this.input * this.response[1].sale) /
        this.response[0].sale
      ).toFixed(3);
    } else if (this.inputCurrency == 'USD' && this.outputCurrency == 'EUR') {
      this.output = (
        (this.input * this.response[0].sale) /
        this.response[1].sale
      ).toFixed(3);
    }
    // EUR/RUR
    else if (this.inputCurrency == 'EUR' && this.outputCurrency == 'RUR') {
      this.output = (this.input * this.response[1].sale * 2).toFixed(3);
    } else if (this.inputCurrency == 'RUR' && this.outputCurrency == 'EUR') {
      this.output = (this.input / (this.response[1].sale * 2)).toFixed(3);
    }
    // BTC/USD
    else if (this.inputCurrency == 'USD' && this.outputCurrency == 'BTC') {
      this.output = (this.input / this.response[3].sale).toFixed(7);
    } else if (this.inputCurrency == 'BTC' && this.outputCurrency == 'USD') {
      this.output = (this.response[3].sale * this.input).toFixed(3);
    }
    // BTC/EUR
    else if (this.inputCurrency == 'EUR' && this.outputCurrency == 'BTC') {
      this.output = (
        ((this.response[1].sale / this.response[0].sale) * this.input) /
        this.response[3].sale
      ).toFixed(7);
    } else if (this.inputCurrency == 'BTC' && this.outputCurrency == 'EUR') {
      this.output = (
        this.response[3].sale /
        ((this.response[0].sale * this.input) / this.response[1].sale)
      ).toFixed(3);
    }
    // BTC/RUR
    else if (this.inputCurrency == 'BTC' && this.outputCurrency == 'RUR') {
      this.output = (
        this.input *
        this.response[0].sale *
        2 *
        this.response[3].sale
      ).toFixed(3);
    } else if (this.inputCurrency == 'RUR' && this.outputCurrency == 'BTC') {
      this.output = (
        (this.input * this.response[2].sale * 2) /
        this.response[3].sale
      ).toFixed(7);
    } else {
      alert('Что-то не так🤔 \nВозможно ты не совсем правильно указал валюты.');
    }
  }
  ngOnInit(): void {}
}
