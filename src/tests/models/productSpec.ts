import { ProductStore } from '../../models/product';
import { Product } from '../../types/product';
const store = new ProductStore();

const product: Product = {
	name: 'product',
	price: 100,
	category: 'category',
};

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
		const result = await store.create({
			name: 'product',
			price: 100,
			category: 'category',
		});
		expect(result).toEqual({ ...product, id: 2 });
	});

	it('index method should return a list of products', async () => {
		const result = await store.index();
		expect(result).toEqual([{ ...product, id: 2 }]);
	});

	it('show method should return the correct product', async () => {
		const result = await store.show('2');
		expect(result).toEqual({ ...product, id: 2 });
	});

	it('delete method should remove the product', async () => {
		await store.delete('2');
		const result = await store.index();

		expect(result).toEqual([]);
	});
});
