import {
	createProduct,
	deleteProduct,
	indexProduct,
	showProduct,
	updateProduct,
	currentOrders,
} from '../../handlers/orders_products';

describe('Order Handler', () => {
	it('should have an indexProduct method', () => {
		expect(indexProduct).toBeDefined();
	});
	it('should have a currentOrders method', () => {
		expect(currentOrders).toBeDefined();
	});
	it('should have a createProduct method', () => {
		expect(createProduct).toBeDefined();
	});
	it('should have a deleteProduct method', () => {
		expect(deleteProduct).toBeDefined();
	});
	it('should have a deleteProduct method', () => {
		expect(deleteProduct).toBeDefined();
	});
	it('should have a showProduct method', () => {
		expect(showProduct).toBeDefined();
	});
	it('should have a updateProduct method', () => {
		expect(updateProduct).toBeDefined();
	});
});
