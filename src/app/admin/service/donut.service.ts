import { Donut, ErrorServer } from './../models/donut.model';
import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
	Observable,
	catchError,
	delay,
	map,
	of,
	retry,
	tap,
	throwError,
	retryWhen,
	delayWhen,
	timer,
	take,
} from 'rxjs';

@Injectable()
// 	{
// 	providedIn: 'root',
// }
export class DonutService {
	private donuts: Donut[] = [];

	constructor(private http: HttpClient) {}

	getData() {}

	read() {
		if (this.donuts.length) {
			return of(this.donuts);
		}
		const maxRetries = 3;
		const retryDelay = 4000;
		let headers = new HttpHeaders({
			'Content-type': 'application/json',
		}).append('Api-Token', '1s4c5h7n');

		const options = {
			headers,
		};

		return this.http.get<Donut[]>(`/api/donuts`, options).pipe(
			tap((donuts) => {
				this.donuts = donuts;
			}),
			// retryWhen((errors) => errors.pipe(delay(1000), take(2))),
			retry(maxRetries), // Retry the request up to 'maxRetries' times
			delay(retryDelay),
			catchError(this.handleError)
		);
	}

	readOne(id: string | null) {
		return this.read().pipe(
			map((donuts) => {
				const donut = donuts.find((donut: Donut) => donut.id === id);

				if (donut) {
					return donut;
				}
				return {
					name: '',
					price: 0,
					description: '',
					icon: '',
				};
			})
		);
	}
	addNewDonut(payload: Donut) {
		return this.http.post<Donut>('/api/donuts', payload).pipe(
			tap((donut) => {
				this.donuts = [...this.donuts, donut];
			})
		);
		// this.donuts.push(payload);
		// this.donuts = [...this.donuts, payload];
	}
	updateExistingDonut(data: Donut) {
		return this.http.put<Donut>(`/api/donuts/${data.id}`, data).pipe(
			tap((donut) => {
				this.donuts = this.donuts.map((d) => (d.id === donut.id ? donut : d));
			})
		);
	}
	delete(data: Donut) {
		return this.http.delete<Donut>(`/api/donuts/${data.id}`).pipe(
			tap((donut) => {
				this.donuts = this.donuts.filter((d) => d.id !== data.id);
			}),
			catchError(this.handleError)
		);
	}
	private handleError(err: HttpErrorResponse) {
		if (err.error instanceof ErrorEvent) {
			//client-side
			console.warn('Client', err.message);
		} else {
			//server-side
			console.warn('Server', err.status);
		}
		return throwError(() => new Error(err.statusText));
	}
}
