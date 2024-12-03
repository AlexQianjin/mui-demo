import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '../contexts/ThemeModeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='rounded-full p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700'
      aria-label='Toggle theme'
    >
      {theme === 'light' ? <LightModeIcon className='h-5 w-5' /> : <DarkModeIcon className='h-5 w-5' />}
    </button>
  );
}
