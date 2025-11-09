import { useState, useEffect, useRef } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import { useCallback } from 'react';

// Enhanced sample cards data with more content
const SAMPLE_CARDS = [
  {
    id: 1,
    name: 'George Liu',
    major: 'CS @uwaterloo',
    company: 'SWE @Tesla',
    image: '/georgeliu.jpeg',
    rarity: 'rare', // Keep one rare
    bio: 'Passionate about autonomous vehicles and AI. Love hiking and coffee.',
    location: 'San Francisco, CA',
    interests: ['Tech', 'Hiking', 'Coffee', 'AI/ML'],
    age: 24,
    experience: '3 years',
    email: 'george.liu@tesla.com',
    linkedin: 'https://linkedin.com/in/george-liu'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    major: 'Engineering @MIT',
    company: 'Product Manager @Google',
    image: '/good.jpeg',
    rarity: 'common',
    bio: 'Building products that matter. Avid reader and yoga enthusiast.',
    location: 'Mountain View, CA',
    interests: ['Product Design', 'Reading', 'Yoga', 'Travel'],
    age: 26,
    experience: '4 years',
    email: 'sarah.chen@google.com',
    linkedin: 'https://linkedin.com/in/sarah-chen'
  },
  {
    id: 3,
    name: 'Alex Rodriguez',
    major: 'Business @Stanford',
    company: 'Founder @TechStartup',
    image: '/jhts.jpg',
    rarity: 'common',
    bio: 'Serial entrepreneur. Love building things from scratch.',
    location: 'Palo Alto, CA',
    interests: ['Entrepreneurship', 'Startups', 'Basketball', 'Networking'],
    age: 28,
    experience: '6 years',
    email: 'alex.rodriguez@techstartup.com',
    linkedin: 'https://linkedin.com/in/alex-rodriguez'
  },
  {
    id: 4,
    name: 'Emma Wilson',
    major: 'Design @RISD',
    company: 'UX Designer @Apple',
    image: '/meganfox.jpg',
    rarity: 'rare',
    bio: 'Designing beautiful experiences. Art lover and foodie.',
    location: 'Cupertino, CA',
    interests: ['Design', 'Art', 'Food', 'Photography'],
    age: 25,
    experience: '3 years',
    email: 'emma.wilson@apple.com',
    linkedin: 'https://linkedin.com/in/emma-wilson'
  },
  {
    id: 5,
    name: 'Michael Park',
    major: 'Data Science @CMU',
    company: 'ML Engineer @OpenAI',
    image: '/Kristin_Kreuk_Photo_Op_GalaxyCon_Columbus_2022_(cropped).jpg',
    rarity: 'legendary', // Keep one legendary
    bio: 'Pushing the boundaries of AI. Chess player and music producer.',
    location: 'San Francisco, CA',
    interests: ['AI/ML', 'Chess', 'Music', 'Research'],
    age: 27,
    experience: '5 years',
    email: 'michael.park@openai.com',
    linkedin: 'https://linkedin.com/in/michael-park'
  },
  {
    id: 6,
    name: 'Jessica Brown',
    major: 'Finance @Wharton',
    company: 'Investment Banker @Goldman Sachs',
    image: '/neon.jpg',
    rarity: 'common',
    bio: 'Finance professional by day, fitness enthusiast by night.',
    location: 'New York, NY',
    interests: ['Finance', 'Fitness', 'Cooking', 'Wine'],
    age: 29,
    experience: '7 years',
    email: 'jessica.brown@gs.com',
    linkedin: 'https://linkedin.com/in/jessica-brown'
  },
  {
    id: 7,
    name: 'David Kim',
    major: 'CS @Berkeley',
    company: 'Software Engineer @Meta',
    image: '/thailand.jpeg',
    rarity: 'rare',
    bio: 'Full-stack developer. Love open source and gaming.',
    location: 'Menlo Park, CA',
    interests: ['Coding', 'Gaming', 'Open Source', 'Biking'],
    age: 24,
    experience: '2 years',
    email: 'david.kim@meta.com',
    linkedin: 'https://linkedin.com/in/david-kim'
  },
  {
    id: 8,
    name: 'Olivia Martinez',
    major: 'Marketing @NYU',
    company: 'Brand Manager @Nike',
    image: '/tw.jpeg',
    rarity: 'common',
    bio: 'Building brands that inspire. Runner and adventure seeker.',
    location: 'Portland, OR',
    interests: ['Marketing', 'Running', 'Travel', 'Fashion'],
    age: 26,
    experience: '4 years',
    email: 'olivia.martinez@nike.com',
    linkedin: 'https://linkedin.com/in/olivia-martinez'
  },
  {
    id: 9,
    name: 'James Taylor',
    major: 'Physics @Caltech',
    company: 'Research Scientist @NASA',
    image: '/chopped1.jpg',
    rarity: 'epic', // Keep one epic
    bio: 'Exploring the cosmos. Amateur astronomer and sci-fi fan.',
    location: 'Pasadena, CA',
    interests: ['Space', 'Physics', 'Astronomy', 'Sci-Fi'],
    age: 30,
    experience: '8 years',
    email: 'james.taylor@nasa.gov',
    linkedin: 'https://linkedin.com/in/james-taylor'
  }
];

// Swipeable Card Component
const SwipeableCard = ({ card, onSwipe, onReveal, isRevealed, isActive }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const animationFrameRef = useRef(null);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary':
        return 'from-yellow-400 via-yellow-500 to-yellow-600';
      case 'epic':
        return 'from-purple-500 via-purple-600 to-purple-700';
      case 'rare':
        return 'from-blue-500 via-blue-600 to-blue-700';
      case 'uncommon':
        return 'from-gray-500 via-gray-600 to-gray-700';
      case 'common':
        return 'from-green-500 via-green-600 to-green-700';
      default:
        return 'from-gray-500 via-gray-600 to-gray-700';
    }
  };

  const updatePosition = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      setPosition({ ...currentPosRef.current });
      setRotation(currentPosRef.current.x * 0.1);
    });
  }, []);

  const handleStart = useCallback((clientX, clientY) => {
    if (!isRevealed || !isActive) return;
    setIsDragging(true);
    startPosRef.current = { x: clientX, y: clientY };
    currentPosRef.current = { x: 0, y: 0 };
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  }, [isRevealed, isActive]);

  const handleMove = useCallback((clientX, clientY) => {
    const deltaX = clientX - startPosRef.current.x;
    const deltaY = clientY - startPosRef.current.y;
    
    currentPosRef.current = { x: deltaX, y: deltaY };
    updatePosition();
  }, [updatePosition]);

  const handleEnd = useCallback(() => {
    const threshold = 30; // Very low threshold for easier swiping
    const currentX = currentPosRef.current.x;
    
    if (Math.abs(currentX) > threshold) {
      // Swipe detected - animate off screen
      const direction = currentX > 0 ? 1 : -1;
      const exitX = direction * window.innerWidth * 1.5;
      
      setPosition({ x: exitX, y: currentPosRef.current.y });
      setRotation(direction * 25);
      
      // Trigger swipe callback
      setTimeout(() => {
        if (currentX > 0) {
          onSwipe('right'); // Like
        } else {
          onSwipe('left'); // Pass
        }
      }, 200);
    } else {
      // Return to center with smooth animation
      setPosition({ x: 0, y: 0 });
      setRotation(0);
    }
    
    setIsDragging(false);
    currentPosRef.current = { x: 0, y: 0 };
  }, [onSwipe]);

  // Mouse events
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    handleStart(e.clientX, e.clientY);
  }, [handleStart]);
  
  const handleMouseMove = useCallback((e) => {
    e.preventDefault();
    handleMove(e.clientX, e.clientY);
  }, [handleMove]);
  
  const handleMouseUp = useCallback((e) => {
    e.preventDefault();
    handleEnd();
  }, [handleEnd]);

  // Touch events
  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  }, [handleStart]);
  
  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  }, [handleMove]);
  
  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();
    handleEnd();
  }, [handleEnd]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const opacity = isActive ? 1 : 0.3;
  const scale = isActive ? 1 : 0.9;

  return (
    <div
      ref={cardRef}
      className={`absolute w-80 h-[600px] cursor-grab active:cursor-grabbing select-none ${
        isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${!isDragging ? 'transition-transform duration-300 ease-out' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`,
        opacity: isActive ? opacity : 0,
        zIndex: isActive ? 10 : 0,
        display: isActive ? 'block' : 'none',
        willChange: isDragging ? 'transform' : 'auto'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Swipe indicators */}
      {isDragging && (
        <>
          {position.x > 20 && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-green-500/40 rounded-3xl border-4 border-green-400 transition-opacity duration-100 z-50"
              style={{ opacity: Math.min(Math.abs(position.x) / 80, 1) }}
            >
              <div className="text-6xl font-bold text-green-400 drop-shadow-lg">✓ LIKE</div>
            </div>
          )}
          {position.x < -20 && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-red-500/40 rounded-3xl border-4 border-red-400 transition-opacity duration-100 z-50"
              style={{ opacity: Math.min(Math.abs(position.x) / 80, 1) }}
            >
              <div className="text-6xl font-bold text-red-400 drop-shadow-lg">✗ PASS</div>
            </div>
          )}
        </>
      )}

      {/* Glow effect */}
      <div
        className={`absolute -inset-4 rounded-3xl bg-gradient-to-r ${getRarityColor(
          card.rarity
        )} blur-2xl opacity-60 animate-pulse-glow`}
      />

      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Rarity indicator */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getRarityColor(
            card.rarity
          )} shadow-lg z-20`}
        >
          {card.rarity.toUpperCase()}
        </div>

        {/* Profile Image */}
        <div className="h-[280px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/30 via-purple-600/30 to-blue-600/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Glow rings */}
              <div
                className={`absolute inset-0 -m-6 rounded-full bg-gradient-to-r ${getRarityColor(
                  card.rarity
                )} blur-2xl opacity-50 animate-spin-slow animate-pulse-scale`}
              />
              <div
                className={`absolute inset-0 -m-4 rounded-full bg-gradient-to-r ${getRarityColor(
                  card.rarity
                )} blur-xl opacity-60 animate-spin-reverse animate-pulse-scale-delayed`}
              />

              {/* Avatar */}
              <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white/30">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${getRarityColor(
                      card.rarity
                    )} flex items-center justify-center text-white text-5xl font-bold`}
                  >
                    {card.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-5 space-y-3 bg-black/40 backdrop-blur-sm">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white tracking-tight mb-1 drop-shadow-lg">
              {card.name}
            </h3>
            <div className="text-white text-base font-semibold">{card.age} years old</div>
          </div>

          <div className="space-y-2 text-center">
            <div className="text-white text-lg font-semibold drop-shadow-md">
              {card.major}
            </div>
            <div className="text-white text-lg font-semibold drop-shadow-md">
              {card.company}
            </div>
            <div className="text-white text-base flex items-center justify-center gap-2 font-medium">
              <span>📍</span>
              {card.location}
            </div>
          </div>

          {/* Bio */}
          <div className="pt-3 border-t border-white/20">
            <p className="text-white text-base leading-relaxed text-center font-medium drop-shadow-md px-2">
              {card.bio}
            </p>
          </div>

          {/* Interests */}
          <div className="pt-3">
            <div className="text-white text-sm mb-2 text-center font-semibold">Interests</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {card.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold border border-white/30 drop-shadow-md"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="pt-3 text-center border-t border-white/20">
            <div className="text-white/90 text-sm mb-1 font-semibold">Experience</div>
            <div className="text-white text-base font-bold">{card.experience}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pack Opening Component
const PackOpening = ({ onCardLiked }) => {
  const [packOpened, setPackOpened] = useState(false);
  const [currentPack, setCurrentPack] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [revealedCards, setRevealedCards] = useState([]);
  const [isRevealing, setIsRevealing] = useState(false);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#ffffff'
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 0.6,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.1,
          sync: false
        }
      },
      links: {
        enable: false
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: 'none',
        random: false,
        straight: false,
        outModes: {
          default: 'out'
        },
        bounce: false
      }
    },
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onHover: {
          enable: false
        },
        onClick: {
          enable: false
        },
        resize: true
      }
    },
    detectRetina: true
  };

  const openPack = () => {
    // Rarity order: legendary > epic > rare > common
    const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 };
    
    // Find all cards with the highest rarity
    const sortedByRarity = [...SAMPLE_CARDS].sort((a, b) => {
      return rarityOrder[b.rarity] - rarityOrder[a.rarity];
    });
    
    // Get the highest rarity value
    const highestRarity = sortedByRarity[0].rarity;
    
    // Find all cards with the highest rarity
    const highestRarityCards = SAMPLE_CARDS.filter(card => card.rarity === highestRarity);
    
    // Randomly select one card from the highest rarity tier
    const bestCard = highestRarityCards[Math.floor(Math.random() * highestRarityCards.length)];
    
    // Get remaining cards (excluding the best card)
    const remainingCards = SAMPLE_CARDS.filter(card => card.id !== bestCard.id);
    
    // Randomly select 4 cards from remaining
    const shuffled = [...remainingCards].sort(() => Math.random() - 0.5);
    const randomCards = shuffled.slice(0, 4);
    
    // Create pack with best card at the end (index 4)
    const pack = [...randomCards, bestCard];
    
    setCurrentPack(pack);
    setPackOpened(true);
    setCurrentCardIndex(0);
    setRevealedCards([]);
    setIsRevealing(false);
    
    // Reveal first card after a short delay
    setTimeout(() => {
      setRevealedCards([0]);
      setIsRevealing(true);
      setTimeout(() => {
        setIsRevealing(false);
      }, 600);
    }, 500);
  };

  const revealNextCard = () => {
    setRevealedCards((prev) => {
      const nextIndex = prev.length;
      if (nextIndex < currentPack.length) {
        setIsRevealing(true);
        setTimeout(() => {
          setIsRevealing(false);
        }, 600);
        return [...prev, nextIndex];
      }
      return prev;
    });
  };

  const handleSwipe = (direction) => {
    if (currentCardIndex >= currentPack.length) return;
    
    const currentCard = currentPack[currentCardIndex];
    
    if (direction === 'right') {
      // Like - add to roster
      onCardLiked(currentCard);
    }
    // Left swipe - just remove
    
    // Move to next card
    setCurrentCardIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex < currentPack.length) {
        // Reveal next card
        setTimeout(() => {
          setRevealedCards((prevRevealed) => {
            if (!prevRevealed.includes(nextIndex)) {
              setIsRevealing(true);
              setTimeout(() => {
                setIsRevealing(false);
              }, 600);
              return [...prevRevealed, nextIndex];
            }
            return prevRevealed;
          });
        }, 300);
      } else {
        // All cards processed
        setTimeout(() => {
          resetPack();
        }, 1000);
      }
      return nextIndex;
    });
  };

  const resetPack = () => {
    setPackOpened(false);
    setCurrentCardIndex(0);
    setRevealedCards([]);
    setCurrentPack([]);
    setIsRevealing(false);
  };

  const currentCard = currentCardIndex < currentPack.length ? currentPack[currentCardIndex] : null;
  const isCurrentCardRevealed = currentCardIndex < currentPack.length && revealedCards.includes(currentCardIndex);
  const hasMoreCards = currentCardIndex < currentPack.length - 1;
  const isPackComplete = currentCardIndex >= currentPack.length;

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden fixed inset-0">
      {/* Starfield Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles-pack"
          init={particlesInit}
          options={particlesConfig}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 py-12">
        {!packOpened ? (
          // Pack selection screen
          <div className="text-center space-y-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-2xl">
              Open Your Daily Pack
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/80 drop-shadow-lg max-w-2xl mx-auto">
              Get 5 new matches today! Cards will reveal one by one.
            </p>
            <div className="relative inline-block">
              {/* Glow layers */}
              <div className="absolute inset-0 rounded-full bg-pink-500 blur-xl opacity-75 animate-pulse-glow"></div>
              <div className="absolute inset-0 rounded-full bg-pink-400 blur-2xl opacity-50 animate-pulse-glow-delayed"></div>
              <div className="absolute -inset-1 rounded-full bg-pink-300 blur-sm opacity-60 animate-pulse-glow-slow"></div>
              {/* Pack button */}
              <button
                onClick={openPack}
                className="relative bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 text-white px-16 py-8 rounded-full text-3xl font-bold transition-all duration-300 shadow-[0_0_30px_rgba(236,72,153,0.6),0_0_60px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.8),0_0_80px_rgba(236,72,153,0.6)] hover:scale-105 active:scale-95"
              >
                <span className="text-4xl mr-3">📦</span>
                Open Pack
              </button>
            </div>
          </div>
        ) : (
          // Pack opening screen
          <div className="w-full max-w-4xl h-full flex flex-col items-center justify-center">
            <div className="text-center mb-6">
              {currentCardIndex < currentPack.length ? (
                <h2 className="text-3xl font-bold mb-2">Card {currentCardIndex + 1} of {currentPack.length}</h2>
              ) : (
                <h2 className="text-3xl font-bold mb-2">Pack Complete!</h2>
              )}
              <p className="text-white/70 text-sm">
                {isRevealing ? 'Revealing...' : isCurrentCardRevealed ? 'Swipe left to pass, right to like' : 'Revealing card...'}
              </p>
            </div>

            {/* Card stack */}
            <div className="relative w-full max-w-md h-[600px] flex items-center justify-center touch-none">
              {!isPackComplete && currentPack.map((card, index) => {
                const isRevealed = revealedCards.includes(index);
                const isActive = index === currentCardIndex && isRevealed;
                
                // Only show current card or cards that are being revealed
                if (index !== currentCardIndex && !isRevealed) {
                  return null;
                }
                
                return (
                  <SwipeableCard
                    key={card.id}
                    card={card}
                    isRevealed={isRevealed}
                    isActive={isActive}
                    onReveal={() => {}}
                    onSwipe={handleSwipe}
                  />
                );
              })}

              {/* Pack wrapper for unrevealed cards */}
              {!isPackComplete && !isCurrentCardRevealed && currentCard && (
                <div className="absolute w-80 h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-400/50 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 flex items-center justify-center animate-pulse pointer-events-none">
                  <div className="text-center p-8">
                    <div className="text-8xl mb-4 animate-bounce-slow">📦</div>
                    <div className="text-white text-2xl font-bold mb-2">Daily Pack</div>
                    <div className="text-white/80 text-sm">Revealing...</div>
                  </div>
                </div>
              )}

              {/* No more cards message */}
              {isPackComplete && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">✨</div>
                    <div className="text-2xl font-bold mb-2">Pack Complete!</div>
                    <button
                      onClick={resetPack}
                      className="mt-4 px-8 py-4 bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 text-white rounded-full font-semibold hover:scale-105 transition-transform shadow-lg shadow-pink-500/50"
                    >
                      Open Another Pack
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackOpening;
