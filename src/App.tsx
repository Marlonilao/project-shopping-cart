import NavBar from './components/NavBar';
import { Outlet } from 'react-router';
import { useState } from 'react';

const App = () => {
  const [items, setItems] = useState<string[]>([]);

  return (
    <div>
      <NavBar cartNumber={items.length} />
      <Outlet />
    </div>
  );
};

export default App;
