import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-component-loader]'
})
export class ComponentLoaderDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
