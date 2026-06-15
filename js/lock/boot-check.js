var isSkip = localStorage.getItem('win10_zhoumu2') === 'true' || 
                 localStorage.getItem('win10_zhoumu3') === 'true' || 
                 localStorage.getItem('win10_first_boot_done') === 'true';
                 
if (!isSkip) {
    document.write('<style id="first-boot-style">#lockscreen, .login-screen { display: none !important; } #win10-oobe-screen { display: flex !important; }</style>');
}
