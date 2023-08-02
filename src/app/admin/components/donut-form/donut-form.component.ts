import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Donut } from '../../models/donut.model';
import { NgForOf, NgIf } from '@angular/common';

@Component({
	standalone: true,
	imports: [FormsModule, NgIf, NgForOf],
	selector: 'donut-form',
	template: `
		<form #form="ngForm" validate *ngIf="donut; else loadingString">
			<!-- <select formControlName="icons">
				<option [ngValue]="null" disabled>Select Country</option>
				<option *ngFor="let icon of icons" [ngValue]="icon">{{ icon }}</option>
			</select> -->
			<label>
				<span style="text-align: left">Name:</span>
				<input
					type="text"
					name="name"
					class="input"
					[ngModel]="donut.name"
					required
					[ngModelOptions]="{ updateOn: 'blur' }"
					#name="ngModel"
				/>
				<!-- <p>valid:{{ name.value?.length }}</p>
				<p>valid:{{ name.valid }}</p>
				<p>invalid:{{ name.invalid }}</p>
				<p>touched :{{ name.touched }}</p>
				<p>untouched :{{ name.untouched }}</p>
				<p>pristine :{{ name.pristine }}</p>
				<p>dirty :{{ name.dirty }}</p> -->

				<ng-container *ngIf="name.invalid && name.touched">
					<span class="error-span">Name is Required</span>
				</ng-container>
				<!-- <ng-template [ngIf]="name.value?.length < 3 && name.touched">
					min name length is 3 characters
				</ng-template> -->
			</label>
			<label>
				<span style="text-align: left">Price:</span>
				<input
					type="number"
					name="price"
					class="input"
					[ngModel]="donut.price"
					required
					#price="ngModel"
				/>
				<ng-container *ngIf="price.invalid && price.touched">
					<span class="error-span">Price is Required</span>
				</ng-container>
			</label>
			<div class="donut-form-radio">
				<p class="donut-form-radio-label">Promo:</p>
				<label>
					<input type="radio" name="promo" required [value]="undefined" [ngModel]="donut.promo" />
					<span>None</span>
				</label>
				<label>
					<input type="radio" name="promo" required="" value="new" [ngModel]="donut.promo" />
					<span>New</span>
				</label>
				<label>
					<input type="radio" name="promo" required value="limited" [ngModel]="donut.promo" />
					<span>Limited</span>
				</label>
			</div>
			<label>
				<span>Icon Select</span>
				<select
					name="icon"
					class="input input--select"
					required
					[ngModel]="donut.icon"
					#icon="ngModel"
				>
					<!-- <option [ngValue]="null" disabled>Icons</option> -->
					<option *ngFor="let icon of icons" [ngValue]="icon">{{ icon }}</option>
				</select>
				<ng-container *ngIf="icon.invalid && icon.touched">
					<span class="error-span">Icon is Required</span>
				</ng-container>
			</label>
			<label>
				<span>Description</span>
				<textarea
					name="description"
					class="input input--textarea"
					required
					minlength="5"
					maxLength="200"
					[ngModel]="donut.description"
					#description="ngModel"
				></textarea>
				<ng-container *ngIf="description.invalid && description.touched">
					<span class="error-span">description is Required</span>
				</ng-container>
			</label>
			<!-- <input name="first" ngModel required #first="ngModel" />
			<input name="last" ngModel />
			<input name="email" ngModel /> -->
			<button *ngIf="!isEdit" type="button" class="btn btn--green" (click)="handleCreate(form)">
				Create
			</button>
			<button
				*ngIf="isEdit"
				type="button"
				class="btn btn--green"
				[disabled]="form.untouched"
				(click)="handleUpdate(form)"
			>
				Update
			</button>
			<button *ngIf="isEdit" type="button" class="btn btn--green" (click)="handleDelete()">
				Delete
			</button>
			<button
				*ngIf="form.touched || isEdit"
				type="button"
				class="btn btn--gray"
				(click)="form.resetForm({ name: 'reset value' })"
			>
				Reset
			</button>
		</form>
		<ng-template #loadingString>Loading...</ng-template>

		<!-- <p>First name value: {{ first.value }}</p>
		<p>First name valid: {{ first.valid }}</p> -->
		<!-- <p>Form value: {{ form.value | json }}</p>
		<p>Donut value: {{ donut | json }}</p>
		<p>Form valid: {{ form.valid }}</p> -->
	`,
	styles: [
		`
			form {
				margin-bottom: 30px;
				label {
					position: relative;
					margin-bottom: 35px;
					.error-span {
						font-size: 14px;
						position: absolute;
						color: tomato;
						bottom: -30px;
						left: 0;
					}
				}
			}
			.donut-form-radio {
				display: flex;
				gap: 10px;
				align-content: center;
				label {
					display: flex;

					align-items: center;
					gap: 5px;

					span {
						color: #444;
					}
				}
			}
			.input.ng-invalid.ng-touched {
				border: 2px solid tomato;
				background: #ffebeb;
			}
		`,
	],
})
export class DonutFormComponent {
	@Input() donut!: Donut;
	@Input() isEdit!: boolean;

	@Output() create = new EventEmitter<Donut>();
	@Output() update = new EventEmitter<Donut>();
	@Output() delete = new EventEmitter<Donut>();

	icons: string[] = [
		'caramel-swirl',
		'glazed-fudge',
		'just-chocolate',
		'sour-supreme',
		'strawberry-glaze',
		'vanilla-sundae',
		'zesty-lemon',
	];
	constructor() {}

	ngOnInit(): void {
		// console.log(this.donut);
	}

	handleCreate(f: NgForm) {
		if (f.valid) {
			this.create.emit(f.value);
		} else {
			f.form.markAllAsTouched();
		}
	}
	handleUpdate(f: NgForm) {
		if (f.valid) {
			this.update.emit({ id: this.donut.id, ...f.value });
		} else {
			f.form.markAllAsTouched();
		}
	}
	handleDelete() {
		if (confirm(`Really delete ${this.donut.name}`)) {
			this.delete.emit({ ...this.donut });
		}
	}
}
