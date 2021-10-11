import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component:HomeComponent},
   {path: 'users',
   loadChildren: ()=> import('./features/users-manager/users-manager.module').then(o=>o.UsersManagerModule)},
    {path:'**',component:HomeComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
