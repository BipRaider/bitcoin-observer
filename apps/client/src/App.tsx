import { Suspense } from 'react';
import { BrowserRouter, Routes as Switch, Navigate, Route } from 'react-router-dom';
import cn from 'classnames';

import styles from './App.module.css';
import { Navbar, MainPage } from './components';

function App() {
  return (
    <div className={cn('grid w-full min-h-screen gap-3', styles.wrap)}>
      <Suspense>
        <header className={cn(styles.header, 'h-full')}>
          <Navbar />
        </header>

        <BrowserRouter>
          <main className={cn(styles.main, 'h-full')}>
            <Suspense fallback={'Loading...'} />
            <Switch>
              <Route path="/" element={<MainPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Switch>
          </main>
        </BrowserRouter>

        <footer
          className={cn(
            styles.footer,
            'bg-white rounded-lg shadow  dark:bg-gray-800',
            'w-full mb-2',
          )}
        >
          <div className="w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023 . All Rights Reserved.
            </span>
          </div>
        </footer>
      </Suspense>
    </div>
  );
}

export default App;
