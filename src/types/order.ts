export type Order = {
	id?: number;
	user_id: number;
	isCompleted?: boolean;
};

export type OrderProduct = {
	id?: number;
	order_id: number;
	product_id: number;
	quantity: number;
};

export type CurrentOrders = {
	id: number;
	quantity: number;
	name: string;
	price: number;
	category: string;
	description: string;
};
