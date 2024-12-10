import {Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[data-testid]'
})
export class DataTestidDirective {

  @Input('data-testid') dataCyValue!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.dataCyValue) {
      this.renderer.setAttribute(this.el.nativeElement, 'data-testid', this.dataCyValue);
    }
  }

}
