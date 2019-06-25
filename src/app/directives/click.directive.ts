// import {  Directive, Output, EventEmitter, HostListener } from '@angular/core';
//
//
// @Directive({
//     selector: '[fsClick]'
// })
// export class ClickDirective {
//
//   static touch = false;
//   @Output('fsClick') func = new EventEmitter();
//
//   public touchEndX = 0;
//   constructor() {}
//
//   @HostListener('click', ['$event.target', '$event'])
//   public click(el, e) {
//     if (!ClickDirective.touch) {
//       this.func.emit(e);
//     }
//     ClickDirective.touch = false;
//   }
//
//   @HostListener('touchstart', ['$event.target', '$event'])
//   public touchstart(el, e) {
//      ClickDirective.touch = true;
//   }
//
//   @HostListener('touchmove', ['$event.target', '$event'])
//   public touchmove(el, e) {
//     if (e.touches[0].pageX > this.touchEndX) {
//       this.touchEndX = e.touches[0].pageX;
//     }
//   }
//
//   @HostListener('touchend', ['$event.target', '$event'])
//   public touchend(el, e) {
//
//     if (!this.touchEndX) {
//       this.func.emit(e);
//     }
//   }
// }
//
