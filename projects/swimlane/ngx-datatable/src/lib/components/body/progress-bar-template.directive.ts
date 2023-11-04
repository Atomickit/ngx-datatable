import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[ngx-datatable-progress-bar-template]' })
export class DataTableProgressBarTemplateDirective {
  constructor(public template: TemplateRef<any>) {}
}
