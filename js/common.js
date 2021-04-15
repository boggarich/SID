class commonClass {

    changeInnerHtmlByEvent(element, html="") {
        $(element).html(html);    
    }

    changeOuterHtml(element, html="") {
        element.outerHTML = html;
    }

    changeInnerHtml(element, html="") {
        element.innerHTML = html;
    }

    changeInnerText(element, text="") {
        
       $(element).text(text);
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setAttribute(element ,attr, value) {
        $(element).attr(attr, value);
    }

}

var commonObj = new commonClass;