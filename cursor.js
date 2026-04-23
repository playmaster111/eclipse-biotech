(function() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        document.body.classList.remove('custom-cursor-active');
        return;
    }

    // Force activation of CSS class
    document.body.classList.add('custom-cursor-active');

    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    let isVisible = false;

    // Move to mouse initial position if possible
    cursor.style.opacity = '0';
    follower.style.opacity = '0';

    window.addEventListener('mousemove', (e) => {
        if (!isVisible) {
            cursor.style.opacity = '1';
            follower.style.opacity = '1';
            isVisible = true;
        }
        
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
    });

    const animateCursor = () => {
        // Molecular trailing (slightly tighter than before)
        followerX += (cursorX - followerX) * 0.2;
        followerY += (cursorY - followerY) * 0.2;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const interactiveElements = 'a, button, .nav-item, .nav-folder-head, input, select, .copy-btn, .ai-quick-btn, #main-logo, .lang-option, .clickable, .close-modal';
    
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveElements)) {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveElements)) {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        }
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
        follower.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
        follower.classList.remove('clicking');
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
        isVisible = false;
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
        isVisible = true;
    });
})();
