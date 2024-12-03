import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import theme from './theme/theme.tsx';
import { ThemeModeProvider } from './contexts/ThemeModeContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeModeProvider>
        <App />
      </ThemeModeProvider>
    </ThemeProvider>
  </StrictMode>
);
