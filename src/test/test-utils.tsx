import type { ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router';
import type { Product } from '../types';

export const createMockProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'A test product',
  slug: 'test-product',
  images: ['https://example.com/image.jpg'],
  category: {
    id: 1,
    name: 'Clothes',
    slug: 'clothes',
    image: 'https://example.com/category.jpg',
  },
  ...overrides,
});

export const mockProducts: Product[] = [
  createMockProduct({
    id: 1,
    title: 'Blue Shirt',
    price: 20,
    category: { id: 1, name: 'Clothes', slug: 'clothes', image: '' },
  }),
  createMockProduct({
    id: 2,
    title: 'Laptop',
    price: 500,
    category: { id: 2, name: 'Electronics', slug: 'electronics', image: '' },
  }),
  createMockProduct({
    id: 3,
    title: 'Desk Chair',
    price: 150,
    category: { id: 3, name: 'Furniture', slug: 'furniture', image: '' },
  }),
  createMockProduct({
    id: 4,
    title: 'Running Shoes',
    price: 80,
    category: { id: 4, name: 'Shoes', slug: 'shoes', image: '' },
  }),
  createMockProduct({
    id: 5,
    title: 'Water Bottle',
    price: 15,
    category: {
      id: 5,
      name: 'Miscellaneous',
      slug: 'miscellaneous',
      image: '',
    },
  }),
];

export interface OutletContext {
  data: Product[];
  addToCart: (product: Product) => void;
  userCart: Product[];
  removeFromCart: (product: Product) => void;
}

export const defaultOutletContext: OutletContext = {
  data: mockProducts,
  addToCart: vi.fn(),
  userCart: [],
  removeFromCart: vi.fn(),
};

function OutletLayout({ context }: { context: OutletContext }) {
  return <Outlet context={context} />;
}

export function renderWithOutletContext(
  ui: ReactElement,
  {
    route = '/',
    context = defaultOutletContext,
    ...renderOptions
  }: { route?: string; context?: OutletContext } & RenderOptions = {},
) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path='/' element={<OutletLayout context={context} />}>
          <Route index element={ui} />
        </Route>
        <Route path='/shop' element={<OutletLayout context={context} />}>
          <Route index element={ui} />
        </Route>
        <Route path='/shop/:category' element={<OutletLayout context={context} />}>
          <Route index element={ui} />
        </Route>
        <Route path='/cart' element={<OutletLayout context={context} />}>
          <Route index element={ui} />
        </Route>
      </Routes>
    </MemoryRouter>,
    renderOptions,
  );
}

export function renderWithRouter(
  ui: ReactElement,
  { route = '/' }: { route?: string } = {},
) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}
