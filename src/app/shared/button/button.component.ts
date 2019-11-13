import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import useDetectChange from '../use-detect-change';

@Component({
  selector: 'jesi-button',
  template: `
    <button [type]="type" [ngClass]="classname" [disabled]="isDisabled">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnChanges, OnInit {
  @Input() public primary!: any;
  @Input() public secondary!: any;
  @Input() public disabled!: any;
  @Input() public type = 'button';

  public classname!: string;
  public isDisabled!: true | null;

  public constructor() {}

  public ngOnInit(): void {
    this.setClassName(this.primary, this.secondary);
    this.setIsDisabled(this.disabled);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.handleInputChanges(changes);
  }

  private handleInputChanges(changes: SimpleChanges) {
    this.handleDisabledChanges(changes);
    this.handleClassesChanges(changes);
  }

  private handleClassesChanges({ primary, secondary }: SimpleChanges) {
    const primaryChanged = useDetectChange(primary);
    const secondaryChanged = useDetectChange(secondary);
    if (primaryChanged || secondaryChanged) {
      this.setClassName(primary.currentValue, secondary.currentValue);
    }
  }

  private handleDisabledChanges({ disabled }: SimpleChanges) {
    const disabledChanged = useDetectChange(disabled);
    if (disabledChanged) {
      this.setIsDisabled(disabled.currentValue);
    }
  }

  public setIsDisabled(disabled: any): void {
    this.isDisabled = ![false, undefined].includes(disabled) || null;
  }

  private setClassName(primary: any, secondary: any): void {
    if (primary) {
      this.classname = 'bg-primary';
    } else if (secondary) {
      this.classname = 'bg-secondary';
    } else {
      this.classname = 'bg-gray';
    }
  }
}
