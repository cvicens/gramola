import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatToolbarModule, MatCheckboxModule, MatListModule, MatIconModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatCardModule, MatGridListModule, MatSnackBarModule } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';

import { Routes, RouterModule } from '@angular/router';

// Services
import { ConfigService } from './services/config.service';
import { EventsService } from './services/events.service';

// Components
import { ListEventsComponent } from './components/list-events/list-events.component';
import { HttpClientModule } from '@angular/common/http';


const appRoutes: Routes = [
  { path: 'events', component: ListEventsComponent },
  { path: '',   redirectTo: '/events', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // tslint:disable-next-line:max-line-length
    MatButtonModule, MatToolbarModule, MatCheckboxModule, MatListModule, MatIconModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatCardModule, MatGridListModule, MatSnackBarModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  providers: [EventsService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
