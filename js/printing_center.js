let printCenterClassObj = {
    jsClass : {
        jobPillDivClass : '.badge-pill-wrapper',
        jobPillBtn : 'job-pill',
    },
    jsAttr : {
        jobPillInnerText : 'innertext'
    }
}

class printCenterClass {
    constructor (external) {
        this.ext = external;
    }

    changeInnerHtmlByEvent(event, html) {
        var jsClass = this.ext.jsClass
        var target = event.target;

        if($(target).hasClass(jsClass.jobPillBtn)) {
            commonObj.changeInnerHtmlByEvent(target, html)
        }

        
    }


    download(event) {
        var jsClass = this.ext.jsClass;
        var jsAttr = this.ext.jsAttr;

        var target = event.target;
        var targetInnerText = $(target).data(jsAttr.jobPillInnerText);

        console.log(targetInnerText)

        var targetParentNode = event.target.closest(jsClass.jobPillDivClass);

        if($(target).hasClass(jsClass.jobPillBtn)) {
            $(target).removeClass(jsClass.jobPillBtn);
            commonObj.changeOuterHtml(target, '<span class="d-flex badge badge-pill project-status downloading text-white"><i class="fal fa-arrow-down"></i> <span class="flex-grow-1">25%</span></span>')
        }

        
        setTimeout(() => {
            commonObj.changeOuterHtml(targetParentNode, '<span class="d-flex badge badge-pill project-status downloaded text-white"><i class="fal fa-arrow-down"></i> <span class="flex-grow-1">100%</span></span>')
        }, 5000);

        /*
        setTimeout(() => {
            commonObj.changeInnerHtml(targetParentNode, `<span class="badge badge-pill project-status job-pill started text-white" onmouseover="printCenterObj.changeInnerHtmlByEvent(event, 'Download')" onmouseout="printCenterObj.changeInnerHtmlByEvent(event, '${targetInnerText}')" onclick="printCenterObj.download(event)" data-innerText="${targetInnerText}">${targetInnerText}</span>`)
        }, 5000)*/
        
    }
}

var printCenterObj = new printCenterClass(printCenterClassObj)