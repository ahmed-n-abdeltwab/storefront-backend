export type Order = {
	id?: number;
	user_id: number;
	completed: boolean;
};

export type OrderProduct = {
	id?: number;
	order_id?: number;
	product_id?: number;
	quantity: number;
};

export type CurrentOrders = {
	id?: number;
	quantity: number;
	name: string;
	price: string;
	category: string;
	description?: string;
};
