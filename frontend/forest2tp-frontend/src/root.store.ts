import { Injectable } from "@angular/core";

import { BehaviorSubject } from 'rxjs';

@Injectable ({
    providedIn: 'root'
})
export class RootStore {
    private _result = new BehaviorSubject<any>(null);

    get result$() {
      return this._result.asObservable();
    }
  
    get result() {
      return this._result.value;
    }
  
    setResult(project: any) {
      this._result.next(project);
    }
  }