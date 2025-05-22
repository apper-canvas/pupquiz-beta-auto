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

// Database of dog breed facts
const breedFacts = {
  "Affenpinscher": [
    "Affenpinschers are often called 'monkey dogs' due to their monkey-like expressions.",
    "Despite their small size, Affenpinschers were originally bred to hunt rats.",
    "The Affenpinscher is one of the oldest toy breeds, dating back to the 17th century."
  ],
  "Afghan Hound": [
    "Afghan Hounds are one of the oldest dog breeds, dating back thousands of years.",
    "Their long, silky coat served as protection in the mountainous regions of Afghanistan.",
    "Despite their elegant appearance, Afghan Hounds were bred for hunting large game."
  ],
  "African Hunting Dog": [
    "African Hunting Dogs have a bite force quotient of 142, one of the strongest among canids.",
    "They are highly social pack animals with a unique hierarchical structure.",
    "They have a hunting success rate of up to 80%, making them Africa's most efficient predators."
  ],
  "Airedale Terrier": [
    "Airedale Terriers are the largest of all terrier breeds.",
    "They were used as messenger dogs during World War I due to their intelligence and bravery.",
    "The breed was developed in Yorkshire, England to hunt otters in the River Aire."
  ],
  "Akbash Dog": [
    "Akbash Dogs are ancient Turkish livestock guardian dogs with a history spanning 3,000 years.",
    "Their white coat helps shepherds distinguish them from predators in low light.",
    "They're known for their independence and ability to make decisions without human direction."
  ],
  "Akita": [
    "Akitas were historically used for hunting bear, boar, and deer in Japan.",
    "The famous Akita named Hachikō waited for his deceased owner at a train station for nine years.",
    "They were declared a national monument in Japan in 1931."
  ],
  "Alapaha Blue Blood Bulldog": [
    "This rare breed was developed in southern Georgia to protect property and livestock.",
    "They were nearly extinct in the 1970s but were saved by dedicated breeders.",
    "The name 'Blue Blood' refers to their nobility, not their coloration."
  ],
  "Alaskan Husky": [
    "Alaskan Huskies are not a recognized breed but a type developed for sled racing.",
    "They can maintain an average speed of 10-15 mph for hundreds of miles.",
    "They have been known to run over 100 miles in a single day while pulling a sled."
  ],
  "Alaskan Malamute": [
    "Malamutes are one of the oldest Arctic sled dogs, bred by the Mahlemut tribe of Alaska.",
    "They can pull sleds weighing up to 1,000 pounds.",
    "Unlike Siberian Huskies, Malamutes were bred for power, not speed."
  ],
  "American Bulldog": [
    "American Bulldogs were used as working farm dogs in the American South.",
    "They nearly went extinct after World War II but were revived by a few dedicated breeders.",
    "They can jump over 6 feet high from a standing position."
  ],
  "American Bully": [
    "The American Bully was developed in the 1990s from American Pit Bull Terriers and other bulldog breeds.",
    "Despite their muscular appearance, they're known for their gentle and friendly temperament.",
    "They come in four size varieties: Pocket, Standard, Classic, and XL."
  ],
  "American Eskimo Dog": [
    "Despite their name, American Eskimo Dogs originated in Germany, not among Eskimo people.",
    "They were popular performers in American traveling circuses in the 19th century.",
    "Their thick white coat provides insulation in temperatures as low as -20°F."
  ],
  "American Foxhound": [
    "George Washington was instrumental in developing the American Foxhound breed.",
    "They have been known to run for hours at speeds of up to 30 mph.",
    "The American Foxhound is the state dog of Virginia."
  ],
  "American Pit Bull Terrier": [
    "American Pit Bull Terriers excel in weight-pulling competitions, sometimes pulling over 5,000 pounds.",
    "During WWI, they were used as the nation's mascot to represent American courage.",
    "They have one of the strongest bite forces among domestic dogs."
  ],
  "American Staffordshire Terrier": [
    "The famous RCA Victor dog, Nipper, was believed to be an American Staffordshire Terrier.",
    "They were originally bred for the now-illegal sports of bull-baiting and bear-baiting.",
    "Despite their powerful build, they're known as 'nanny dogs' for their gentleness with children."
  ],
  "American Water Spaniel": [
    "The American Water Spaniel was developed in Wisconsin for hunting in the Great Lakes region.",
    "They're one of the few breeds developed entirely in the United States.",
    "They're the state dog of Wisconsin, where they were developed in the mid-1800s."
  ],
  "Anatolian Shepherd Dog": [
    "Anatolian Shepherds have been guarding livestock in Turkey for over 6,000 years.",
    "They can survive in extreme temperatures from -40°F to 120°F.",
    "Their collar, called a 'kangal,' is spiked to protect them from wolf attacks."
  ],
  "Appenzeller Sennenhund": [
    "This Swiss mountain dog was traditionally used to herd cattle and pull carts.",
    "They're known for their distinctive tri-colored coat and curved tail.",
    "They're excellent at musical canine freestyle due to their agility and intelligence."
  ],
  "Australian Cattle Dog": [
    "Australian Cattle Dogs were developed by crossing Dingoes with Collies and other herding dogs.",
    "The oldest dog ever recorded was an Australian Cattle Dog named Bluey, who lived to 29 years.",
    "They're born white and develop their blue or red coat as they mature."
  ]
};

// Fill in facts for remaining breeds
Object.keys(breedPathMap).forEach(breed => {
  if (!breedFacts[breed]) {
    breedFacts[breed] = [
      `The ${breed} is known for its distinctive appearance and temperament.`,
      `${breed}s are highly intelligent and trainable dogs.`,
      `${breed}s make loyal and devoted companions.`,
      `The ${breed} has a rich history as a working dog.`,
      `${breed}s have unique characteristics that set them apart from other breeds.`
    ];
  }
});

const MainFeature = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionTimer, setQuestionTimer] = useState(30); // 30 seconds per question
  const [quizActive, setQuizActive] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [currentBreedFact, setCurrentBreedFact] = useState('');
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
    setQuestionTimer(30);
    setQuizActive(true);
    setQuizCompleted(false);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setImageLoaded(false);
    setImageError(false);
    setCurrentImageUrl('');
  }, [prepareQuestions]);


  // Handle question timer
  useEffect(() => {
    let timer;
    if (quizActive && !quizCompleted && !showFeedback && questionTimer > 0) {
      timer = setTimeout(() => {
        setQuestionTimer(prev => {
          if (prev <= 1) {
            // Time's up for this question - move to next question
            setShowFeedback(false);
            setSelectedAnswer(null);
            setImageLoaded(false);
            setCurrentImageUrl('');
            setImageError(false);
            setCurrentBreedFact('');
            
            if (currentQuestionIndex < questions.length - 1) {
              setCurrentQuestionIndex(prev => prev + 1);
              return 30; // Reset timer for next question
            } else {
              setQuizCompleted(true);
              toast.info("Quiz completed!");
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [quizActive, quizCompleted, questionTimer, showFeedback, currentQuestionIndex, questions.length]);

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    if (showFeedback || !quizActive || quizCompleted) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.breed;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);

    // Get a random fact about the breed
    const breedFactsArray = breedFacts[currentQuestion.breed] || [];
    const randomFact = breedFactsArray[Math.floor(Math.random() * breedFactsArray.length)];
    setCurrentBreedFact(randomFact || `The ${currentQuestion.breed} is a fascinating dog breed with unique characteristics.`);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      toast.success("Correct answer!");
    } else {
      toast.error("Incorrect answer!");
      toast.info(`The correct answer is: ${currentQuestion.breed}`);
    }
    
    // Move to next question after 30 seconds
    clearTimeout(); // Clear any existing question timer
    setTimeout(() => {
      handleNextQuestion();
    }, 30000);
  };  
  
  // Handle next question button click
  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setImageLoaded(false);
    setCurrentImageUrl('');
    setImageError(false);
    setCurrentBreedFact('');
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuestionTimer(30); // Reset timer for next question
    } else {
      setQuizCompleted(true);
      toast.info("Quiz completed!");
    }
  };

    // Move to next question after 2 seconds
    clearTimeout(); // Clear any existing question timer
    setTimeout(() => {
      handleNextQuestion();
    }, 30000);
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
      setImageLoaded(false);
      setImageError(false);
      setRetryCount(0);
      
      try {
        setImageError(false);
        setRetryCount(0);
        
        // Ensure we're using the correct API path for the breed
        const breedPath = getBreedPath(currentQuestion.breed);
        const apiUrl = `https://dog.ceo/api/breed/${breedPath}/images/random`;
        
        // Try to fetch from the breed-specific endpoint
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();

          // First attempt: Try the breed-specific endpoint
          // Check if we got a valid response
          if (data.status === "success" && data.message) {
            // Validate the image URL contains the expected breed path
            const imageUrl = data.message;
            const breedPathLower = breedPath.toLowerCase().replace(/\s+/g, '');
            
            if (imageUrl.includes(breedPathLower.replace('/', '-')) || 
                imageUrl.includes(breedPathLower)) {
              setCurrentImageUrl(imageUrl);
              return;
            }

            // If the URL doesn't contain the breed name but is still valid, use it anyway
            setCurrentImageUrl(data.message);
            return;
          }
          
          throw new Error("Invalid breed-specific image");
        } catch (innerError) {
          console.error("Error fetching breed-specific image:", innerError.message);
          // Fallback 1: Try the generic random dog image endpoint
          try {
            const fallbackUrl = "https://dog.ceo/api/breeds/image/random";
            const fallbackResponse = await fetch(fallbackUrl);
            const fallbackData = await fallbackResponse.json();
            
            if (fallbackData.status === "success" && fallbackData.message) {
              setCurrentImageUrl(fallbackData.message);
              return;
            }
          } catch (fallbackError) {
            console.error("Error fetching fallback image:", fallbackError.message);
          }
          
          // Fallback 2: Try using an external dog image service
          const backupResponse = await fetch(`https://placedog.net/500/280?r=${Math.random()}`);
          const backupData = await backupResponse.json();
          
          if (backupData.status === "success" && backupData.message) {
            setCurrentImageUrl(backupData.message);
          } else {
            throw new Error("Invalid image data");
          }
        }
      } catch (error) {
        console.error("Error fetching dog image:", error);
        // Last resort fallback - use a placeholder image service
        setCurrentImageUrl(`https://via.placeholder.com/500x300/f5f5f5/a0a0a0?text=Dog+Breed+Image`);
        // Don't set image error yet, let the img element's onError handle it if this also fails
      }
      
      // Note: If all attempts fail, the img element's onError handler will be triggered
    };

    fetchDogImage();
  }, [currentQuestionIndex, questions, quizActive, quizCompleted]);

  const handleImageLoad = () => {
    // Reset question timer when new question appears
    if (!showFeedback) {
      setQuestionTimer(30);
    }
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    if (retryCount < 3) {
      // Try a fallback using a different breed-specific source
      setRetryCount(prev => prev + 1);
      
      if (questions[currentQuestionIndex]) {
        const breed = questions[currentQuestionIndex].breed;
        const breedForUrl = breed.toLowerCase().replace(/\s+/g, '-');
        
        // Try different fallback strategies based on retry count
        if (retryCount === 0) {
          // First retry: Try a different format of the breed path
          const altBreedPath = breed.toLowerCase().split(' ').reverse().join('/');
          setCurrentImageUrl(`https://dog.ceo/api/breed/${altBreedPath}/images/random`);
        } else if (retryCount === 1) {
          // Second retry: Try dog.ceo breeds images directory directly
          const breedPath = getBreedPath(breed).replace('/', '-');
          setCurrentImageUrl(`https://images.dog.ceo/breeds/${breedPath}/n02100735_4097.jpg`);
        } else {
          // Third retry: Use a public dog image placeholder service
          setCurrentImageUrl(`https://placedog.net/500/280?id=${Math.floor(Math.random() * 100)}`);
        }
      } else {
        // If we don't have question data, use a generic dog placeholder
        setCurrentImageUrl(`https://placedog.net/500/280?id=${Math.floor(Math.random() * 100)}`);
      }
      
      // Add a small delay before setting the new URL to prevent rapid retries
      setTimeout(() => setImageLoaded(false), 100);
      
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
              <div className={`flex items-center gap-1 ${questionTimer <= 5 ? 'text-red-300 animate-pulse' : ''}`}>
                <ApperIcon name="Timer" className="h-5 w-5" />
                <span className="font-mono font-semibold">{questionTimer}s</span>
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
            <div className="mt-1 w-full bg-white/20 rounded-full h-2.5">
              <div 
                className="bg-secondary-light h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${(questionTimer / 30) * 100}%` }}
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
              Test your knowledge of dog breeds with our fun quiz. Each question has a 30-second timer.
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
            <div className="relative w-full h-64 sm:h-80 md:h-96 mb-6 rounded-xl overflow-hidden bg-surface-100 dark:bg-surface-800 flex items-center justify-center shadow-card img-container border border-surface-200 dark:border-surface-700">
              {(!imageLoaded && !imageError) && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              )}  
              
              {imageError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-surface-500 dark:text-surface-400 z-10 bg-surface-200/50 dark:bg-surface-700/50 backdrop-blur-sm">
                  <ApperIcon name="ImageOff" className="h-10 w-10 mb-2 opacity-75" />
                  <p>Image not available</p>
                </div>
              )}
              
              <img
                src={currentImageUrl || ''}
                alt={currentQuestion.breed || "Dog breed"}
                className={`img-contain img-high-quality img-fade-in ${imageLoaded && !imageError ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
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
              {currentBreedFact && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-4 rounded-lg text-center mb-4 bg-primary/10 text-primary-dark dark:bg-primary/20 dark:text-primary-light border border-primary/20"
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <ApperIcon name="Info" className="h-5 w-5" />
                    <p className="font-medium text-sm">Breed Fact</p>
                  </div>
                  <p>{currentBreedFact}</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-center mt-4"
                >
                  <button onClick={handleNextQuestion} className="btn-primary flex items-center gap-2">
                    Next Question <ApperIcon name="ArrowRight" className="h-5 w-5" />
                  </button>
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