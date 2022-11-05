import { ProductStore } from '../../models/product';
import { Product } from '../../types/product';
const store = new ProductStore();

const product: Product = {
	name: 'product',
	price: 100,
	category: 'category',
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
		product_id = result?.id ?? 2;
		expect(result).toEqual({ ...product, id: product_id });
	});

	it('index method should return a list of products', async () => {
		const result = await store.index();
		expect(result).toEqual([{ ...product, id: product_id }]);
	});

	it('show method should return the correct product', async () => {
		const result = await store.show(product_id.toString());
		expect(result).toEqual({ ...product, id: product_id });
	});

	it('delete method should remove the product', async () => {
		await store.delete(product_id.toString());
		const result = await store.index();

		expect(result).toEqual([]);
	});
});
