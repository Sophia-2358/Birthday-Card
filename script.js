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
});