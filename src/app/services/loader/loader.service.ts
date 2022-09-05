import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

/**
 * @author - Dibya Prakash Ojha
 */
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  constructor() {}

  startLoader = () => {
    this.isLoading.next(true);
  };

  stopLoader = () => {
    this.isLoading.next(false);
  };
}
