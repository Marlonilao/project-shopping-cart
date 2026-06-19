import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import App from './App';
import HomePage from './components/HomePage';
import ErrorPage from './components/ErrorPage';
import { createMockProduct } from './test/test-utils';

describe('App', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loading state while fetching products', () => {
    vi.spyOn(globalThis, 'fetch').mockReturnValue(new Promise(() => {}));

    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <App />,
          children: [{ index: true, element: <HomePage /> }],
        },
      ],
      { initialEntries: ['/'] },
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state when fetch fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <App />,
          children: [{ index: true, element: <HomePage /> }],
        },
      ],
      { initialEntries: ['/'] },
    );

    render(<RouterProvider router={router} />);

    expect(await screen.findByText('Error: Network error')).toBeInTheDocument();
  });

  it('renders the app when products load successfully', async () => {
    const product = createMockProduct({ id: 1, title: 'Loaded Product' });

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [product],
    } as Response);

    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <App />,
          errorElement: <ErrorPage />,
          children: [{ index: true, element: <HomePage /> }],
        },
      ],
      { initialEntries: ['/'] },
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Fake Store' })).toBeInTheDocument();
    });
    expect(screen.getByRole('heading', { name: 'Loaded Product' })).toBeInTheDocument();
  });
});
