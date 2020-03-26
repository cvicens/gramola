import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Event, IEvent } from 'src/app/model/event.model';
import { EventsService } from 'src/app/services/events.service';
import { HttpRuntimeException } from 'src/app/model/http-error.model';
import { AddEventComponent } from 'src/app/components/add-event/add-event.component';

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

  // Event to be created
  eventToBeCreated: IEvent;

  // Consutructor
  constructor(private eventsService: EventsService, private formBuilder: FormBuilder, private dialog: MatDialog) {
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

  openDialog(): void {
    this.eventToBeCreated = new Event();
    const dialogRef = this.dialog.open(AddEventComponent, {
      //width:  '900px',
      //height: '900px',
      maxHeight: '800px',
      data: this.eventToBeCreated
    });

    dialogRef.afterClosed().subscribe(result => {
      this.eventToBeCreated = result;
      
      if (this.validateEvent(result)) {
        console.log(`Result valid`);
        this.eventsService.createEvent(result);
      } else {
        console.log(`Result invalid`);
      }
    });
  }

  validateEvent(event :Event): boolean {
    if (event) {
      if (typeof event.name != 'undefined' && event.name &&
          typeof event.artist != 'undefined' && event.artist &&
          typeof event.description != 'undefined' && event.description &&
          typeof event.location != 'undefined' && event.location &&
          typeof event.address != 'undefined' && event.address &&
          typeof event.city != 'undefined' && event.city &&
          typeof event.province != 'undefined' && event.province &&
          typeof event.date != 'undefined' && event.date &&
          typeof event.startTime != 'undefined' && event.startTime &&
          typeof event.endTime != 'undefined' && event.endTime) {
        return true;
     }
    } 

    return false;
  }
}
