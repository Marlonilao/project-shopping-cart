import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useLocation } from 'react-router';
import NavBar from './NavBar';
import { renderWithRouter } from '../test/test-utils';

function LocationDisplay() {
  const location = useLocation();
  return (
    <div data-testid='location'>
      {location.pathname}
      {location.search}
    </div>
  );
}

describe('NavBar', () => {
  it('renders store name and navigation links', () => {
    renderWithRouter(<NavBar cartNumber={0} />);

    expect(screen.getByRole('link', { name: 'Fake Store' })).toHaveAttribute('href', '/');
    expect(screen.getAllByRole('link', { name: 'Shop All' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Clothes' }).length).toBeGreaterThan(0);
  });

  it('shows cart badge when cart has items', () => {
    renderWithRouter(<NavBar cartNumber={3} />);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('hides cart badge when cart is empty', () => {
    renderWithRouter(<NavBar cartNumber={0} />);

    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('navigates to shop with search query', async () => {
    const user = userEvent.setup();

    renderWithRouter(
      <>
        <LocationDisplay />
        <NavBar cartNumber={0} />
      </>,
    );

    await user.type(screen.getByPlaceholderText('Search'), 'shirt');

    expect(screen.getByTestId('location')).toHaveTextContent('/shop?search=shirt&page=1');
  });
});
