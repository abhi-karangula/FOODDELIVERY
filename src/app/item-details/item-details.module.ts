/**
 * @author: Nagender chary naroju
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ItemDetailsRoutingModule } from './item-details-routing.module';
import { ItemDetailsComponent } from './item-details.component';

@NgModule({
  declarations: [ItemDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ItemDetailsRoutingModule
  ],
  exports: [
    ItemDetailsRoutingModule,
    CommonModule,
    FormsModule
  ],
})
export class ItemDetailsModule { }
