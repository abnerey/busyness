import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BusynessService, LoaderType } from 'projects/busyness/src/public_api';
import { timer, fromEvent, Observable, Subscription } from 'rxjs';
import { take, delay, map, pairwise, filter, throttleTime } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  scrollDownSubscription: Subscription;
  scrollUpSubscription: Subscription;
  configFormSubscription: Subscription;
  moveTop: boolean; // TODO: remove value for production
  moveBottom: boolean;
  isMovingTop: boolean;
  isMovingBottom: boolean;
  timer$ = timer(0, 500).pipe(take(25));
  loaderForm: FormGroup;
  configForm: FormGroup;
  config: any;
  loaders: any[];

  constructor(private readonly busynessService: BusynessService,
              private readonly httpClient: HttpClient,
              private readonly mediaMatcher: MediaMatcher,
              private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initScrollingSubs();
    this.setUpForms();
    this.initLoaders();
  }

  initLoaders() {
    this.loaders = Object.entries(LoaderType).reduce((acc, [, loader]) => {
      acc.push({type: loader.type, divs: Array(loader.divs)});
      return acc;
    }, [])
    .filter(loader => loader.type !== 'ball-clip-rotate' && loader.type !== 'ball-clip-rotate-pulse');
  }

  setUpForms() {
    this.loaderForm = this.formBuilder.group({});
    this.configForm = this.formBuilder.group({
      requests: this.formBuilder.control(5, Validators.required),
      timer: this.formBuilder.control(500, Validators.required),
      hint: this.formBuilder.control(null)
    });
    this.configFormSubscription = this.configForm.valueChanges.subscribe(val => this.config = val);
  }

  initScrollingSubs() {
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

    // TODO: uncomment for production
    this.scrollUpSubscription = this.getScrollingObs()
    .pipe(
      filter(scrollPairs =>  scrollPairs[0] > scrollPairs[1]),
      throttleTime(1000),
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
        return e.target;
      }),
      map((e: any) => {
        return e.scrollTop;
      }),
      pairwise()
    );
  }

  onSelectLoader(loader) {
    this.busynessService.loaderSource.next(loader);
  }

  testObs() {
    console.log(this.config);
    const timer$ = timer(0, 500).pipe(take(this.config.requests));
    timer$.subscribe((time) => {
      this.httpClient.get('https://pokeapi.co/api/v2/pokemon/1/')
      .pipe(
        delay(time * this.config.timer)
      )
      .subscribe(val => console.log('resolve obs: ', this.config.hint));
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

    if (this.configFormSubscription) {
      this.configFormSubscription.unsubscribe();
    }
  }
}
