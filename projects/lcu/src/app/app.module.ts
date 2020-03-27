import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FathymSharedModule, LCUServiceSettings } from '@lcu/common';
import { environment } from '../environments/environment';
import { LcuPlatformUsageModule, LcuPlatformUsagePlatformUsageElementComponent, SELECTOR_LCU_PLATFORM_USAGE_PLATFORM_USAGE_ELEMENT } from '@napkin-ide/lcu-platform-usage-common';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FathymSharedModule,
    LcuPlatformUsageModule.forRoot()
  ],
  providers: [
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment)
    }
  ],
  exports: [LcuPlatformUsageModule]
})
export class AppModule implements DoBootstrap {
	constructor(protected injector: Injector) {}

	public ngDoBootstrap() {
		const platformUsage = createCustomElement(LcuPlatformUsagePlatformUsageElementComponent, { injector: this.injector });

		customElements.define(SELECTOR_LCU_PLATFORM_USAGE_PLATFORM_USAGE_ELEMENT, platformUsage);
	}
}
