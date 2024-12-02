import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import {routes} from './app/app.routes';
import {MatSortModule} from '@angular/material/sort';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';



bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(
      CommonModule,
      MatToolbarModule,
      MatButtonModule,
      ReactiveFormsModule,
      MatTableModule,
      MatButtonModule,
      MatIconModule,
      MatSortModule,
      BrowserAnimationsModule
    ),
  ],
}).catch((err) => console.error(err));
