import { Component, OnInit } from '@angular/core';
import { BusynessService } from 'projects/busyness/src/public_api';
import { timer } from 'rxjs';
import { take, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoaderType } from 'busyness';

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
    this.timer$.subscribe((time) => {
      this.httpClient.get('https://pokeapi.co/api/v2/pokemon/1/')
      .pipe(
        delay(time * 100)
      )
      .subscribe(val => console.log('resolve obs'));
    });
  }

  testSingle() {
    this.timer$.subscribe((val) => {
      this.busynessService.next(new Promise((resolve, reject) => {
        setTimeout(() => {
          if (val % 2 === 0) {
            resolve();
          } else {
            reject();
          }
          console.log('resolve promise');
        }, val * 1000);
      }));
    });
  }

  testMulti() {
    // this.busynessService.loaderSource.next(LoaderType.PACMAN);
    const battery = [];
    for (let i = 1; i < 26; i++) {
      battery.push(new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
          console.log('resolve promise in all');
        }, i * 200);
      }));
    }
    this.busynessService.next(...battery);
  }
}
