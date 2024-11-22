import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Search from './components/Search';

import { Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { cn } from './lib/utils';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
      <Search />
      <Button color='primary'>Primary</Button>
      <Button color='secondary'>Secondary</Button>
      <h1 className={cn('text-3xl font-bold underline text-red-600', count === 2 && 'text-blue-500')}>Hello world!</h1>
      <Box>
        <LinearProgress variant='determinate' color='secondary' value={30} />
        <LinearProgress variant='determinate' color='success' value={30} />
        <LinearProgress variant='determinate' color='inherit' value={40} />
      </Box>
      <div className='relative mt-10'>
        <LinearProgress variant='determinate' value={70} className='h-4' />
        <LinearProgress variant='determinate' value={30} className='h-4' sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }} />
      </div>
    </>
  );
}

export default App;
