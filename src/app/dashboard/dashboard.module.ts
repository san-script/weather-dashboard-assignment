import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { HeaderComponent } from './header/header.component';
import { RightBottomPanelComponent } from './right-bottom-panel/right-bottom-panel.component';
import { FormsModule } from '@angular/forms';
// Import the providing module
import { UtilityModule } from '../utility/utility.module'; 




@NgModule({
  declarations: [
    HomeComponent,
    LeftPanelComponent,
    RightPanelComponent,
    HeaderComponent,
    
    RightBottomPanelComponent,
        
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    UtilityModule
  ],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add CUSTOM_ELEMENTS_SCHEMA here
})
export class DashboardModule { }
