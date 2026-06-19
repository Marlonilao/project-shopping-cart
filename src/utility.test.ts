import { getOneProductPerCategory } from './utility';
import { createMockProduct } from './test/test-utils';

describe('getOneProductPerCategory', () => {
  it('returns one product per category', () => {
    const products = [
      createMockProduct({
        id: 1,
        category: { id: 1, name: 'Clothes', slug: 'clothes', image: '' },
      }),
      createMockProduct({
        id: 2,
        category: { id: 1, name: 'Clothes', slug: 'clothes', image: '' },
      }),
      createMockProduct({
        id: 3,
        category: { id: 2, name: 'Electronics', slug: 'electronics', image: '' },
      }),
    ];

    const result = getOneProductPerCategory(products);

    expect(result).toHaveLength(2);
    expect(result.map((p) => p.id)).toEqual([1, 3]);
  });

  it('returns at most five products', () => {
    const products = Array.from({ length: 8 }, (_, i) =>
      createMockProduct({
        id: i + 1,
        category: {
          id: i + 1,
          name: `Category ${i + 1}`,
          slug: `category-${i + 1}`,
          image: '',
        },
      }),
    );

    expect(getOneProductPerCategory(products)).toHaveLength(5);
  });
});
