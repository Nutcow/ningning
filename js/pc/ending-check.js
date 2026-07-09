(function checkEndingState() {
    if (localStorage.getItem('win10_ending_reached') === 'true') {
        const type = localStorage.getItem('win10_ending_type') || 1;
        function tryShowEnding() {
            if (document.body) {
                document.body.style.transition = 'background 1s ease';
                document.body.style.background = '#000';
                document.body.style.overflow = 'hidden';
                showEndingScreen(type, true);
            } else {
                setTimeout(tryShowEnding, 100);
            }
        }
        tryShowEnding();
    }
})();
