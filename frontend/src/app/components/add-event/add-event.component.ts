import { Component, OnInit, Inject } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IEvent } from 'src/app/model/event.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  form: FormGroup;

  name: string;
  address: string;
  city: string;
  province: string;
  country: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  artist: string;
  description: string;
  image: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public event: IEvent) { 
      this.form = fb.group({
        name: [event.name, Validators.required],
        address: [event.address, Validators.required],
        city: [event.city, Validators.required],
        province: [event.province, Validators.required],
        country: [event.country, Validators.required],
        startDate: [event.startDate, Validators.required],
        endDate: [event.endDate, Validators.required],
        startTime: [event.startTime, Validators.required],
        endTime: [event.endTime, Validators.required],
        location: [event.location, Validators.required],
        artist: [event.artist, Validators.required],
        description: [event.description,Validators.required]
    });
  }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
