import { ProductStore } from '../../models/index';
import { Product } from '../../types/index';
const store = new ProductStore();

const product: Product = {
	name: 'product',
	price: '100',
	category: 'category',
	description: 'description',
};
let product_id: number;

describe('Product Model', () => {
	it('should have an index method', () => {
		expect(store.index).toBeDefined();
	});

	it('should have a show method', () => {
		expect(store.show).toBeDefined();
	});

	it('should have a create method', () => {
		expect(store.create).toBeDefined();
	});

	it('should have a delete method', () => {
		expect(store.delete).toBeDefined();
	});

	it('create method should add a product', async () => {
		const result = await store.create(product);
		product.id = product_id = result?.id as number;
		expect(result).toEqual(product);
	});

	it('create method should add a product', async () => {
		const result = await store.update(product);
		expect(result).toEqual(product);
	});

	it('index method should return a list of products', async () => {
		const result = await store.index();
		expect(result).toContain(product);
	});

	it('show method should return the correct product', async () => {
		const result = await store.show(product_id.toString());
		expect(result).toEqual(product);
	});

	it('delete method should remove the product', async () => {
		const result = await store.delete(product_id.toString());
		expect(result).toEqual(product);
	});
});
