import {
  Directive,
  AfterViewInit,
  EventEmitter,
  Output,
  ElementRef,
  OnDestroy,
} from '@angular/core';

@Directive({ selector: '[inView]' })
export class InView implements AfterViewInit, OnDestroy {
  @Output() visibilityChange = new EventEmitter<boolean>();
  private _observer: IntersectionObserver | undefined;

  constructor(private _elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const options = { root: null, rootMargin: '0px', threshold: 0.0 };
    this._observer = new IntersectionObserver(this._callback, options);
    this._observer.observe(this._elementRef.nativeElement);
  }

  ngOnDestroy() {
    this._observer?.disconnect();
  }

  private _callback = (
    entries: IntersectionObserverEntry[],
    _: IntersectionObserver
  ) => {
    entries.forEach((entry) => {

      // entry.isIntersecting
      //   ? console.log('VISIBLE', this._elementRef.nativeElement)
      //   : console.log('NOT VISIBLE', this._elementRef.nativeElement);

      this.visibilityChange.emit(entry.isIntersecting);
    });
  };
}
