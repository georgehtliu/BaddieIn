import { useState, useCallback, useEffect } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import { FaLinkedin, FaHeartBroken } from 'react-icons/fa';

const Roster = ({ likedCards, onRemoveCard }) => {
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);
  const [cardToRemove, setCardToRemove] = useState(null);
  
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

  // RosterCard component matching ProfileCard format
  const RosterCard = ({ card, onCardClick, onRemoveClick, isExpanded }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [glowIntensity, setGlowIntensity] = useState(0);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setGlowIntensity(prev => (prev + 0.05) % (Math.PI * 2));
        setRotation(prev => (prev + 0.5) % 360);
      }, 30);
      return () => clearInterval(interval);
    }, []);

    const glowOpacity = 0.5 + Math.sin(glowIntensity) * 0.3;
    const glowScale = 1 + Math.sin(glowIntensity) * 0.1;

    const handleFlip = (e) => {
      e.stopPropagation();
      setIsFlipped(!isFlipped);
    };

    return (
      <div 
        className="relative w-80 h-[480px] cursor-pointer group transition-transform duration-300"
        onClick={handleFlip}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          perspective: '1000px',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
      >
        {/* Multi-layered animated glow effect */}
        <div 
          className="absolute -inset-6 rounded-3xl blur-3xl transition-all duration-500"
          style={{ 
            opacity: glowOpacity,
            transform: `scale(${glowScale}) rotate(${rotation}deg)`,
            background: `conic-gradient(from ${rotation}deg, #ec4899, #a855f7, #3b82f6, #ec4899)`
          }}
        />
        <div 
          className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-2xl"
          style={{ 
            opacity: glowOpacity * 0.7,
            transform: `scale(${glowScale * 0.9}) rotate(${-rotation}deg)`
          }}
        />
        
        <div 
          className="relative w-full h-full transition-transform duration-700 preserve-3d z-20"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Prestigious solid metallic gold border - only border frame */}
          <div 
            className="absolute inset-0 rounded-3xl z-10 backface-hidden pointer-events-none"
            style={{
              padding: '3px',
              background: 'linear-gradient(135deg, #8b6914 0%, #A57B00 25%, #b8860b 50%, #A57B00 75%, #8b6914 100%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              backfaceVisibility: 'visible'
            }}
          >
            <div className="w-full h-full rounded-3xl bg-transparent"></div>
          </div>
          <div 
            className="absolute inset-0 rounded-3xl z-10 animate-metallic-shine backface-hidden pointer-events-none"
            style={{
              padding: '2px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              backfaceVisibility: 'visible'
            }}
          >
            <div 
              className="w-full h-full rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, #A57B00 0%, #c99a1a 20%, #d4af37 40%, #c99a1a 60%, #A57B00 100%)'
              }}
            ></div>
          </div>
          
          {/* Front of card */}
          <div
            className="absolute w-full h-full backface-hidden rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Card content */}
            <div className="relative h-full flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
              {/* Profile Image */}
              <div className="h-[280px] relative overflow-hidden flex-shrink-0">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600/30 via-purple-600/30 to-blue-600/30" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Outer animated glow rings */}
                    <div className="absolute inset-0 -m-6 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-2xl opacity-50 animate-spin-slow animate-pulse-scale" />
                    <div className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-60 animate-spin-reverse animate-pulse-scale-delayed" />
                    <div className="absolute inset-0 -m-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-lg opacity-40 animate-spin-slow" />
                    
                    {/* Animated rotating border ring */}
                    <div className="absolute inset-0 -m-1 rounded-full animate-rotate-border" style={{
                      width: 'calc(100% + 8px)',
                      height: 'calc(100% + 8px)',
                      background: 'conic-gradient(from 0deg, #ec4899, #a855f7, #3b82f6, #ec4899)',
                      borderRadius: '50%',
                      padding: '4px',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      WebkitMaskComposite: 'xor'
                    }}>
                      <div className="w-full h-full rounded-full bg-transparent"></div>
                    </div>
                    
                    {/* Avatar */}
                    <div className="relative w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-white/30">
                      {card.image ? (
                        <img 
                          src={card.image}
                          alt={card.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.classList.add('bg-gradient-to-br', 'from-pink-500', 'via-purple-500','to-blue-500', 'flex', 'items-center', 'justify-center');
                            const initials = card.name.split(' ').map(n => n[0]).join('');
                            e.target.parentElement.innerHTML = `<span class="text-white text-7xl font-bold">${initials}</span>`;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center">
                          <span className="text-white text-7xl font-bold">
                            {card.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Inner glow pulse */}
                    <div className="absolute inset-0 -m-3 rounded-full bg-gradient-to-r from-pink-400/50 via-purple-400/50 to-blue-400/50 blur-md animate-pulse-glow-inner" />
                  </div>
                </div>
                
                {/* Subtle ambient glow effect */}
                <div 
                  className="absolute inset-0 animate-gentle-pulse pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.05) 0%, transparent 70%)'
                  }}
                />
              </div>
              
              {/* Border divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-shrink-0"></div>
              
              {/* Profile Info */}
              <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-3 text-center min-h-0">
                <h3 className="text-4xl font-bold text-white tracking-tight">
                  {card.name}
                </h3>
                
                <div className="space-y-2">
                  <div className="text-white/90 text-lg font-medium">
                    {card.major}
                  </div>
                  <div className="text-white/90 text-lg font-medium">
                    {card.company}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Back of card */}
          <div 
            className="absolute w-full h-full backface-hidden rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-400/30 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            {/* Shine animation overlay */}
            <div className="absolute inset-0 animate-shine pointer-events-none rounded-3xl"></div>
            
            <div className="h-full flex flex-col items-center justify-center p-8 relative z-10 space-y-6">
              {/* LinkedIn Logo */}
              {card.linkedin ? (
                <a 
                  href={card.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-all duration-300 hover:scale-125"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaLinkedin size={48} />
                </a>
              ) : (
                <div className="text-white/60">
                  <FaLinkedin size={48} />
                </div>
              )}
              
              {/* Remove button on back */}
              {onRemoveClick && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveClick(card);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 hover:scale-105 shadow-lg cursor-pointer"
                >
                  Remove from Roster
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Hover instruction */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white/50 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Click to flip card
        </div>
      </div>
    );
  };

  const handleRemoveClick = (card) => {
    setCardToRemove(card);
    setShowConfirmRemove(true);
  };

  const confirmRemove = () => {
    if (cardToRemove && onRemoveCard) {
      onRemoveCard(cardToRemove);
      setShowConfirmRemove(false);
      setCardToRemove(null);
    }
  };

  const cancelRemove = () => {
    setShowConfirmRemove(false);
    setCardToRemove(null);
  };

  return (
    <div className="h-screen w-screen bg-black text-white overflow-auto fixed inset-0">
      {/* Starfield Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles-roster"
          init={particlesInit}
          options={particlesConfig}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 min-h-full px-6 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-2xl">
              Your Roster
            </h1>
            <p className="text-xl text-white/80 drop-shadow-lg">
              {likedCards.length === 0
                ? "You haven't liked any cards yet. Swipe right on cards to add them here!"
                : `You have ${likedCards.length} card${likedCards.length !== 1 ? 's' : ''} in your roster`}
            </p>
          </div>

          {likedCards.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-6 flex justify-center">
                <FaHeartBroken className="text-8xl text-white/60" />
              </div>
              <p className="text-2xl text-white/60">No cards in your roster yet</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-8">
              {likedCards.map((card) => (
                <RosterCard
                      key={card.id}
                  card={card}
                  onRemoveClick={handleRemoveClick}
                />
                            ))}
                          </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmRemove && cardToRemove && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={cancelRemove}
          />
          
          {/* Dialog */}
          <div className="relative z-50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 max-w-md w-[90vw] border-4 border-red-500/50 shadow-2xl">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-3xl font-bold text-white mb-4">Remove from Roster?</h3>
              <p className="text-white/80 text-lg mb-6">
                Are you sure you want to remove <span className="font-bold text-white">{cardToRemove.name}</span> from your roster? This action cannot be undone.
              </p>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={cancelRemove}
                  className="px-6 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-200 hover:scale-105 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRemove}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 hover:scale-105 shadow-lg cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roster;
