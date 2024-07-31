function waitForElementAndRemove(selector, callback) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && node.matches(selector)) {
                    callback(node);
                }
            });
            if (mutation.type === 'attributes' && mutation.target.matches(selector)) {
                callback(mutation.target);
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
    });

    document.querySelectorAll(selector).forEach((element) => {
        callback(element);
    });
}

function removePaywall() {
    waitForElementAndRemove('.paywall-selector.paywallFade', (element) => {
        element.remove();
    });

    waitForElementAndRemove('.paywall.paywallActive', (element) => {
        element.style.filter = 'none';
    });
}

removePaywall();