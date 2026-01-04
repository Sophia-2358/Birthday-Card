const senderName = document.getElementById('senderName');
const namePicker = document.getElementById('namePicker');
const recipientName = document.getElementById('recipientName');
const theme = document.getElementById('theme');
const customMessageGroup = document.getElementById('customMessageGroup');
const customMessage = document.getElementById('customMessage');
const generateBtn = document.getElementById('generateBtn');
const card = document.getElementById('card');
const cardTitle = document.getElementById('cardTitle');
const cardFrom = document.getElementById('cardFrom');
const cardTo = document.getElementById('cardTo');
const cardMessage = document.getElementById('cardMessage');

// When namePicker changes, put the value in recipientName input
namePicker.addEventListener('change', function() {
    if (this.value) {
        recipientName.value = this.value;
    }
});

// Show/hide custom message textarea when Custom theme is selected
theme.addEventListener('change', function() {
    if (this.value === 'Custom') {
        customMessageGroup.style.display = 'block';
    } else {
        customMessageGroup.style.display = 'none';
    }
});

generateBtn.addEventListener('click', function() {
    const sender = senderName.value.trim();
    const recipient = recipientName.value.trim();
    const selectedTheme = theme.value;

    if (!sender) {
        alert('Please enter your name (sender)!');
        return;
    }

    if (!recipient) {
        alert('Please select or enter a recipient name!');
        return;
    }

    // Set card content
    cardFrom.textContent = `From: ${sender}`;
    cardTo.textContent = `To: ${recipient}`;

    if (selectedTheme === 'Birthday') {
        cardTitle.textContent = '🎉 Happy Birthday! 🎉';
        cardMessage.textContent = `Wishing you a day filled with love, joy, and wonderful surprises! May all your dreams come true this year!`;
        card.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    } else if (selectedTheme === 'Kaarawan') {
        cardTitle.textContent = '🎂 Maligayang Kaarawan! 🎂';
        cardMessage.textContent = `Nawa'y mapuno ng saya, pagmamahal, at mga pagpapala ang iyong espesyal na araw! Matupad sana ang lahat ng iyong mga pangarap!`;
        card.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    } else if (selectedTheme === 'Custom') {
        const customMsg = customMessage.value.trim();
        if (!customMsg) {
            alert('Please enter a custom message!');
            return;
        }
        cardTitle.textContent = '✨ Special Greeting ✨';
        cardMessage.textContent = customMsg;
        card.style.background = 'linear-gradient(135deg, #ffa751 0%, #ffe259 100%)';
    }

    card.style.display = 'block';
    
    // Save to Firebase
    saveCardToFirebase(sender, recipient, selectedTheme, cardMessage.textContent);
});

// Function to save card to Firebase
function saveCardToFirebase(sender, recipient, theme, message) {
    db.collection('greetingCards').add({
        sender: sender,
        recipient: recipient,
        theme: theme,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
        console.log('Card saved with ID:', docRef.id);
        alert('Card saved successfully! 🎉');
    })
    .catch((error) => {
        console.error('Error saving card:', error);
        alert('Error saving card. Please try again.');
    });
}

// Search and display cards
const searchBtn = document.getElementById('searchBtn');
const searchName = document.getElementById('searchName');
const cardsContainer = document.getElementById('cardsContainer');

searchBtn.addEventListener('click', function() {
    const name = searchName.value.trim();
    
    if (!name) {
        alert('Please enter your name to view cards!');
        return;
    }
    
    // Show loading message
    cardsContainer.innerHTML = '<p class="no-cards">Loading your cards...</p>';
    
    // Query Firebase for cards where recipient matches the name
    db.collection('greetingCards')
        .where('recipient', '==', name)
        .orderBy('timestamp', 'desc')
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                cardsContainer.innerHTML = '<p class="no-cards">No birthday cards found for you yet! 🎂</p>';
                return;
            }
            
            cardsContainer.innerHTML = '';
            
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const cardDiv = document.createElement('div');
                cardDiv.className = 'saved-card';
                
                cardDiv.innerHTML = `
                    <div class="saved-card-header">${data.theme === 'Birthday' ? '🎉 Happy Birthday! 🎉' : data.theme === 'Kaarawan' ? '🎂 Maligayang Kaarawan! 🎂' : '✨ Special Greeting ✨'}</div>
                    <div class="saved-card-info">From: ${data.sender}</div>
                    <div class="saved-card-info">To: ${data.recipient}</div>
                    <div class="saved-card-message">${data.message}</div>
                `;
                
                cardsContainer.appendChild(cardDiv);
            });
        })
        .catch((error) => {
            console.error('Error getting cards:', error);
            cardsContainer.innerHTML = '<p class="no-cards">Error loading cards. Please try again.</p>';
        });
});
