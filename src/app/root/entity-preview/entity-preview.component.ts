import { Component, OnInit, Input } from '@angular/core';
import { Entity } from '../Entity';

@Component({
  selector: 'jesi-entity-preview',
  templateUrl: './entity-preview.component.html',
  styleUrls: ['./entity-preview.component.scss'],
})
export class EntityPreviewComponent {
  @Input() entity: Entity;
}
