import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/model/event.model';
import { EventsService } from 'src/app/services/events.service';
import { HttpRuntimeException } from 'src/app/model/http-error.model';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})
export class ListEventsComponent implements OnInit {
  loading = false;
  refreshStartTime = -1;
  refreshStopTime = -1;
  httpRuntimeException: HttpRuntimeException;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  events: Event[];

  constructor(private eventsService: EventsService, private formBuilder: FormBuilder) {
    this.eventsService.events.subscribe(payload => {
      this.loading = false;
      this.refreshStopTime = Date.now();
      console.log('payload', payload);
      if (Array.isArray(payload)) {
        this.events = payload;
      } else {
        // Show error!
        this.httpRuntimeException = payload as HttpRuntimeException;
        this.events = [];

        // this.notificationsService.notify(NotificationType.DANGER, 'Error retrieving products', this.httpRuntimeException.error);
      }
    });
  }

  ngOnInit() {
    this.refresh(null);

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  refresh($event: any) {
    this.loading = true;
    this.refreshStartTime = Date.now();
    this.eventsService.getEvents();
  }
}
