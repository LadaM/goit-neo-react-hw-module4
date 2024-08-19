import SearchBar from './components/SearchBar/SearchBar.jsx';
import { useEffect, useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);
  return (
    <>
      <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
    </>
  )
}

export default App
