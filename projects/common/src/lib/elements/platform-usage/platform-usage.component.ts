import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';

export class LcuPlatformUsagePlatformUsageElementState {}

export class LcuPlatformUsagePlatformUsageContext extends LCUElementContext<LcuPlatformUsagePlatformUsageElementState> {}

export const SELECTOR_LCU_PLATFORM_USAGE_PLATFORM_USAGE_ELEMENT = 'lcu-platform-usage-platform-usage-element';

@Component({
  selector: SELECTOR_LCU_PLATFORM_USAGE_PLATFORM_USAGE_ELEMENT,
  templateUrl: './platform-usage.component.html',
  styleUrls: ['./platform-usage.component.scss']
})
export class LcuPlatformUsagePlatformUsageElementComponent extends LcuElementComponent<LcuPlatformUsagePlatformUsageContext> implements OnInit {
  //  Fields

  //  Properties

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();
  }

  //  API Methods

  //  Helpers
}
