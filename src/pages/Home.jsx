import { motion } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import ApperIcon from '../components/ApperIcon';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Test Your Dog Breed Knowledge
          </h1>
          <p className="text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
            Challenge yourself with our fun interactive quiz to identify dog breeds from images. 
            Learn while you play!
          </p>
        </div>

        <MainFeature />

        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="card p-5">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <ApperIcon name="Timer" className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Timed Challenge</h3>
            <p className="text-surface-600 dark:text-surface-400 text-sm">
              Race against the clock with our 60-second quiz format.
            </p>
          </div>
          
          <div className="card p-5">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <ApperIcon name="Image" className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Visual Learning</h3>
            <p className="text-surface-600 dark:text-surface-400 text-sm">
              Identify breeds from high-quality images to improve recognition.
            </p>
          </div>
          
          <div className="card p-5">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <ApperIcon name="Brain" className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Knowledge Building</h3>
            <p className="text-surface-600 dark:text-surface-400 text-sm">
              Learn from mistakes with instant feedback on each answer.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;