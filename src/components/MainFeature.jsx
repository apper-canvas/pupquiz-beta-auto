import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';

// Sample data of dog breeds with images
const dogData = [
  {
    id: 1,
    breed: "Golden Retriever",
    imageUrl: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1024.jpg",
  },
  {
    id: 2,
    breed: "Dalmatian",
    imageUrl: "https://images.dog.ceo/breeds/dalmatian/n02110341_7645.jpg",
  },
  {
    id: 3,
    breed: "Pug",
    imageUrl: "https://images.dog.ceo/breeds/pug/n02110958_12546.jpg",
  },
  {
    id: 4,
    breed: "Siberian Husky",
    imageUrl: "https://images.dog.ceo/breeds/husky/n02110185_1469.jpg",
  },
  {
    id: 5,
    breed: "Beagle",
    imageUrl: "https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg",
  },
  {
    id: 6,
    breed: "German Shepherd",
    imageUrl: "https://images.dog.ceo/breeds/germanshepherd/n02106662_23986.jpg",
  },
  {
    id: 7,
    breed: "Labrador Retriever",
    imageUrl: "https://images.dog.ceo/breeds/labrador/n02099712_1030.jpg",
  },
  {
    id: 8,
    breed: "Poodle",
    imageUrl: "https://images.dog.ceo/breeds/poodle-standard/n02113799_2061.jpg",
  },
  {
    id: 9,
    breed: "Border Collie",
    imageUrl: "https://images.dog.ceo/breeds/collie-border/n02106166_355.jpg",
  },
  {
    id: 10,
    breed: "Bulldog",
    imageUrl: "https://images.dog.ceo/breeds/bulldog-english/n02108422_1047.jpg",
  }
];

// More dog breeds for options
const additionalBreeds = [
  "Chihuahua", "Boxer", "Great Dane", "Dachshund", "Doberman",
  "Rottweiler", "Shih Tzu", "Corgi", "Pomeranian", "Australian Shepherd",
  "Greyhound", "Bichon Frise", "Akita", "Chow Chow", "Basset Hound",
  "Maltese", "St. Bernard", "Cocker Spaniel", "Bernese Mountain Dog", "Jack Russell Terrier"
];

const MainFeature = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds timer
  const [quizActive, setQuizActive] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Prepare quiz questions
  const prepareQuestions = useCallback(() => {
    // Shuffle the dog data
    const shuffledDogs = [...dogData].sort(() => Math.random() - 0.5);
    // Take first 5 dogs for the quiz
    const selectedDogs = shuffledDogs.slice(0, 5);
    
    // Create questions with options
    const newQuestions = selectedDogs.map(dog => {
      // Get 3 random incorrect options
      const incorrectOptions = [...additionalBreeds, ...dogData.filter(d => d.id !== dog.id).map(d => d.breed)]
        .filter(breed => breed !== dog.breed)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      // All options (correct + incorrect)
      const options = [dog.breed, ...incorrectOptions].sort(() => Math.random() - 0.5);
      
      return {
        ...dog,
        options
      };
    });
    
    return newQuestions;
  }, []);

  // Start the quiz
  const startQuiz = useCallback(() => {
    const newQuestions = prepareQuestions();
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeRemaining(60);
    setQuizActive(true);
    setQuizCompleted(false);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setImageLoaded(false);
    setImageError(false);
  }, [prepareQuestions]);

  // Handle timer
  useEffect(() => {
    let timer;
    if (quizActive && !quizCompleted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setQuizCompleted(true);
            toast.info("Time's up! Quiz completed.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [quizActive, quizCompleted, timeRemaining]);

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    if (showFeedback || !quizActive || quizCompleted) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.breed;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      toast.success("Correct answer!");
    } else {
      toast.error("Incorrect answer!");
    }
    
    // Move to next question after 2 seconds
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      setImageLoaded(false);
      setImageError(false);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setQuizCompleted(true);
        toast.info("Quiz completed!");
      }
    }, 2000);
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = quizActive ? ((currentQuestionIndex) / questions.length) * 100 : 0;

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
    console.log("Image loaded successfully");
  };

  const handleImageError = (e) => {
    setImageError(true);
    setImageLoaded(true);
    console.log("Image failed to load:", e.target.src);
    // Optionally, you could try a fallback image here
    // e.target.src = "/fallback-image-path.jpg";
    toast.error("Image failed to load. Please continue with the quiz.");
  };

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <motion.div 
      className="card w-full max-w-3xl mx-auto overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Quiz Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark p-4 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ApperIcon name="Brain" className="h-5 w-5" />
            Dog Breed Quiz
          </h2>
          
          {quizActive && !quizCompleted && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <ApperIcon name="Trophy" className="h-5 w-5 text-secondary" />
                <span className="font-semibold">Score: {score}/{questions.length}</span>
              </div>
              <div className={`flex items-center gap-1 ${timeRemaining <= 10 ? 'text-red-300 animate-pulse' : ''}`}>
                <ApperIcon name="Clock" className="h-5 w-5" />
                <span className="font-mono font-semibold">{formatTime(timeRemaining)}</span>
              </div>
            </div>
          )}
        </div>
        
        {quizActive && !quizCompleted && (
          <div className="mt-3">
            <div className="w-full bg-white/20 rounded-full h-2.5">
              <div 
                className="bg-secondary h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="mt-1 text-sm text-white/80 text-center">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>
        )}
      </div>

      {/* Quiz Content */}
      <div className="p-5">
        {!quizActive && !quizCompleted && (
          <div className="text-center py-8">
            <ApperIcon name="Dog" className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-3">Welcome to PupQuiz!</h3>
            <p className="text-surface-600 dark:text-surface-300 mb-6 max-w-md mx-auto">
              Test your knowledge of dog breeds with our fun quiz. You'll have 60 seconds to identify as many breeds as possible.
            </p>
            <button 
              onClick={startQuiz}
              className="btn-primary mx-auto flex items-center gap-2"
            >
              <ApperIcon name="Play" className="h-5 w-5" />
              Start Quiz
            </button>
          </div>
        )}

        {quizActive && !quizCompleted && currentQuestion && (
          <div className="py-2">
            {/* Image Container */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 mb-6 rounded-xl overflow-hidden bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              )}
              
              {imageError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-surface-500 dark:text-surface-400 z-10">
                  <ApperIcon name="ImageOff" className="h-10 w-10 mb-2" />
                  <p>Image not available</p>
                </div>
              )}
              
              <img
                src={currentQuestion?.imageUrl || ''}
                alt="Dog breed"
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>

            {/* Question */}
            <h3 className="text-xl font-bold mb-4 text-center">
              What breed is this dog?
            </h3>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showFeedback}
                  className={`
                    p-3 rounded-xl border-2 font-medium transition-all flex items-center justify-between
                    ${selectedAnswer === option && showFeedback 
                      ? (option === currentQuestion.breed 
                        ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:border-green-500 dark:text-green-300' 
                        : 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:border-red-500 dark:text-red-300')
                      : 'border-surface-200 dark:border-surface-700 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10'
                    }
                    ${showFeedback && option === currentQuestion.breed && selectedAnswer !== option 
                      ? 'bg-green-100/50 border-green-500/50 text-green-800 dark:bg-green-900/20 dark:border-green-500/50 dark:text-green-300/70' 
                      : ''
                    }
                  `}
                >
                  <span>{option}</span>
                  {selectedAnswer === option && showFeedback && (
                    option === currentQuestion.breed 
                      ? <ApperIcon name="Check" className="h-5 w-5 text-green-600 dark:text-green-400" />
                      : <ApperIcon name="X" className="h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
                  {showFeedback && option === currentQuestion.breed && selectedAnswer !== option && (
                    <ApperIcon name="Check" className="h-5 w-5 text-green-600/50 dark:text-green-400/50" />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Feedback Message */}
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg text-center mb-4 ${
                  selectedAnswer === currentQuestion.breed
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}
              >
                {selectedAnswer === currentQuestion.breed ? (
                  <p className="font-medium">Correct! This is a {currentQuestion.breed}.</p>
                ) : (
                  <p className="font-medium">Not quite. This is actually a {currentQuestion.breed}.</p>
                )}
              </motion.div>
            )}
          </div>
        )}

        {quizCompleted && (
          <div className="text-center py-8">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <ApperIcon name="Trophy" className="h-12 w-12 text-primary" />
            </div>
            
            <h3 className="text-2xl font-bold mb-3">Quiz Completed!</h3>
            
            <div className="text-4xl font-bold mb-2 text-primary">
              {score}/{questions.length}
            </div>
            
            <p className="text-surface-600 dark:text-surface-300 mb-6">
              {score === questions.length 
                ? "Perfect score! You're a dog breed expert!" 
                : score >= questions.length / 2 
                  ? "Great job! You know your dog breeds well."
                  : "Keep practicing to improve your dog breed knowledge!"}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={startQuiz}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <ApperIcon name="RefreshCw" className="h-5 w-5" />
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MainFeature;