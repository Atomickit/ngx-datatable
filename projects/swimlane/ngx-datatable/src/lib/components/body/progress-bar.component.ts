import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DatatableProgressBarDirective } from './progress-bar.directive';

@Component({
  selector: 'datatable-progress',
  template: `
    <ng-template
      *ngIf="progressBarTemplate"
      [ngTemplateOutlet]="progressBarTemplate.template"
      [ngTemplateOutletContext]="{}"
    >
    </ng-template>

    <div *ngIf="!progressBarTemplate" class="progress-linear" role="progressbar">
      <div class="container">
        <div class="bar"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  @Input() progressBarTemplate: DatatableProgressBarDirective;
}
