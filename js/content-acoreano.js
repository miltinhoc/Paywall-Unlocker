var articleBodyClassName = ".article-body";
var articlePremiumId = "#premium-block";
var removeAll = (parent) => { while(parent.firstChild) { parent.removeChild(parent.firstChild); }};

/**
 * Entry point of the extension
 */
( () => {
    var pb = document.querySelector(articlePremiumId);

    if (pb != null)
    {
        // article is premium
        var story = document.querySelectorAll("meta[name=description]")[1].content;

        if (story != null)
        {
            var articleBody = document.querySelector(articleBodyClassName);

            removeAll(articleBody);
            articleBody.innerHTML = story;
        }
    }
})();