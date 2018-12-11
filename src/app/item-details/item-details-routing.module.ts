/**
 * @author: Avinash Karangula
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemDetailsComponent } from './item-details.component';

const routes: Routes = [{ path: 'items/:name/:location', component: ItemDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemDetailsRoutingModule { }
