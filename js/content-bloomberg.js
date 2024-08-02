var heading_class = "media-ui-Subhead_subhead-kvbO7lQX1LU-";
var paragraph_class = "media-ui-Paragraph_text-SqIsdNjh0t0-";
var ul_class = "media-ui-UnorderedList_unorderedList-7VnRVJDGrzM-";
var il_class = "media-ui-UnorderedList_item-rgtJA5F2ZB4-";
var blur_body_class = "styles_articleBlur__G34p_";

var script_selector = "script#__NEXT_DATA__";
var body_class_selector = ".body-content"

//TODO:
// 1. Add links
// 2. Add graphs
// 3. Add lists

function extractNextData()
{
    const scriptTag = document.querySelector(script_selector);
    if (scriptTag)
    {
        const jsonData = JSON.parse(scriptTag.textContent);
        console.log(jsonData.props.pageProps.story.body);

        if (document.querySelector(body_class_selector))
        {
            var h = buildHtml(jsonData.props.pageProps.story.body.content);
            document.querySelector(body_class_selector).innerHTML = h;

            const targetNode = document.querySelector(body_class_selector);
            if (targetNode && targetNode.classList.contains(blur_body_class))
            {
                targetNode.classList.remove(blur_body_class);
            }
        }
    }
}

function buildHtml(jsonObj)
{
    var htmlBody = "";
    jsonObj.forEach(element =>
    {
        if (element.type == "paragraph")
        {
            var current_paragraph = `<p class="${paragraph_class}" data-component="paragraph">`
            element.content.forEach(p => {
                if (p.type == "text"){
                    current_paragraph += p.value;
                }
                if (p.type == "link"){
                    current_paragraph += p.content[0].value;
                }
            });

            current_paragraph+= "</p>"
            htmlBody += current_paragraph;
        }
    });

    return htmlBody;
}
  
function waitForElement(selector, callback)
{
    const observer = new MutationObserver((mutations, me) => 
    {
        if (document.querySelector(selector))
        {
            callback();
            me.disconnect();
        }
    });

    observer.observe(document, {
        childList: true,
        subtree: true
    });
}
  

function waitForTransformation()
{
    const targetNode = document.querySelector(body_class_selector);
    if (!targetNode)
    {
      return;
    }
  
    const config = { attributes: true, attributeFilter: ['class'], subtree: true };
  
    const callback = function(mutationsList, observer)
    {
      for (const mutation of mutationsList)
      {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class')
        {
          if (mutation.target.classList.contains(blur_body_class))
          {
            observer.disconnect();
            waitForElement(script_selector, extractNextData);
          }
        }
      }
    };
  
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

waitForTransformation();
