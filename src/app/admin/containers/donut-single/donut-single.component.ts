import { Donut } from './../../models/donut.model';
import { Component, OnInit } from '@angular/core';

import { DonutService } from '../../service/donut.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DonutFormComponent } from '../../components/donut-form/donut-form.component';

@Component({
	standalone: true,
	imports: [DonutFormComponent],
	selector: 'donut-single',
	template: `
		<div>
			<donut-form
				[isEdit]="isEdit"
				[donut]="donut"
				(create)="onCreate($event)"
				(update)="onUpdate($event)"
				(delete)="onDelete($event)"
			></donut-form>
			<p>{{ errorMessage }}</p>
		</div>
	`,
	styles: [],
})
export class DonutSingleComponent implements OnInit {
	donut!: Donut;
	isEdit!: boolean;
	errorMessage!: string;
	constructor(
		private route: ActivatedRoute,
		private donutServer: DonutService,
		private router: Router
	) {}

	ngOnInit(): void {
		const id = this.route.snapshot.params.id;
		this.isEdit = this.route.snapshot.data['isEdit'];
		this.donutServer.readOne(id).subscribe((d: Donut) => (this.donut = d));
	}
	onCreate(donut: Donut) {
		this.donutServer.addNewDonut(donut).subscribe({
			next: (d) => this.router.navigate(['admin', 'donuts', d.id]),
			error: (err) => {
				this.errorMessage = err;
			},
		});
	}
	onUpdate(donut: Donut) {
		this.donutServer.updateExistingDonut(donut).subscribe({
			next: () => this.router.navigate(['admin']),
			error: (err) => {
				this.errorMessage = err;
			},
		});
	}
	onDelete(donut: Donut) {
		this.donutServer.delete(donut).subscribe({
			next: () => this.router.navigate(['admin']),
			error: (err) => {
				this.errorMessage = err;
			},
		});
	}
}
