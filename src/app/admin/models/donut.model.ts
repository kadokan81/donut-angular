export interface Donut {
	id?: string;
	name: string;
	icon: string;
	price: number;
	description: string;
	promo?: 'new' | 'limited';
}

export interface ErrorServer {
	status: number;
	statusText: string;
	url: string;
	ok: boolean;
	name: string;
	message: string;
}
