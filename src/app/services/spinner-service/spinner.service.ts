import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SpinnerService {
  public visible$ = new BehaviorSubject(true);

  public toggleVisible(flag: boolean) {
    this.visible$.next(flag)
  }
}
