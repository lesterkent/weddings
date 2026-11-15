// 1. Envelope opening interaction
const envelopeOverlay = document.getElementById('envelope-overlay');
const envelopeContainer = document.getElementById('envelope-container');
const waxSeal = document.getElementById('wax-seal');

function openEnvelope() {
    envelopeContainer.classList.add('envelope-open');
    setTimeout(() => {
        envelopeOverlay.style.opacity = '0';
        setTimeout(() => {
            envelopeOverlay.style.display = 'none';
            // Trigger confetti celebration on opening
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#C5A880', '#EAD5D1', '#A3B19B', '#FAF7F2']
            });
        }, 800);
    }, 500);
}

waxSeal.addEventListener('click', openEnvelope);
envelopeContainer.addEventListener('click', openEnvelope);

// 2. Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

    // Target Date: January 9, 2027 at 12:00 AM (adjust time if needed, e.g., "January 9, 2027 15:00:00")
    const weddingDate = new Date("January 9, 2027 00:00:00").getTime();

    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display with leading zeros (e.g., "09")
        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

        // If the countdown is over
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("countdown").innerHTML = "<p class='col-span-full font-serif text-2xl text-wedding-charcoal'>Today is the day!</p>";
        }
    }, 1000);


// 4. RSVP Form Submission & LocalStorage
const rsvpForm = document.getElementById('rsvp-form');
const rsvpSuccess = document.getElementById('rsvp-success');
const resetRsvpBtn = document.getElementById('reset-rsvp');

// Check if RSVP exists in localStorage
const savedRsvp = localStorage.getItem('wedding_rsvp');
if (savedRsvp) {
    const data = JSON.parse(savedRsvp);
    showRsvpSuccessState(data);
}

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(rsvpForm);
    const data = {
        attendance: formData.get('attendance'),
        fullname: formData.get('fullname') || 'Valued Guest',
        guestcount: formData.get('guestcount') || '1',
        email: formData.get('email'),
        dietary: formData.get('dietary') || 'None'
    };

    localStorage.setItem('wedding_rsvp', JSON.stringify(data));
    showRsvpSuccessState(data);

    if (data.attendance === 'accept') {
        confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.7 }
        });
    }
});

function showRsvpSuccessState(data) {
    rsvpForm.classList.add('hidden');
    rsvpSuccess.classList.remove('hidden');
    const successTitle = document.getElementById('success-title');
    const successMessage = document.getElementById('success-message');

    if (data.attendance === 'accept') {
        successTitle.innerText = "We Can't Wait to Celebrate!";
        successMessage.innerHTML = `Thank you, <strong class="text-wedding-charcoal">${data.fullname}</strong>! Your RSVP for <strong class="text-wedding-charcoal">${data.guestcount} guest(s)</strong> has been recorded. See you in Napa Valley!`;
    } else {
        successTitle.innerText = "We Will Miss You!";
        successMessage.innerHTML = `Thank you, <strong class="text-wedding-charcoal">${data.fullname}</strong>. We are sad you cannot make it, but we appreciate you letting us know.`;
    }
}

resetRsvpBtn.addEventListener('click', () => {
    localStorage.removeItem('wedding_rsvp');
    rsvpSuccess.classList.add('hidden');
    rsvpForm.classList.remove('hidden');
    rsvpForm.reset();
});

// 5. Song Request Form Submission
const songForm = document.getElementById('song-form');
const songSuccess = document.getElementById('song-success');

songForm.addEventListener('submit', (e) => {
    e.preventDefault();
    songSuccess.classList.remove('hidden');
    songForm.reset();
    setTimeout(() => {
        songSuccess.classList.add('hidden');
    }, 5000);
});

// 6. FAQ Accordion Toggles
const faqToggles = document.querySelectorAll('.faq-toggle');
faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('i');
        
        // Toggle current
        content.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    });
});

// 7. Modal Functions (replacing alert())
const customModal = document.getElementById('custom-modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');

function showModal(title, text) {
    modalTitle.innerText = title;
    modalText.innerText = text;
    customModal.classList.remove('hidden');
}

function closeModal() {
    customModal.classList.add('hidden');
}