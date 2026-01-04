// Save card to Firebase (instead of localStorage)
saveBtn.addEventListener('click', async function() {
    if (!currentCard) return;

    try {
        await db.collection('greetingCards').add({
            ...currentCard,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        alert('✅ Card saved successfully online!');
        updateSavedCount();
    } catch (error) {
        console.error('Error saving card:', error);
        alert('❌ Failed to save card. Please try again.');
    }
});

// Load saved cards from Firebase
async function displaySavedCards() {
    try {
        const snapshot = await db.collection('greetingCards')
            .orderBy('createdAt', 'desc')
            .get();
        
        if (snapshot.empty) {
            savedCardsGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📭</div>
                    <p>No saved cards yet. Create and save your first greeting card!</p>
                </div>
            `;
            return;
        }

        savedCardsGrid.innerHTML = '';
        snapshot.forEach((doc) => {
            const card = doc.data();
            const cardElement = document.createElement('div');
            cardElement.className = 'saved-card-item';
            cardElement.style.background = card.background;
            cardElement.innerHTML = `
                <button class="delete-btn" onclick="deleteCardFirebase('${doc.id}')">×</button>
                <div class="card-title">${card.title}</div>
                <div class="card-from">From: ${card.from}</div>
                <div class="card-to">To: ${card.to}</div>
                <div class="card-message">${card.message}</div>
            `;
            savedCardsGrid.appendChild(cardElement);
        });
    } catch (error) {
        console.error('Error loading cards:', error);
        savedCardsGrid.innerHTML = '<p>Error loading cards. Please refresh.</p>';
    }
}

// Delete card from Firebase
async function deleteCardFirebase(docId) {
    if (confirm('Are you sure you want to delete this card?')) {
        try {
            await db.collection('greetingCards').doc(docId).delete();
            displaySavedCards();
            updateSavedCount();
            alert('✅ Card deleted successfully!');
        } catch (error) {
            console.error('Error deleting card:', error);
            alert('❌ Failed to delete card.');
        }
    }
}

// Update count from Firebase
async function updateSavedCount() {
    try {
        const snapshot = await db.collection('greetingCards').get();
        savedCount.textContent = snapshot.size;
    } catch (error) {
        console.error('Error counting cards:', error);
    }
}
