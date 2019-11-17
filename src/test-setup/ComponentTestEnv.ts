import { ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

export interface ComponentTestEnv<T> {
  fixture: ComponentFixture<T>;
  component: T;
  debug: DebugElement;
  element: HTMLElement;
  setup: (setValues?: () => void) => void;
  init: (done: any, setValues?: () => void) => typeof async;
  getChild(componentType: any): DebugElement;
  getElementByTestId(testId: string): HTMLElement;
  getDebugByTestId(testId: string): DebugElement;
}
