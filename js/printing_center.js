let printCenterClassObj = {
    jsId : {
        printJobsCompleted : '#PrintJobsCompleted',
        printPanelPageSubheader : '#PrintPanelPageSubheader',
        printPanelPageBreadcrumb : '#PrintPanelPageBreadcrumb',
        printPanelPageBreadcrumbDate : '#PrintPanelPageBreadcrumbDate',
        printPanelHTML : '#PrintPanelHTML',
        jobPillPanelHTML : '#JobPillPanelHTML'
    },
    jsClass : {
        jobPillDivClass : '.badge-pill-wrapper',
        jobPillBtn : 'job-pill',
    },
    jsAttr : {
        jobPillInnerText : 'innertext'
    },
    jsValue : {
        jobPillDivClass : ''
    }
}

class printCenterClass {
    constructor (external) {
        this.ext = external;
    }

    getJobDetails() {
        var ids = this.ext.jsId;

        $(ids.printPanelPageSubheader).fadeOut(500);
        $(ids.printPanelPageBreadcrumb).fadeIn(500);
        $(ids.printPanelPageBreadcrumbDate).fadeOut(500);
        $(ids.printPanelHTML).fadeOut(500);
        $(ids.jobPillPanelHTML).fadeIn(500);
    }

    updateJobStatusToCompleted(event) {
        var ids = this.ext.jsId;
        var jsValue = this.ext.jsValue;

        $(jsValue.jobPillDivClass).children().removeClass('started');
        $(jsValue.jobPillDivClass).children().addClass('delivered');


        const dragElement = $(jsValue.jobPillDivClass);
        const dragdropzone = $(ids.printJobsCompleted);

        dragdropzone.append(dragElement);

    }

    onDragStart(event) {
        var jsValue = this.ext.jsValue;
        
        jsValue.jobPillDivClass = event.target;


    }

    onDragOver(event) {

        event.preventDefault();
        
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