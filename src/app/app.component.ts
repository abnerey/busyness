import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BusynessService, LoaderType } from 'projects/busyness/src/public_api';
import { timer, fromEvent, Observable, Subscription } from 'rxjs';
import { take, delay, map, pairwise, filter, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  scrollDownSubscription: Subscription;
  scrollUpSubscription: Subscription;
  moveTop: boolean;
  moveBottom: boolean;
  timer$ = timer(0, 500).pipe(take(25));

  constructor(private readonly busynessService: BusynessService,
              private readonly httpClient: HttpClient) {}

  ngOnInit() {
    this.scrollDownSubscription = this.getScrollingObs()
    .pipe(
      filter(scrollPairs =>  scrollPairs[1] > scrollPairs[0]),
      throttleTime(1000)
    )
    .subscribe((e) => {
      console.log('scrolling down', e);
      this.moveTop = true;
      this.moveBottom = false;
    });

    this.scrollUpSubscription = this.getScrollingObs()
    .pipe(
      filter(scrollPairs =>  scrollPairs[0] > scrollPairs[1]),
      throttleTime(1000)
    )
    .subscribe((e) => {
      console.log('scrolling up', e);
      this.moveBottom = true;
      this.moveTop = false;
    });
  }

  getScrollingObs(): Observable<any> {
    const scrollContainer = document.getElementById('scroll-container');
    return fromEvent(scrollContainer, 'scroll').pipe(
      map((e) => {
        /* e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation(); */
        return e.target;
      }),
      map((e: any) => {
        return e.scrollTop;
      }),
      pairwise()
    );
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

  ngOnDestroy() {
    if (this.scrollDownSubscription) {
      this.scrollDownSubscription.unsubscribe();
    }

    if (this.scrollUpSubscription) {
      this.scrollUpSubscription.unsubscribe();
    }
  }
}
