import { Donut } from './../../models/donut.model';
import { Component, OnInit } from '@angular/core';

import { DonutService } from '../../service/donut.service';
import { RouterModule } from '@angular/router';

import { DonutCardComponent } from '../../components/donut-card/donut-card.component';
import { NgForOf, NgIf } from '@angular/common';

@Component({
	standalone: true,
	imports: [RouterModule, DonutCardComponent, NgIf, NgForOf],
	selector: 'donut-list',

	template: `
		<!-- <ng-container *ngIf="donuts.length; else nothing">
			<h3>Container</h3>
			<donut-card [donut]="donuts[0]"></donut-card>
			<donut-card [donut]="donuts[1]"></donut-card>
			<donut-card [donut]="donuts[2]"></donut-card>
		</ng-container> -->
		<!-- <ng-template [ngIf]="donuts.length" [ngIfElse]="nothing">
			<h3>Template</h3>
			<donut-card [donut]="donuts[0]"></donut-card>
			<donut-card [donut]="donuts[1]"></donut-card>
			<donut-card [donut]="donuts[2]"></donut-card>
		</ng-template> -->
		<div class="list_layout" style="">
			<a routerLink="new" class="btn btn--green"> New Donut<img src="/assets/img/plus_w.svg" /> </a>
			<ng-container *ngIf="donuts?.length; else nothing">
				<ng-container *ngFor="let donut of donuts; trackBy: trackById">
					<donut-card [donut]="donut"></donut-card>
				</ng-container>
			</ng-container>
			<ng-template #nothing>
				<p>No donuts...</p>
			</ng-template>
			<p>{{ errorMessage }}</p>
		</div>
	`,
	styles: [
		`
			.list_layout {
				/* display: flex;
				flex-direction: column;
				align-items: flex-start;
				gap: 15px; */
				.btn {
					margin-bottom: 20px;
				}
			}
			.donut-card-icon {
				width: 140px;
			}
		`,
	],
})
export class DonutListComponent implements OnInit {
	donuts!: Donut[];
	errorMessage!: string;
	constructor(private donutService: DonutService) {}

	ngOnInit(): void {
		this.donutService.read().subscribe({
			next: (donuts: Donut[]) => {
				this.donuts = donuts;
			},
			error: (err) => {
				this.errorMessage = err;
			},
		});
	}

	trackById(ind: number, val: Donut) {
		return val.id;
	}
}
