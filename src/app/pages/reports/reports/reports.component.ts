import { Component, OnInit } from '@angular/core';

interface CustomDatePeriod {
  id: number;
  text: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  months: CustomDatePeriod[] = [
    { id: 1, text: 'Janeiro' },
    { id: 2, text: 'Fevereiro' },
    { id: 3, text: 'Março' },
    { id: 4, text: 'Abril' },
    { id: 5, text: 'Maio' },
    { id: 6, text: 'Junho' },
    { id: 7, text: 'Julho' },
    { id: 8, text: 'Agosto' },
    { id: 9, text: 'Setembro' },
    { id: 10, text: 'Outubro' },
    { id: 11, text: 'Novembro' },
    { id: 12, text: 'Dezembro' },
  ];

  years: CustomDatePeriod[] = [
    { id: 2016, text: '2016' },
    { id: 2017, text: '2017' },
    { id: 2018, text: '2018' },
    { id: 2019, text: '2019' },
    { id: 2020, text: '2020' },
  ];

  constructor() {}

  ngOnInit(): void {}

  generateReports() {}
}
