import { Component, Input } from '@angular/core';
export class NovoCollapsableColumnElement {
    constructor() {
        this.isChecked = false;
    }
    set icon(icon) {
        if (icon) {
            this._icon = `bhi-${icon}`;
        }
    }
    get icon() {
        return this._icon;
    }
}
NovoCollapsableColumnElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-collapsable-column',
                template: `
    <h1><i [class]="icon"></i>{{header}}</h1>
    <div class="mini-check-all-container">
      <novo-checkbox [(ngModel)]="isChecked"></novo-checkbox>
      <div class="check-all-header">
       {{ entity === 'Candidate' ? 'Job Order' : 'Candidate' }}
      </div>
    </div>
    <div [dragula]="dragulaName" [dragulaModel]="dragulaModelData" class="card-container">
      <div *ngFor="let card of dragulaModelData" class="info-card">
        <novo-checkbox [(ngModel)]="card.selected"></novo-checkbox>
          <span id="info-card-menu">
            <i class="bhi-more"></i>
          </span>
          <span id="info-card-status-dot">
            <i class="bhi-circle"></i>
          </span>
          {{ entity === 'Candidate' ? card?.jobOrder?.title : card?.candidate?.firstName + ' ' + card?.candidate?.lastName }}
      </div>
    </div>
  `,
                styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}:host{background:#fff;border-radius:.5em;box-shadow:0 2px 3px rgba(0,0,0,.1);display:inline-block;justify-content:flex-start;margin:1em;min-width:15%;padding-bottom:2em;vertical-align:top}:host h1{border-bottom:1px solid #f4f4f4;color:#707070;font-size:1.1em;margin:auto;padding:1em}:host h1 .active{color:#4a89dc}:host .mini-check-all-container{align-items:baseline;border-bottom:1px solid #f4f4f4;display:flex}:host .mini-check-all-container novo-checkbox{border-right:1px solid #f4f4f4;flex-basis:30%;padding:1.5em 1.5em 1.5em 2em}:host .mini-check-all-container .check-all-header{flex-basis:70%;padding:1em}:host #info-card-checkbox{padding:1em 1em 1em 0}:host #info-card-menu{padding-right:1.5em}:host #info-card-status-dot{color:#8cc152;padding-left:.5em;padding-right:.5em}:host div.card-container{min-height:5em}:host div.card-container div.info-card{align-items:center;background:#f4f4f4;border-radius:.25em;box-shadow:0 1px 2px rgba(0,0,0,.15);display:flex;height:5em;justify-content:flex-start;margin:1em;padding:1em;position:relative;transition:all .2s ease-in-out}:host div.card-container div.info-card:hover{box-shadow:-2px 2px 2px 0 rgba(0,0,0,.3);cursor:-webkit-grab;cursor:grab;transform:translate(1px,-1px)}:host div.card-container div.info-card:active{box-shadow:0 1px 2px rgba(0,0,0,.15);cursor:-webkit-grabbing;cursor:grabbing;transform:translate(0)}:host div.card-container div.info-card:after{border-radius:.25em;box-shadow:-2px 2px 2px 0 rgba(0,0,0,.5);content:\"\";height:100%;opacity:0;position:absolute;transition:opacity .3s ease-in-out;width:100%;z-index:-1}:host div.card-container div.info-card:after:hover{opacity:1}"]
            },] }
];
NovoCollapsableColumnElement.propDecorators = {
    header: [{ type: Input }],
    icon: [{ type: Input }],
    dragulaName: [{ type: Input }],
    dragulaModelData: [{ type: Input }],
    entity: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGFwc2FibGVDb2x1bW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvbGxhcHNhYmxlLWNvbHVtbi9Db2xsYXBzYWJsZUNvbHVtbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUEyQmpELE1BQU0sT0FBTyw0QkFBNEI7SUF6QnpDO1FBcUNFLGNBQVMsR0FBRyxLQUFLLENBQUM7SUFTcEIsQ0FBQztJQWxCQyxJQUNJLElBQUksQ0FBQyxJQUFZO1FBQ25CLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUNELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7WUFwQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQlQ7O2FBRUY7OztxQkFFRSxLQUFLO21CQUVMLEtBQUs7MEJBWUwsS0FBSzsrQkFFTCxLQUFLO3FCQUVMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY29sbGFwc2FibGUtY29sdW1uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aDE+PGkgW2NsYXNzXT1cImljb25cIj48L2k+e3toZWFkZXJ9fTwvaDE+XG4gICAgPGRpdiBjbGFzcz1cIm1pbmktY2hlY2stYWxsLWNvbnRhaW5lclwiPlxuICAgICAgPG5vdm8tY2hlY2tib3ggWyhuZ01vZGVsKV09XCJpc0NoZWNrZWRcIj48L25vdm8tY2hlY2tib3g+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2hlY2stYWxsLWhlYWRlclwiPlxuICAgICAgIHt7IGVudGl0eSA9PT0gJ0NhbmRpZGF0ZScgPyAnSm9iIE9yZGVyJyA6ICdDYW5kaWRhdGUnIH19XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IFtkcmFndWxhXT1cImRyYWd1bGFOYW1lXCIgW2RyYWd1bGFNb2RlbF09XCJkcmFndWxhTW9kZWxEYXRhXCIgY2xhc3M9XCJjYXJkLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgY2FyZCBvZiBkcmFndWxhTW9kZWxEYXRhXCIgY2xhc3M9XCJpbmZvLWNhcmRcIj5cbiAgICAgICAgPG5vdm8tY2hlY2tib3ggWyhuZ01vZGVsKV09XCJjYXJkLnNlbGVjdGVkXCI+PC9ub3ZvLWNoZWNrYm94PlxuICAgICAgICAgIDxzcGFuIGlkPVwiaW5mby1jYXJkLW1lbnVcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLW1vcmVcIj48L2k+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGlkPVwiaW5mby1jYXJkLXN0YXR1cy1kb3RcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWNpcmNsZVwiPjwvaT5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAge3sgZW50aXR5ID09PSAnQ2FuZGlkYXRlJyA/IGNhcmQ/LmpvYk9yZGVyPy50aXRsZSA6IGNhcmQ/LmNhbmRpZGF0ZT8uZmlyc3ROYW1lICsgJyAnICsgY2FyZD8uY2FuZGlkYXRlPy5sYXN0TmFtZSB9fVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL0NvbGxhcHNhYmxlQ29sdW1uLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTm92b0NvbGxhcHNhYmxlQ29sdW1uRWxlbWVudCB7XG4gIEBJbnB1dCgpXG4gIGhlYWRlcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBzZXQgaWNvbihpY29uOiBzdHJpbmcpIHtcbiAgICBpZiAoaWNvbikge1xuICAgICAgdGhpcy5faWNvbiA9IGBiaGktJHtpY29ufWA7XG4gICAgfVxuICB9XG4gIGdldCBpY29uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2ljb247XG4gIH1cbiAgaXNDaGVja2VkID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfaWNvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBkcmFndWxhTmFtZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBkcmFndWxhTW9kZWxEYXRhOiBhbnk7XG4gIEBJbnB1dCgpXG4gIGVudGl0eTogJ0NhbmRpZGF0ZScgfCAnSm9iT3JkZXInO1xufVxuIl19