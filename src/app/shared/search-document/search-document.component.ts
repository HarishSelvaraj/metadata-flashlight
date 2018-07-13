import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input } from '@angular/core';
import { ComponentLoaderDirective } from '../../directives/component-loader.directive';
import { CompenentInterface } from '../../shared/component.interface';

@Component({
  selector: 'app-search-document',
  templateUrl: './search-document.component.html',
  styleUrls: ['./search-document.component.scss']
})
export class SearchDocumentComponent implements OnInit {

  @ViewChild(ComponentLoaderDirective) appComponentLoader: ComponentLoaderDirective;
  @Input() components;
  @Input() helpers;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.components.component);
    let viewContainerRef = this.appComponentLoader.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<CompenentInterface>componentRef.instance).helpers = this.components.data;
  }

}
