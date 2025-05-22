import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh] text-center"
    >
      <ApperIcon name="PawPrint" className="h-20 w-20 text-primary mb-6" />
      
      <h1 className="text-4xl font-bold mb-3">404 - Page Not Found</h1>
      
      <p className="text-surface-600 dark:text-surface-300 mb-8 max-w-md">
        Oops! It seems this page has wandered off. Let's get you back to the quiz.
      </p>
      
      <Link 
        to="/"
        className="btn-primary flex items-center gap-2"
      >
        <ApperIcon name="Home" className="h-5 w-5" />
        Go to Homepage
      </Link>
    </motion.div>
  );
};

export default NotFound;