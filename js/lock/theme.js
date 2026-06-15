const userNameEl = document.getElementById('user-name');

if (localStorage.getItem('win10_zhoumu3') === 'true') {
    document.body.classList.add('zhoumu3');
    if (userNameEl) {
        userNameEl.innerText = '若宁';
    }
} else if (localStorage.getItem('win10_zhoumu2') === 'true') {
    document.body.classList.add('zhoumu2');
}
