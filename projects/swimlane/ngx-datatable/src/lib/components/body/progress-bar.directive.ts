import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { DataTableProgressBarTemplateDirective } from './progress-bar-template.directive';

@Directive({ selector: 'ngx-datatable-progress-bar' })
export class DatatableProgressBarDirective {
  @Input('template')
  _templateInput: TemplateRef<any>;

  @ContentChild(DataTableProgressBarTemplateDirective, { read: TemplateRef })
  _templateQuery: TemplateRef<any>;

  get template(): TemplateRef<any> {
    return this._templateInput || this._templateQuery;
  }
}
