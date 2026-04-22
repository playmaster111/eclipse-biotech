/**
 * Eclipse Biotech - Custom Cursor System
 * High-fidelity interaction layer
 */

(function() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    if (!cursor || !follower) return;

    // Create HUD Label
    const label = document.createElement('div');
    label.className = 'cursor-label';
    follower.appendChild(label);

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

        // Update HUD label
        label.innerText = `X:${Math.round(cursorX)} Y:${Math.round(cursorY)}`;
    });

    const animateCursor = () => {
        followerX += (cursorX - followerX) * 0.15;
        followerY += (cursorY - followerY) * 0.15;
        
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
