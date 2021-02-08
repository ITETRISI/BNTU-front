import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { StudentComponent } from './components/registration/student/student.component';
import { LoginComponent } from './components/login/login.component';
import { RoleGuard }   from './guards/role.guard';
import { StudentCabinetComponent } from './components/cabinet/student/student-cabinet/student-cabinet.component';
import { AdminComponent } from './components/cabinet/admin/admin.component';

const appRoutes: Routes = [
  {path: '', component:MainComponent},
  {path: 'registration-student', component:StudentComponent},
  {path: 'student', component:StudentCabinetComponent, canActivate: [RoleGuard]},
  {path: 'admin', component:AdminComponent, canActivate: [RoleGuard]},
  {path: 'login', component:LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    StudentComponent,
    LoginComponent,
    StudentCabinetComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
