// Pack Data Structure - Each pack contains 5 profiles
// Last card in each pack is always the rarest
const packs = [
    // Pack 1
    [
        {
            name: "Chad Stevens",
            title: "Synergy Evangelist at CloudCorp",
            image: "images/profile1.jpg",
            program: "Business Administration, Harvard University",
            rarity: "common"
        },
        {
            name: "Braden Smith",
            title: "Junior Disruption Officer",
            image: "images/profile3.jpg",
            program: "Computer Science, MIT",
            rarity: "common"
        },
        {
            name: "Amanda Chen",
            title: "VP of Paradigm Shifting",
            image: "images/profile4.jpg",
            program: "MBA, Stanford University",
            rarity: "uncommon"
        },
        {
            name: "Jessica Miller",
            title: "Chief Thought-Leader",
            image: "images/profile2.jpg",
            program: "Executive Leadership Program, Wharton",
            rarity: "rare"
        },
        {
            name: "Tyler Rodriguez",
            title: "Senior Synergy Architect",
            image: "images/profile5.jpg",
            program: "Strategic Innovation, INSEAD",
            rarity: "epic"
        }
    ],
    // Pack 2
    [
        {
            name: "Marcus Williams",
            title: "Director of Strategic Alignment",
            image: "images/profile7.jpg",
            program: "Business Management, UC Berkeley",
            rarity: "common"
        },
        {
            name: "Ryan Thompson",
            title: "Lead Disruption Specialist",
            image: "images/profile9.jpg",
            program: "Engineering, Georgia Tech",
            rarity: "common"
        },
        {
            name: "Emily Davis",
            title: "Head of Digital Transformation",
            image: "images/profile8.jpg",
            program: "MBA, Columbia University",
            rarity: "uncommon"
        },
        {
            name: "Sarah Johnson",
            title: "Chief Innovation Catalyst",
            image: "images/profile6.jpg",
            program: "Executive Program, Harvard Business School",
            rarity: "rare"
        },
        {
            name: "Olivia Martinez",
            title: "Chief Synergy Officer",
            image: "images/profile10.jpg",
            program: "Global Leadership, Oxford University",
            rarity: "legendary"
        }
    ],
    // Pack 3
    [
        {
            name: "James Wilson",
            title: "VP of Thought Leadership",
            image: "images/profile11.jpg",
            program: "Business Strategy, Northwestern",
            rarity: "common"
        },
        {
            name: "Isabella Anderson",
            title: "Director of Innovation Synergy",
            image: "images/profile14.jpg",
            program: "Management, NYU",
            rarity: "common"
        },
        {
            name: "Sophia Brown",
            title: "Senior Paradigm Engineer",
            image: "images/profile12.jpg",
            program: "Technology Management, Carnegie Mellon",
            rarity: "uncommon"
        },
        {
            name: "Michael Taylor",
            title: "Chief Alignment Strategist",
            image: "images/profile13.jpg",
            program: "Executive MBA, Kellogg",
            rarity: "rare"
        },
        {
            name: "Alex Morgan",
            title: "CEO of Synergy Inc.",
            image: "images/profile15.jpg",
            program: "Global Executive MBA, INSEAD",
            rarity: "legendary"
        }
    ],
    // Pack 4
    [
        {
            name: "David Lee",
            title: "VP of Corporate Synergy",
            image: "images/profile16.jpg",
            program: "Business Administration, UCLA",
            rarity: "common"
        },
        {
            name: "Kevin Park",
            title: "Senior Thought Leader",
            image: "images/profile18.jpg",
            program: "Management, USC",
            rarity: "common"
        },
        {
            name: "Rachel Kim",
            title: "Chief Disruption Officer",
            image: "images/profile17.jpg",
            program: "MBA, Duke University",
            rarity: "uncommon"
        },
        {
            name: "Lisa Chen",
            title: "Director of Paradigm Shifts",
            image: "images/profile19.jpg",
            program: "Executive Leadership, Yale",
            rarity: "rare"
        },
        {
            name: "Chris Anderson",
            title: "Head of Innovation",
            image: "images/profile20.jpg",
            program: "Strategic Management, London Business School",
            rarity: "epic"
        }
    ],
    // Pack 5
    [
        {
            name: "Jennifer White",
            title: "VP of Strategic Synergy",
            image: "images/profile21.jpg",
            program: "Business, Boston University",
            rarity: "common"
        },
        {
            name: "Robert Brown",
            title: "Chief Alignment Officer",
            image: "images/profile22.jpg",
            program: "Management, University of Chicago",
            rarity: "common"
        },
        {
            name: "Michelle Garcia",
            title: "Senior Disruption Specialist",
            image: "images/profile23.jpg",
            program: "MBA, UC Berkeley",
            rarity: "uncommon"
        },
        {
            name: "Daniel Martinez",
            title: "VP of Digital Transformation",
            image: "images/profile24.jpg",
            program: "Executive Program, MIT Sloan",
            rarity: "rare"
        },
        {
            name: "Ashley Johnson",
            title: "CEO of Corporate Excellence",
            image: "images/profile25.jpg",
            program: "Global Executive MBA, Harvard Business School",
            rarity: "legendary"
        }
    ]
];

// Game state
let currentPackIndex = 0;
let currentPack = null;
let currentCardIndex = 0;
let isOpening = false;
let isSwiping = false; // Flag to prevent double-swiping
let swipedCards = []; // Array to track swiped cards for current pack: {index, profile, direction: 'right' or 'left'}
let allSwipedCards = []; // Array to track ALL swiped cards across all packs: {packIndex, index, profile, direction: 'right' or 'left'}

// Get HTML elements
const packContainer = document.getElementById('pack-container');
const packButton = document.getElementById('open-pack-btn');
const cardsContainer = document.getElementById('cards-container');
const packCounter = document.getElementById('pack-counter');
const openPackScreen = document.getElementById('open-pack-screen');
const backButton = document.getElementById('back-btn');
const swipeButtons = document.getElementById('swipe-buttons');
const summaryContainer = document.getElementById('summary-container');

// Initialize
function init() {
    updatePackCounter();
    showPackSelection();
}

// Show pack selection screen
function showPackSelection() {
    packContainer.style.display = 'flex';
    cardsContainer.innerHTML = '';
    cardsContainer.style.display = 'none';
    openPackScreen.style.display = 'none';
    if (summaryContainer) summaryContainer.style.display = 'none';
    packButton.disabled = false;
    packButton.textContent = 'Open Pack';
    currentCardIndex = 0;
    swipedCards = []; // Reset current pack swipes
    isOpening = false;
    
    // Hide card counter
    const cardCounter = document.getElementById('card-counter');
    if (cardCounter) {
        cardCounter.style.display = 'none';
    }
}

// Update pack counter
function updatePackCounter() {
    if (packCounter) {
        packCounter.textContent = `Pack ${currentPackIndex + 1} of ${packs.length}`;
    }
}

// Open pack function
function openPack() {
    if (isOpening || currentPackIndex >= packs.length) {
        return;
    }

    isOpening = true;
    packButton.disabled = true;
    
    // Get current pack
    currentPack = packs[currentPackIndex];
    currentCardIndex = 0;
    swipedCards = [];
    
    // Hide pack selection, show opening screen
    packContainer.style.display = 'none';
    openPackScreen.style.display = 'flex';
    cardsContainer.style.display = 'flex';
    cardsContainer.innerHTML = '';
    if (summaryContainer) summaryContainer.style.display = 'none';
    
    // Show card counter
    const cardCounter = document.getElementById('card-counter');
    if (cardCounter) {
        cardCounter.style.display = 'block';
    }
    
    // Show first card (face down)
    showNextCard();
}

// Show next card (face down initially)
function showNextCard() {
    if (currentCardIndex >= currentPack.length) {
        // All cards swiped, show summary
        showSummary();
        return;
    }
    
    // Reset swiping flag when showing next card
    isSwiping = false;
    
    cardsContainer.innerHTML = '';
    
    const card = createCardElement(currentCardIndex);
    cardsContainer.appendChild(card);
    
    // Show swipe buttons
    if (swipeButtons) {
        swipeButtons.style.display = 'flex';
    }
    
    // Show card counter
    updateCardCounter();
}

// Create card element
function createCardElement(index) {
    const card = document.createElement('div');
    card.className = 'card swipeable-card';
    card.dataset.index = index;
    
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.innerHTML = '<div class="card-logo">LinkedIn</div>';
    
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    
    const profile = currentPack[index];
    const rarityClass = `rarity-${profile.rarity}`;
    
    cardFront.innerHTML = `
        <div class="card-header">
            <h3 class="card-name">${profile.name}</h3>
        </div>
        <div class="card-image-container ${rarityClass}">
            <img src="${profile.image}" alt="${profile.name}" class="card-image">
            <div class="rarity-badge">${profile.rarity.toUpperCase()}</div>
        </div>
        <div class="card-info">
            <p class="card-title"><strong>Current Job:</strong> ${profile.title}</p>
            <p class="card-program"><strong>Program/University:</strong> ${profile.program}</p>
        </div>
    `;
    
    cardInner.appendChild(cardBack);
    cardInner.appendChild(cardFront);
    card.appendChild(cardInner);
    
    // Initially show card back (not flipped)
    card.classList.add('revealed');
    // Card starts with back visible (not flipped)
    
    // Reveal card front on click
    card.addEventListener('click', () => {
        if (!card.classList.contains('flipped')) {
            card.classList.add('flipped');
        }
    });
    
    return card;
}

// Update card counter
function updateCardCounter() {
    const counter = document.getElementById('card-counter');
    if (counter) {
        counter.textContent = `Card ${currentCardIndex + 1} of ${currentPack.length}`;
    }
}

// Swipe right (like)
function swipeRight() {
    // Prevent double-swiping
    if (isSwiping || currentCardIndex >= currentPack.length) return;
    
    // Set swiping flag to prevent multiple swipes
    isSwiping = true;
    
    const profile = currentPack[currentCardIndex];
    const swipeData = {
        packIndex: currentPackIndex,
        index: currentCardIndex,
        profile: profile,
        direction: 'right'
    };
    
    swipedCards.push(swipeData);
    allSwipedCards.push(swipeData); // Track in global array
    
    // Disable swipe buttons during animation
    const swipeLeftBtn = document.getElementById('swipe-left-btn');
    const swipeRightBtn = document.getElementById('swipe-right-btn');
    if (swipeLeftBtn) swipeLeftBtn.disabled = true;
    if (swipeRightBtn) swipeRightBtn.disabled = true;
    
    // Animate card swipe right
    const card = cardsContainer.querySelector('.card');
    if (card) {
        card.classList.add('swiped-right');
        setTimeout(() => {
            currentCardIndex++;
            showNextCard();
            // Re-enable buttons after showing next card
            if (swipeLeftBtn) swipeLeftBtn.disabled = false;
            if (swipeRightBtn) swipeRightBtn.disabled = false;
        }, 300);
    }
}

// Swipe left (pass)
function swipeLeft() {
    // Prevent double-swiping
    if (isSwiping || currentCardIndex >= currentPack.length) return;
    
    // Set swiping flag to prevent multiple swipes
    isSwiping = true;
    
    const profile = currentPack[currentCardIndex];
    const swipeData = {
        packIndex: currentPackIndex,
        index: currentCardIndex,
        profile: profile,
        direction: 'left'
    };
    
    swipedCards.push(swipeData);
    allSwipedCards.push(swipeData); // Track in global array
    
    // Disable swipe buttons during animation
    const swipeLeftBtn = document.getElementById('swipe-left-btn');
    const swipeRightBtn = document.getElementById('swipe-right-btn');
    if (swipeLeftBtn) swipeLeftBtn.disabled = true;
    if (swipeRightBtn) swipeRightBtn.disabled = true;
    
    // Animate card swipe left
    const card = cardsContainer.querySelector('.card');
    if (card) {
        card.classList.add('swiped-left');
        setTimeout(() => {
            currentCardIndex++;
            showNextCard();
            // Re-enable buttons after showing next card
            if (swipeLeftBtn) swipeLeftBtn.disabled = false;
            if (swipeRightBtn) swipeRightBtn.disabled = false;
        }, 300);
    }
}

// Show summary of swiped cards
function showSummary() {
    cardsContainer.style.display = 'none';
    if (swipeButtons) swipeButtons.style.display = 'none';
    
    // Hide card counter
    const cardCounter = document.getElementById('card-counter');
    if (cardCounter) {
        cardCounter.style.display = 'none';
    }
    
    const rightSwiped = swipedCards.filter(c => c.direction === 'right');
    const leftSwiped = swipedCards.filter(c => c.direction === 'left');
    
    if (summaryContainer) {
        summaryContainer.style.display = 'block';
        summaryContainer.innerHTML = `
            <h2 class="summary-title">Pack ${currentPackIndex + 1} Summary</h2>
            <div class="summary-stats">
                <div class="stat-box">
                    <div class="stat-number">${rightSwiped.length}</div>
                    <div class="stat-label">Swiped Right</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">${leftSwiped.length}</div>
                    <div class="stat-label">Swiped Left</div>
                </div>
            </div>
            <div class="summary-cards">
                <div class="summary-section">
                    <h3 class="section-title">✓ Swiped Right (${rightSwiped.length})</h3>
                    <div class="summary-cards-grid">
                        ${rightSwiped.map(card => createSummaryCard(card.profile, 'right')).join('')}
                    </div>
                </div>
                <div class="summary-section">
                    <h3 class="section-title">✗ Swiped Left (${leftSwiped.length})</h3>
                    <div class="summary-cards-grid">
                        ${leftSwiped.map(card => createSummaryCard(card.profile, 'left')).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Show back button
    if (backButton) {
        backButton.style.display = 'block';
    }
}

// Create summary card
function createSummaryCard(profile, direction) {
    const rarityClass = `rarity-${profile.rarity}`;
    const directionClass = direction === 'right' ? 'swiped-right-summary' : 'swiped-left-summary';
    
    return `
        <div class="summary-card ${directionClass}">
            <div class="summary-card-image ${rarityClass}">
                <img src="${profile.image}" alt="${profile.name}">
                <div class="rarity-badge">${profile.rarity.toUpperCase()}</div>
            </div>
            <div class="summary-card-info">
                <h4>${profile.name}</h4>
                <p>${profile.title}</p>
                <p class="summary-program">${profile.program}</p>
            </div>
        </div>
    `;
}

// Open next pack
function openNextPack() {
    currentPackIndex++;
    
    if (currentPackIndex >= packs.length) {
        // All packs opened - show final summary
        showFinalSummary();
        return;
    }
    
    updatePackCounter();
    showPackSelection();
}

// Show final summary of all swiped cards across all packs
function showFinalSummary() {
    cardsContainer.style.display = 'none';
    if (swipeButtons) swipeButtons.style.display = 'none';
    
    // Hide card counter
    const cardCounter = document.getElementById('card-counter');
    if (cardCounter) {
        cardCounter.style.display = 'none';
    }
    
    const rightSwiped = allSwipedCards.filter(c => c.direction === 'right');
    const leftSwiped = allSwipedCards.filter(c => c.direction === 'left');
    
    if (summaryContainer) {
        summaryContainer.style.display = 'block';
        summaryContainer.innerHTML = `
            <h2 class="summary-title">Final Summary - All Packs</h2>
            <div class="summary-stats">
                <div class="stat-box">
                    <div class="stat-number">${rightSwiped.length}</div>
                    <div class="stat-label">Total Swiped Right</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">${leftSwiped.length}</div>
                    <div class="stat-label">Total Swiped Left</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">${allSwipedCards.length}</div>
                    <div class="stat-label">Total Cards</div>
                </div>
            </div>
            <div class="summary-cards">
                <div class="summary-section">
                    <h3 class="section-title">✓ Swiped Right (${rightSwiped.length})</h3>
                    <div class="summary-cards-grid">
                        ${rightSwiped.map(card => createSummaryCard(card.profile, 'right')).join('')}
                    </div>
                </div>
                <div class="summary-section">
                    <h3 class="section-title">✗ Swiped Left (${leftSwiped.length})</h3>
                    <div class="summary-cards-grid">
                        ${leftSwiped.map(card => createSummaryCard(card.profile, 'left')).join('')}
                    </div>
                </div>
            </div>
            <div style="text-align: center; margin-top: 30px;">
                <button onclick="location.reload()" class="submit-button">Start Over</button>
            </div>
        `;
    }
    
    // Hide back button
    if (backButton) {
        backButton.style.display = 'none';
    }
}

// Event Listeners
window.addEventListener('DOMContentLoaded', () => {
    init();
});

if (packButton) {
    packButton.addEventListener('click', openPack);
}

if (backButton) {
    backButton.addEventListener('click', openNextPack);
}

// Swipe button listeners
const swipeLeftBtn = document.getElementById('swipe-left-btn');
const swipeRightBtn = document.getElementById('swipe-right-btn');

if (swipeLeftBtn) {
    swipeLeftBtn.addEventListener('click', swipeLeft);
}

if (swipeRightBtn) {
    swipeRightBtn.addEventListener('click', swipeRight);
}
