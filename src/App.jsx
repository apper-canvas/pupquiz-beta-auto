import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import ApperIcon from './components/ApperIcon';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white dark:bg-surface-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-full p-2">
              <ApperIcon name="Paw" className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              PupQuiz
            </h1>
          </div>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <ApperIcon name="Sun" className="h-5 w-5" />
            ) : (
              <ApperIcon name="Moon" className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="bg-white dark:bg-surface-800 py-4 border-t border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 text-center text-surface-500 dark:text-surface-400 text-sm">
          © {new Date().getFullYear()} PupQuiz - Learn about dog breeds in a fun way!
        </div>
      </footer>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}

export default App;