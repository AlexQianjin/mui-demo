import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Search from './components/Search';

import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { cn } from './lib/utils';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800]
    })
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: '#1a90ff',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8'
    })
  }
}));

const StrippedLinearProgress = styled(LinearProgress)`
  height: 20px;
  background-color: unset;
`;

function App() {
  const [count, setCount] = useState(0);
  const [percent, setPercent] = useState(0);
  // const progress = useRef(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent(percent => (percent < 100 ? (percent += 5) : 100));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

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
      <h1 className={cn('text-3xl font-bold text-red-600 underline', count === 2 && 'text-blue-500')}>Hello world!</h1>
      <Box>
        <LinearProgress variant='determinate' color='secondary' value={30} />
        <LinearProgress variant='determinate' color='success' value={30} />
        <LinearProgress variant='determinate' color='inherit' value={40} />
      </Box>
      <div className='relative mt-10'>
        <LinearProgress variant='determinate' value={80} className='h-4' />
        <LinearProgress variant='determinate' value={20} className='h-4' sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }} />
      </div>

      <div className='mt-10'>
        <BorderLinearProgress className='relative' variant='determinate' value={50} />
      </div>

      <div className='relative mt-10'>
        <StrippedLinearProgress className='striped-background-red' variant='determinate' value={30} />
        <StrippedLinearProgress
          className='striped-background-green'
          sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
          variant='determinate'
          value={percent}
        />
      </div>
    </>
  );
}

export default App;
