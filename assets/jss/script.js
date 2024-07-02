document.addEventListener('DOMContentLoaded', function() {
    const bottomTextButton = document.getElementById('bottom-text');

    bottomTextButton.addEventListener('click', function() {
        window.location.href = 'services.html';
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const continueButton = document.getElementById('continueButton');
    if (continueButton) {
        continueButton.addEventListener('click', function() {
            window.location.href = 'feedback.html';
        });
    }
});
