import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	standalone: true,
	imports: [RouterModule],
	selector: 'app-root',
	template: `
		<div class="app">
			<header class="header">
				<img src="/assets/img/logo.svg" alt="Ultimate Donuts" class="logo" />
			</header>
			<router-outlet></router-outlet>
		</div>
	`,
	styles: [
		`
			.app {
				background: #fff;
				border-radius: 8px;
				max-width: 94%;
				margin: 25px auto;
				padding: 25px;
				font-size: 22px;
				text-align: center;
				border: 4px solid #ef9fc7;
			}
			.header {
				display: flex;
				justify-content: center;
				margin-bottom: 25px;
			}
			.logo {
				width: 100px;
				height: 88px;
			}
		`,
	],
})
export class AppComponent implements OnInit {
	message!: string;

	newMessage!: number;

	constructor() {}

	ngOnInit() {
		this.message = 'Hello from Alex';
	}

	handleClick(event: MouseEvent) {
		console.log(event);
	}
	handleInput(event: Event) {
		const { value } = event.target as HTMLInputElement;
		if (this.message.length > 5) {
			this.message = 'To long';
		}
		this.message = value;
		console.log('🚀 ~ file: app.component.ts:44 ~ AppComponent ~ handleInput ~ value:', value);
	}
}
