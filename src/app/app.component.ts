import { Component, OnInit } from '@angular/core';
import { BusynessService } from 'projects/busyness/src/public_api';
import { timer } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  timer$ = timer(0, 500).pipe(take(25));

  constructor(private readonly busynessService: BusynessService,
              private readonly httpClient: HttpClient) {}

  ngOnInit() {
  }

  testObs() {
    this.timer$.subscribe(() => {
      this.httpClient.get('https://pokeapi.co/api/v2/pokemon/1/').subscribe(val => console.log('resolve obs'));
    });
  }

  testSingle() {
    this.timer$.subscribe((val) => {
      this.busynessService.next(new Promise((resolve, reject) => {
        setTimeout(() => {
          if (val % 2 === 0) {
            // resolve();
          } else {
            reject();
          }
          console.log('resolve promise');
        }, 1000);
      }));
    });
  }

  testMulti() {
    const battery = [];
    for (let i = 0; i < 25; i++) {
      battery.push(new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
          console.log('resolve promise in all');
        }, 1000);
      }));
    }
    this.busynessService.next(...battery);
  }
}
