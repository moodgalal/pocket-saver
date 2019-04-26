import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListpageComponent } from './listpage/listpage';
@NgModule({
	declarations: [ListpageComponent],
	imports: [],
	exports: [ListpageComponent],
	schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
