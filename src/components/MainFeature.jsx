import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';

// Sample data of dog breeds with images
// Function to convert breed names to API-compatible paths
const getBreedPath = (breed) => {
  // Special cases mapping for breeds that have specific API paths
  // This maps display names to the API path structure
  if (breedPathMap[breed]) {
    return breedPathMap[breed];
  }
  
  // Default fallback if not in mapping
  return breed.toLowerCase().replace(/\s+/g, '/');
};

// Mapping for breed display names to API paths
const breedPathMap = {
  "Affenpinscher": "affenpinscher",
  "Afghan Hound": "hound/afghan",
  "African Hunting Dog": "african",
  "Airedale Terrier": "terrier/airedale",
  "Akbash Dog": "akbash",
  "Akita": "akita",
  "Alapaha Blue Blood Bulldog": "bulldog/alapaha",
  "Alaskan Husky": "husky/alaskan",
  "Alaskan Malamute": "malamute",
  "American Bulldog": "bulldog/american",
  "American Bully": "bully/american",
  "American Eskimo Dog": "eskimo",
  "American Foxhound": "foxhound/american",
  "American Pit Bull Terrier": "pitbull",
  "American Staffordshire Terrier": "terrier/american",
  "American Water Spaniel": "spaniel/american",
  "Anatolian Shepherd Dog": "shepherd/anatolian",
  "Appenzeller Sennenhund": "appenzeller",
  "Australian Cattle Dog": "cattledog/australian",
  "Australian Kelpie": "kelpie",
  "Australian Shepherd": "australian/shepherd",
  "Australian Terrier": "terrier/australian",
  "Azawakh": "azawakh",
  "Barbet": "barbet",
  "Basenji": "basenji",
  "Basset Bleu de Gascogne": "basset/bleu",
  "Basset Hound": "basset",
  "Beagle": "beagle",
  "Bearded Collie": "collie/bearded",
  "Beauceron": "beauceron",
  "Bedlington Terrier": "terrier/bedlington",
  "Belgian Malinois": "malinois",
  "Belgian Sheepdog": "sheepdog/belgian",
  "Belgian Tervuren": "tervuren",
  "Bernese Mountain Dog": "mountain/bernese",
  "Bichon Frise": "bichon",
  "Black and Tan Coonhound": "coonhound/black",
  "Bloodhound": "bloodhound",
  "Bluetick Coonhound": "coonhound/bluetick",
  "Boerboel": "boerboel",
  "Border Collie": "collie/border",
  "Border Terrier": "terrier/border",
  "Borzoi": "borzoi",
  "Boston Terrier": "terrier/boston",
  "Bouvier des Flandres": "bouvier",
  "Boxer": "boxer",
  "Boykin Spaniel": "spaniel/boykin",
  "Bracco Italiano": "bracco",
  "Briard": "briard",
  "Brittany": "brittany",
  "Brussels Griffon": "griffon/brussels",
  "Bull Terrier": "terrier/bull",
  "Bulldog": "bulldog/english",
  "Bullmastiff": "bullmastiff",
  "Cairn Terrier": "terrier/cairn",
  "Canaan Dog": "canaan",
  "Cane Corso": "corso",
  "Cardigan Welsh Corgi": "corgi/cardigan",
  "Catahoula Leopard Dog": "catahoula",
  "Caucasian Shepherd": "shepherd/caucasian",
  "Cavalier King Charles Spaniel": "spaniel/cavalier",
  "Chesapeake Bay Retriever": "retriever/chesapeake",
  "Chihuahua": "chihuahua",
  "Chinese Crested": "crested",
  "Chinese Shar-Pei": "sharpei",
  "Chow Chow": "chow",
  "Clumber Spaniel": "spaniel/clumber",
  "Cocker Spaniel": "spaniel/cocker",
  "Collie": "collie",
  "Coton de Tulear": "cotondetulear",
  "Dachshund": "dachshund",
  "Dalmatian": "dalmatian",
  "Dandie Dinmont Terrier": "terrier/dandie",
  "Doberman Pinscher": "doberman",
  "Dogo Argentino": "dogo",
  "Dutch Shepherd": "shepherd/dutch",
  "English Cocker Spaniel": "spaniel/english",
  "English Foxhound": "foxhound/english",
  "English Setter": "setter/english",
  "English Springer Spaniel": "spaniel/springer",
  "English Toy Terrier": "terrier/toy",
  "Entlebucher Mountain Dog": "entlebucher",
  "Eskimo Dog": "eskimo",
  "Estrela Mountain Dog": "mountain/estrela",
  "Eurasier": "eurasier",
  "Field Spaniel": "spaniel/field",
  "Finnish Lapphund": "lapphund/finnish",
  "Finnish Spitz": "spitz/finnish",
  "Flat-Coated Retriever": "retriever/flatcoated",
  "French Bulldog": "bulldog/french",
  "German Pinscher": "pinscher/german",
  "German Shepherd": "germanshepherd",
  "German Shorthaired Pointer": "pointer/germanhaired",
  "German Wirehaired Pointer": "pointer/germanwirehaired",
  "Giant Schnauzer": "schnauzer/giant",
  "Glen of Imaal Terrier": "terrier/glen",
  "Golden Retriever": "retriever/golden",
  "Gordon Setter": "setter/gordon",
  "Great Dane": "dane/great",
  "Great Pyrenees": "pyrenees",
  "Greater Swiss Mountain Dog": "mountain/swiss",
  "Greyhound": "greyhound",
  "Harrier": "harrier",
  "Havanese": "havanese",
  "Ibizan Hound": "hound/ibizan",
  "Icelandic Sheepdog": "sheepdog/icelandic",
  "Irish Red and White Setter": "setter/irish",
  "Irish Setter": "setter/irish",
  "Irish Terrier": "terrier/irish",
  "Irish Water Spaniel": "spaniel/irish",
  "Irish Wolfhound": "wolfhound/irish",
  "Italian Greyhound": "greyhound/italian",
  "Jack Russell Terrier": "terrier/russell",
  "Japanese Chin": "chin/japanese",
  "Japanese Spitz": "spitz/japanese",
  "Keeshond": "keeshond",
  "Kerry Blue Terrier": "terrier/kerryblue",
  "Komondor": "komondor",
  "Kuvasz": "kuvasz",
  "Labrador Retriever": "labrador",
  "Lakeland Terrier": "terrier/lakeland",
  "Lancashire Heeler": "heeler/lancashire",
  "Leonberger": "leonberg",
  "Lhasa Apso": "lhasa",
  "Löwchen": "lowchen",
  "Maltese": "maltese",
  "Manchester Terrier": "terrier/manchester",
  "Maremma Sheepdog": "sheepdog/maremma",
  "Mastiff": "mastiff",
  "Miniature Bull Terrier": "terrier/miniature",
  "Miniature Pinscher": "pinscher",
  "Miniature Schnauzer": "schnauzer/miniature",
  "Newfoundland": "newfoundland",
  "Norfolk Terrier": "terrier/norfolk",
  "Norwegian Buhund": "buhund/norwegian",
  "Norwegian Elkhound": "elkhound/norwegian",
  "Norwegian Lundehund": "lundehund",
  "Norwich Terrier": "terrier/norwich",
  "Nova Scotia Duck Tolling Retriever": "retriever/duck",
  "Old English Sheepdog": "sheepdog/english",
  "Otterhound": "otterhound",
  "Papillon": "papillon",
  "Parson Russell Terrier": "terrier/parson",
  "Pekingese": "pekingese",
  "Pembroke Welsh Corgi": "corgi/pembroke",
  "Petit Basset Griffon Vendéen": "basset/griffon",
  "Pharaoh Hound": "hound/pharaoh",
  "Plott Hound": "hound/plott",
  "Pointer": "pointer",
  "Polish Lowland Sheepdog": "sheepdog/polish",
  "Pomeranian": "pomeranian",
  "Poodle (Miniature)": "poodle/miniature",
  "Poodle (Standard)": "poodle/standard",
  "Poodle (Toy)": "poodle/toy",
  "Portuguese Water Dog": "waterdog/portuguese",
  "Pug": "pug",
  "Puli": "puli",
  "Pumi": "pumi",
  "Rat Terrier": "terrier/rat",
  "Redbone Coonhound": "coonhound/redbone",
  "Rhodesian Ridgeback": "ridgeback/rhodesian",
  "Rottweiler": "rottweiler",
  "Saint Bernard": "stbernard",
  "Saluki": "saluki",
  "Samoyed": "samoyed",
  "Schipperke": "schipperke",
  "Scottish Deerhound": "deerhound/scottish",
  "Scottish Terrier": "terrier/scottish",
  "Sealyham Terrier": "terrier/sealyham",
  "Shetland Sheepdog": "sheepdog/shetland",
  "Shiba Inu": "shiba",
  "Shih Tzu": "shihtzu",
  "Siberian Husky": "husky",
  "Silky Terrier": "terrier/silky",
  "Skye Terrier": "terrier/skye",
  "Sloughi": "sloughi",
  "Smooth Fox Terrier": "terrier/fox",
  "Soft-coated Wheaten Terrier": "terrier/wheaten",
  "Spanish Water Dog": "waterdog/spanish",
  "Spinone Italiano": "spinone",
  "Staffordshire Bull Terrier": "bullterrier/staffordshire",
  "Standard Schnauzer": "schnauzer/standard",
  "Sussex Spaniel": "spaniel/sussex",
  "Swedish Vallhund": "vallhund/swedish",
  "Thai Ridgeback": "ridgeback/thai",
  "Tibetan Mastiff": "mastiff/tibetan",
  "Tibetan Spaniel": "spaniel/tibetan",
  "Tibetan Terrier": "terrier/tibetan",
  "Toy Fox Terrier": "terrier/toy",
  "Treeing Walker Coonhound": "coonhound/walker",
  "Vizsla": "vizsla",
  "Weimaraner": "weimaraner",
  "Welsh Springer Spaniel": "spaniel/welsh",
  "Welsh Terrier": "terrier/welsh",
  "West Highland White Terrier": "terrier/westhighland",
  "Whippet": "whippet",
  "Wire Fox Terrier": "terrier/wire",
  "Wirehaired Pointing Griffon": "griffon/wirehaired",
  "Wirehaired Vizsla": "vizsla/wirehaired",
  "Xoloitzcuintli": "mexicanhairless",
  "Yorkshire Terrier": "terrier/yorkshire"
};

// Create a dataset of 200 dog breeds with proper image URLs
const dogData = Object.keys(breedPathMap).slice(0, 200).map((breed, index) => {
  const breedPath = getBreedPath(breed);
  return {
    id: index + 1,
    breed: breed,
    imageUrl: `https://dog.ceo/api/breed/${breedPath}/images/random`
  };
});

// More dog breeds for options
// Use the rest of the breeds as additional options
const additionalBreeds = Object.keys(breedPathMap).map(breed => breed);

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
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [retryCount, setRetryCount] = useState(0);

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
        .filter(breed => breed !== dog.breed) // Remove correct answer
        .sort(() => Math.random() - 0.5) // Shuffle options
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
    setCurrentImageUrl('');
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
      setCurrentImageUrl('');
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

  // Fetch dog image when question changes
  useEffect(() => {
    if (!quizActive || quizCompleted || !questions.length) return;
    
    const fetchDogImage = async () => {
      try {
        const currentQuestion = questions[currentQuestionIndex];
        if (!currentQuestion) return;
        
        setImageLoaded(false);
        setImageError(false);
        setRetryCount(0);
        
        // Ensure we're using the correct API path for the breed
        const breedPath = getBreedPath(currentQuestion.breed);
        const apiUrl = `https://dog.ceo/api/breed/${breedPath}/images/random`;
        
        // Try to fetch from the breed-specific endpoint
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          
          if (data.status === "success" && data.message) {
            // Validate the image URL contains the expected breed path
            const imageUrl = data.message;
            const breedPathLower = breedPath.toLowerCase().replace(/\s+/g, '');
            
            if (imageUrl.includes(breedPathLower.replace('/', '-')) || 
                imageUrl.includes(breedPathLower)) {
              setCurrentImageUrl(imageUrl);
              return;
            }
          }
          
          // If we got here, the API returned success but the image URL doesn't match the breed
          // Fall back to the original endpoint in dogData
          const backupResponse = await fetch(currentQuestion.imageUrl);
          const backupData = await backupResponse.json();
          
          if (backupData.status === "success" && backupData.message) {
            setCurrentImageUrl(backupData.message);
          } else {
            throw new Error("Invalid image data");
          }
        } catch (innerError) {
          console.error("Error fetching breed-specific image:", innerError.message);
          throw innerError; // Let outer catch handle fallback
        }
      } catch (error) {
        console.error("Error fetching dog image:", error);
        setImageError(true);
        toast.error("Failed to load dog image. Please try again.");
      }
    };

    fetchDogImage();
  }, [currentQuestionIndex, questions, quizActive, quizCompleted]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    if (retryCount < 3) {
      // Try a fallback using a different breed-specific source
      if (questions[currentQuestionIndex]) {
        const breed = questions[currentQuestionIndex].breed;
        const breedForUrl = breed.toLowerCase().replace(/\s+/g, '-');
        // Try to use a breed-specific fallback image
        setCurrentImageUrl(`https://images.dog.ceo/breeds/${getBreedPath(breed).replace('/', '-')}/n02100735_4097.jpg`);
      } else {
        setCurrentImageUrl(`https://placedog.net/500/280?r=${Math.random()}`);
      }
      setRetryCount(prev => prev + 1);
    } else {
      setImageError(true);
      toast.error("Image failed to load. Please continue with the quiz.");
    }
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
            <div className="relative w-full h-64 sm:h-80 md:h-96 mb-6 rounded-xl overflow-hidden bg-surface-100 dark:bg-surface-800 flex items-center justify-center shadow-card">
              {(!imageLoaded && !imageError) && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              )}  
              
              {imageError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-surface-500 dark:text-surface-400 z-10 bg-surface-200/50 dark:bg-surface-700/50 backdrop-blur-sm">
                  <ApperIcon name="ImageOff" className="h-10 w-10 mb-2" />
                  <p>Image not available</p>
                </div>
              )}
              
              <img
                src={currentImageUrl || ''}
                alt="Dog breed"
                className={`w-full h-full object-cover object-center transition-all duration-500 ${imageLoaded && !imageError ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
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