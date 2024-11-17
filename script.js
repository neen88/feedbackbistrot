document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll('.stars span');
    const feedbackSection = document.getElementById('feedback-section');
    const feedbackText = document.getElementById('feedback-text');
    const submitFeedback = document.getElementById('submit-feedback');
    const thankYouMessage = document.getElementById('thank-you-message');
    const closeMessageButton = document.getElementById('close-message');
    
    let selectedRating = 0;

    // Rilevazione della lingua del dispositivo
    const userLanguage = navigator.language || navigator.userLanguage;
    if (userLanguage.startsWith('fr')) {
        document.querySelector('h2').textContent = "Évaluez notre service";
    } else {
        document.querySelector('h2').textContent = "Rate our service";
    }

    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            highlightStars(index + 1);
        });

        star.addEventListener('mouseout', () => {
            highlightStars(selectedRating);
        });

        star.addEventListener('click', () => {
            selectedRating = index + 1;
            highlightStars(selectedRating);

            if (selectedRating <= 3) {
                feedbackSection.style.display = 'block';
                feedbackSection.classList.add('active');
            } else {
                feedbackSection.style.display = 'none';
                feedbackSection.classList.remove('active');
                window.location.href = 'https://g.page/r/CeKaVCQqeuzPEAE/review'; // Link alla tua pagina Google My Business
                
                setTimeout(() => {
                    window.close(); // Chiude la pagina dopo la valutazione a 4 o 5 stelle
                }, 15000); // Tempo di chiusura di 15 secondi
            }
        });
    });

    submitFeedback.addEventListener('click', () => {
        if (selectedRating <= 3 && feedbackText.value.trim() !== "") {
            feedbackSection.style.display = 'none'; // Nascondi la sezione di feedback
            showThankYouMessage(); // Mostra il messaggio di ringraziamento

            setTimeout(() => {
                window.close(); // Chiude la pagina dopo il feedback
            }, 15000); // Tempo di chiusura di 15 secondi
        } else if (selectedRating <= 3) {
            alert("Veuillez entrer votre retour.");
        }
    });

    closeMessageButton.addEventListener('click', () => {
        thankYouMessage.style.display = 'none';
        window.close(); // Chiude la pagina quando si chiude il messaggio
    });

    function highlightStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    function showThankYouMessage() {
        thankYouMessage.style.display = 'block';
    }
});
