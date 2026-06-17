import NavBar from './components/NavBar';
import { Outlet } from 'react-router';
import { useState, useEffect } from 'react';
import type { Product } from './types.ts';
import Footer from './Footer';

const App = () => {
  const [data, setData] = useState<Product[]>([]);
  const [userCart, setUserCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(
          'https://api.escuelajs.co/api/v1/products',
        );

        if (!response.ok) {
          throw new Error(`HTTP error: status ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return; // Ignore abort errors from cleanup
        }

        let errorMessage = 'An unexpected error occurred';

        if (error instanceof Error) {
          errorMessage = error.message;
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <NavBar cartNumber={userCart.length} />
      <Outlet context={data} />
      <Footer />
    </div>
  );
};

export default App;
