import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppDemo from './AppDemo.tsx';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store';

import theme from './theme/theme.tsx';
import { ThemeModeProvider } from './contexts/ThemeModeContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeModeProvider>
          <AppDemo />
        </ThemeModeProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
