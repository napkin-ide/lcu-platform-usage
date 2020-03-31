import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import {MatTabsModule} from '@angular/material/tabs';
import { LcuService } from './services/lcu.service';
import { LcuComponent } from './controls/lcu/lcu.component';
import { LcuDirective } from './directives/lcu.directive';
import { LcuPlatformUsagePlatformUsageElementComponent } from './elements/platform-usage/platform-usage.component';
import { DataGridComponent } from './controls/data-grid/data-grid.component';
import { DataGridModule} from '@lowcodeunit/data-grid';
import { TotalBoxComponent } from './controls/total-box/total-box.component';

@NgModule({
  declarations: [LcuComponent, LcuDirective, LcuPlatformUsagePlatformUsageElementComponent, DataGridComponent, TotalBoxComponent],
  imports: [
    FathymSharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    MatTabsModule,
    DataGridModule
  ],
  exports: [LcuComponent, LcuDirective, LcuPlatformUsagePlatformUsageElementComponent, DataGridComponent, TotalBoxComponent],
  entryComponents: [LcuPlatformUsagePlatformUsageElementComponent, DataGridComponent, TotalBoxComponent]
})
export class LcuPlatformUsageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LcuPlatformUsageModule,
      providers: [LcuService]
    };
  }
}
