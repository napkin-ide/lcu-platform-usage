import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule, MaterialModule, LCUServiceSettings } from '@lcu/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './controls/home/home.component';
import { LcuDocumentationModule } from '@lowcodeunit/lcu-documentation-common';
import { LcuPlatformUsageModule } from '@napkin-ide/lcu-platform-usage-common';
import { UserManagementStateContext } from 'projects/common/src/lib/state/user-management/user-management-state.context';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FathymSharedModule,
    MaterialModule,
    FlexLayoutModule,
    LcuPlatformUsageModule.forRoot(),
  ],
  providers: [UserManagementStateContext,
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment)
    }],
  bootstrap: [AppComponent],
  exports: [LcuPlatformUsageModule]
})
export class AppModule { }
