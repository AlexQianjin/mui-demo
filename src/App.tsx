import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Search from './components/Search';
import { ThemeToggle } from './components/ThemeToggle';
import { Card } from './components/Card';

import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { cn, TimePeriod } from './lib/utils';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
dayjs.extend(advancedFormat);
dayjs.extend(duration);
dayjs.extend(utc);

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

function testTotalDuration() {
  const starts: number[] = [1555448042, 1555445266, 1555442823, 1555442419, 1555442385, 1555442011, 1555442003, 1555440982];
  const ends: number[] = [1555448052, 1555445271, 1555445210, 1555442822, 1555442419, 1555442385, 1555442011, 1555442003];

  const timePeriods: TimePeriod[] = [];
  for (let i: number = 0; i < starts.length; i = i + 1) {
    timePeriods.push({
      start: starts[i],
      end: ends[i]
    });
  }
}

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

  testTotalDuration();

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
      <h1>Vite + React {dayjs('2012-05-28 10:21:15').format('X')}</h1>
      <p>{dayjs().toString()}</p>
      <p>{dayjs().format('YYYY-MM-DD,HH-mm')}</p>
      <p>{dayjs().subtract(7, 'year').format('YYYY-MM-DDTHH:mm')}</p>
      <div className='break-all bg-white p-6 text-light-gray-text'>
        Mass spectrometers and other related analytical techniques have continued to improve at a rapid pace over the past few decades. At
        Bioinformatics Solutions Inc. (BSI), we understand how important it is for researchers to have software that is up to date and can
        handle the continuously improving data outputs. BSI is best known in the proteomics research community for the development of the
        software; PEAKS. PEAKS is used to identify and quantify proteins in very complex biological samples with LC-MS. At BSI, our group is
        continually involved in research and the advancement of our algorithms to provide solutions to facilitate the understanding of life
        sciences and are designed to elucidate important biological questions. As an instrument vendor neutral company, BSI works directly
        with each vendor to ensure accurate results and to maximise the information extracted from the raw mass spectrometry data. In
        addition, we closely collaborate with our users and experts worldwide. This allows us to simultaneously help them with their
        research and their input helps shape future PEAKS products to continue to improve the solution that can be provided. See BSI
        Publications for more information on algorithms underlying our software and applications.
      </div>
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
        <div className='min-h-screen bg-gray-100 transition-colors dark:bg-gray-900'>
          <div className='container mx-auto px-4 py-8'>
            <div className='mb-8 flex items-center justify-between'>
              <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>Theme Switcher Demo</h1>
              <ThemeToggle />
            </div>

            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              <Card
                title='Understanding Context'
                content='React Context provides a way to pass data through the component tree without having to pass props manually at every level.'
              />
              <Card
                title='When to Use Context'
                content="Context is designed to share data that can be considered 'global' for a tree of React components, such as the current theme."
              />
              <Card
                title='Context vs Props'
                content='For many applications, Context is a good way to share values like these between components without explicitly passing a prop through every level of the tree.'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
