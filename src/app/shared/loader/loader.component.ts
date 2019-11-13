import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import useDetectChange from '../use-detect-change';

@Component({
  selector: 'jesi-loader',
  template: `
    <span id="loader" [class.centered]="isCentered"></span>
  `,
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnChanges {
  @Input() public center!: any;
  public isCentered!: boolean;

  public ngOnInit(): void {
    this.setIsCentered(this.center);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.handleInputChanges(changes);
  }

  private handleInputChanges(changes: SimpleChanges) {
    this.handleCenterChanged(changes);
  }

  private handleCenterChanged({ center }: SimpleChanges) {
    const centerChanged = useDetectChange(center);
    if (centerChanged) {
      this.setIsCentered(center.currentValue);
    }
  }

  private setIsCentered(center: any) {
    this.isCentered = ![false, undefined].includes(center);
  }
}
