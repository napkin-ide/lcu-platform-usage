import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './controls/home/home.component';
import { LcuDocumentationModule } from '@lowcodeunit/lcu-documentation-common';
import { LcuPlatformUsageModule } from '@napkin-ide/lcu-platform-usage-common';

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
    LcuPlatformUsageModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [LcuPlatformUsageModule]
})
export class AppModule { }
