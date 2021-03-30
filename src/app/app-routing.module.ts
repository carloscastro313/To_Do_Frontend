import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SessionGuard } from './guards/session.guard';
import { FoldersComponent } from './pages/folders/folders.component';
import { TasksComponent } from './pages/tasks/tasks.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {component: HomeComponent, path: 'home', canActivate: [SessionGuard], children:[
    {component: FoldersComponent, path: ''},
    {component: TasksComponent, path: 'task/:name/:id'},
  ]},
  {component: LoginComponent, path: 'login'},
  {component: RegisterComponent, path: 'registration'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
