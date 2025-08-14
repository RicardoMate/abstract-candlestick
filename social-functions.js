// 🌐 Social Media Functions for PEPE MOON Website

function openSocial(platform) {
    const urls = {
        twitter: 'https://twitter.com/pepemoon',
        telegram: 'https://t.me/pepemoon'
    };
    
    if (urls[platform]) {
        window.open(urls[platform], '_blank');
    } else {
        console.log('Platform not supported:', platform);
    }
}

// Add click event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌐 Social functions loaded');
});


