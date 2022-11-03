export type OrdersInUser = {
	product_name: string;
	order_id: number;
	quantity: number;
	status: string;
};

export type ProductsInOrders = {
	name: string;
	price: number;
	order_id: number;
};
