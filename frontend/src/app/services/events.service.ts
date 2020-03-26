import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../model/event.model';
import { ConfigService } from './config.service';
import { Config } from '../model/config.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService extends GenericService {
  // tslint:disable-next-line:variable-name
  // private _ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // public readonly ready: Observable<boolean> = this._ready.asObservable();

  // tslint:disable-next-line:variable-name
  private _events: BehaviorSubject<Event[]> = new BehaviorSubject([]);
  public readonly events: Observable<Event[]> = this._events.asObservable();

  config: Config;
  baseUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService, protected snackBar: MatSnackBar) {
    super(snackBar);
    console.log('EventsService constructror');
    this.configService.config.subscribe(config => {
      console.log('config', config);
      if (config) {
        this.config = config;
        if (this.init()) {
          this.getEvents();
        }
      }
    });
  }

  init() {
    this.baseUrl = this.config.API_ENDPOINT;
    if (this.baseUrl == null) {
      return false;
    }

    return true;
  }

  getEvents() {
    if (this.baseUrl != null) {
      // return this.http.get<Event[]>(this.baseUrl + '/api/events');
      this.http.get<Event[]>(this.baseUrl + '/api/events')
      .subscribe(
        (events: Event[]) => {
          this._events.next(events);
          this.openSnackBar(`Retrieved #${events.length} events`);
        },
        error => {
          this.openSnackBar('Error while retrieveing events');
          console.error('Error while retrieveing events', JSON.stringify(error));
        }
      );
    } else {
      this.openSnackBar('Events Service not ready, try again please');
      console.error('EventsService not ready!');
    }
  }

  createEvent(event :Event) {
    if (this.baseUrl != null) {
      this.http.post<any>(this.baseUrl + '/api/events', event)
      .subscribe(
        (payload: any) => {
          this.openSnackBar("Event sent to the server correctly");
          console.log(`createEvent resolved to this: ${payload}`);
          this.getEvents();
        },
        error => {
          this.openSnackBar('Error while creating an event');
          console.error('Error while creating an event', JSON.stringify(error));
        }
      );
    } else {
      this.openSnackBar('Events Service not ready, try again please');
      console.error('EventsService not ready!');
    }
  }
}
