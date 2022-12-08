import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
export class EventService {
  constructor() { }
  private eventSubject = new Subject<any>();
  publishEvent(data:any){
    this.eventSubject.next(data);
  }
  getEvent(): Subject <any> {
    return this.eventSubject
  }
}
