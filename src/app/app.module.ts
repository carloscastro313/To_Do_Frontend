import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';;
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { from } from 'rxjs';
import { RegisterComponent } from './pages/register/register.component';
import { FoldersComponent } from './pages/folders/folders.component';
import { PaginatePipe } from './pipes/paginate.pipe';
import { TasksComponent } from './pages/tasks/tasks.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FoldersComponent,
    PaginatePipe,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatInputModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    JwtModule.forRoot({
      config: {
        // ...
        tokenGetter: () => {
          return localStorage.getItem("token");
        },
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [PaginatePipe]
})
export class AppModule { }
