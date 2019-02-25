import { Component, OnInit } from '@angular/core';
import { BusynessService } from 'projects/busyness/src/public_api';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private readonly busynessService: BusynessService) {}

  ngOnInit() {
    const timer$ = timer(0, 500).pipe(take(50));
    timer$.subscribe(() => {
      this.busynessService.next(new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
          console.log('resolve');
        }, 1000);
      }));
    });
  }
}
