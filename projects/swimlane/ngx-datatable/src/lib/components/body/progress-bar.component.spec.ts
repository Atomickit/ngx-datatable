import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProgressBarComponent } from './progress-bar.component';
import { addMatchers } from '../../test';

let fixture: ComponentFixture<TestFixtureComponent>;
let component: TestFixtureComponent;
let page: Page;

/**
 * a Page is a collection of references to DebugElements.
 * it makes for cleaner testing
 */
class Page {
  defaultProgressBar: DebugElement;
  templateProgressBar: DebugElement;

  detectChangesAndRunQueries() {
    fixture.detectChanges();

    const de = fixture.debugElement;

    this.templateProgressBar = de.query(By.css('#template-progress-bar'));
    this.defaultProgressBar = de.query(By.css('.progress-linear'));
  }
}

/**
 * we test DatatableProgressBarComponent by embedding it in a
 * test host component
 */
@Component({
  template: `
    <datatable-progress [progressBarTemplate]="progressBarTemplate"> </datatable-progress>

    <ng-template #testTemplate>
      <p id="template-progress-bar">Loading...</p>
    </ng-template>
  `
})
class TestFixtureComponent {
  progressBarTemplate: { template: TemplateRef<any> };

  /**
   * establishes a reference to a test template that can
   * selectively be passed to the DatatableFooterComponent
   * in these unit tests
   */
  @ViewChild('testTemplate', { read: TemplateRef, static: true })
  testTemplate: TemplateRef<any>;
}

async function setupTest() {
  await TestBed.configureTestingModule({
    declarations: [TestFixtureComponent, ProgressBarComponent]
  }).compileComponents();
  fixture = TestBed.createComponent(TestFixtureComponent);
  component = fixture.componentInstance;
  page = new Page();
  page.detectChangesAndRunQueries();
}

describe('ProgressBarComponent', () => {
  beforeAll(addMatchers);

  beforeEach(waitForAsync(setupTest));

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('when there is no template', () => {
    it('should not render a template', () => {
      component.progressBarTemplate = undefined;
      page.detectChangesAndRunQueries();

      expect(page.templateProgressBar).toBeNull();
    });
  });

  describe('when there is a template', () => {
    it('should not render div.progress-linear', () => {
      component.progressBarTemplate = { template: component.testTemplate };
      page.detectChangesAndRunQueries();

      expect(page.defaultProgressBar).toBeNull();
    });
  });
});
