import { CurrencyPipe, NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { RouterModule } from '@angular/router';

// [class.donut-card__promo]="donut.promo"

@Component({
	standalone: true,
	imports: [RouterModule, NgClass, NgSwitch, CurrencyPipe, NgSwitchCase, NgSwitchDefault],
	selector: 'donut-card',
	template: `
		<a
			[routerLink]="donut.id"
			class="donut-card"
			[ngClass]="{
				'donut-card__promo': donut.promo === 'limited',
				'donut-card__new': donut.promo === 'new'
			}"
		>
			<img src="/assets/img/{{ donut.icon }}.svg" [alt]="donut.name" class="donut-card__icon " />
			<div class="donut-card__info">
				<p class="donut-card__name">{{ donut.name }}</p>
				<p class="donut-card__price">
					{{ donut.price / 100 | currency: 'USD ' }}
				</p>
			</div>
			<ng-container [ngSwitch]="donut.promo">
				<span *ngSwitchCase="'new'" class="donut-card__new-span">New</span>
				<span *ngSwitchCase="'limited'" class="donut-card__new-lim">Limited</span>
				<span *ngSwitchDefault class="donut-card__promo-span">Nothing special...</span>
			</ng-container>
		</a>
	`,
	styles: [
		`
			.donut-card {
				display: flex;
				align-items: center;
				background: #f7f7f7;
				border-radius: 5px;
				gap: 10px;
				margin: 0 0 5px 0;
				padding: 5px 15px;

				transition: transform 0.2s ease-in-out;
				&__promo {
					border: 3px solid #eee;
				}
				&__new {
					border: 3px solid #01a3a4;
				}
				&__promo-span {
					padding: 3px 10px;
					border-radius: 3px;
					border: 3px solid #01a3a4;
				}

				&__new-span {
					color: #c14583;
					font-size: 20px;
					border: 2px solid #c14583;
					padding: 3px 10px;
					border-radius: 3px;
				}
				&__new-lim {
					color: #c14583;
					font-size: 20px;
					border: 2px solid #c14583;
					padding: 3px 10px;
					border-radius: 3px;
				}
				&:hover {
					/* prettier-ignore */
					transform: translateY(-3px);
				}

				&__icon {
					transition: scale 0.2s ease-in-out;

					width: 140px;
				}
				&__info {
				}

				&__name {
					font-size: 16px;
				}
				&__price {
					font-size: 14px;
					color: #c14583;
				}
			}
		`,
	],
})
export class DonutCardComponent {
	@Input() donut!: Donut;
}
