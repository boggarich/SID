let controlCenterClassObj = {
    jsId : {
        targetSpan : "#TargetSpan",
        targetProgress : "#TargetProgress",
        startedSpan : "#StartedSpan",
        startedProgress : "#StartedProgress",
        deliveredSpan : "#DeliveredSpan",
        deliveredProgress : "#DeliveredProgress",
        printedSpan : "#PrintedSpan",
        printedProgress : "#PrintedProgress",
        submittedSpan : "#SubmittedSpan",
        submittedProgress : "#SubmittedProgress",
        overallCompletion : "#OverallCompletion",
        activeOfficers : "#ActiveOfficers"

        //Add app Release

    },
    jsAttr : {
        style : "style",
        ariaValueMax : "aria-valuemax",
        ariaValueNow : "aria-valuenow",
        ariaValueMin : "aria-valuemin",
        dataPercent : "data-percent",
    }
}

class controlCenterClass {
    constructor(external) {
        this.ext = external;
    }

    async getSchools() {
        
        const response = await fetch('https://staging.api.desafrica.com/v1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `
            query GetSchools($input : GetSchoolsInput!){
                getSchools(input: $input) {
                schools{
                schoolCode
                schoolName
                population
                status
                locationName
                projectOfficers{
                    fullName
                }
                }
                total
            }
            }
            ` ,
            variables : {
                "input":  {
                    "perPage": 20,
                    "pageNumber": 0
                }
            }
        }),
        });

        return await response.json();
        
    }

    setProgressKeys(keyValue = '', full = '') {
        var ids = this.ext.jsId;
        var attrs = this.ext.jsAttr;

        var target = '';
        var activeOfficers = '';
        var delivered = '';
        var printed = '';
        var submitted = '';
        var totalCompletion = '';
        var started = '';

        

        if(keyValue != '' && full != '') {
           
            //console.log(full)

            var target = keyValue.target;
            var activeOfficers = keyValue.activeOfficers;
            var delivered = keyValue.delivered;
            var printed = keyValue.printed;
            var submitted = keyValue.submitted;
            var totalCompletion = keyValue.totalCompletion;
            var started = keyValue.started;
            // var totalSchools = full.totalSchools;
            var totalSchools = 721;

            totalSchools = +totalSchools;

            var targetPercent = (+target / totalSchools) * 100;
            var startedPercent = (+started / totalSchools) * 100;
            var submittedPercent = (+submitted / totalSchools) * 100;
            var printedPercent = (+printed / totalSchools) * 100;
            var deliveredPercent = (+delivered / totalSchools) * 100;

            var overallCompletionPercent = keyValue.overallCompletion;
        


            commonObj.changeInnerText(ids.targetSpan, `${ target } / ${ totalSchools }`);
            commonObj.setAttribute(ids.targetProgress, attrs.style, `width: ${targetPercent}%`);
            commonObj.setAttribute(ids.targetProgress, attrs.ariaValueMax, full.totalSchoools);
            commonObj.setAttribute(ids.targetProgress, attrs.ariaValueNow, target);

            commonObj.changeInnerText(ids.startedSpan, `${startedPercent.toFixed()}%`);
            commonObj.setAttribute(ids.startedProgress, attrs.style, `width: ${startedPercent}%`);
            commonObj.setAttribute(ids.startedProgress, attrs.ariaValueMax, full.totalSchoools);
            commonObj.setAttribute(ids.targetProgress, attrs.ariaValueNow, started);

            commonObj.changeInnerText(ids.submittedSpan, `${submittedPercent.toFixed()}%`);
            commonObj.setAttribute(ids.submittedProgress, attrs.style, `width: ${submittedPercent}%`);
            commonObj.setAttribute(ids.submittedProgress, attrs.ariaValueMax, totalSchools);
            commonObj.setAttribute(ids.submittedProgress, attrs.ariaValueNow, submitted);

            commonObj.changeInnerText(ids.printedSpan, `${printed} / ${ totalSchools }`);
            commonObj.setAttribute(ids.printedProgress, attrs.style, `width: ${printedPercent}%`);
            commonObj.setAttribute(ids.printedProgress, attrs.ariaValueMax, totalSchools);
            commonObj.setAttribute(ids.printedProgress, attrs.ariaValueNow, printed);

            commonObj.changeInnerText(ids.deliveredSpan, `${delivered} / ${ totalSchools }`);
            commonObj.setAttribute(ids.deliveredProgress, attrs.style, `width: ${deliveredPercent}%`);
            commonObj.setAttribute(ids.deliveredProgress, attrs.ariaValueMax, totalSchools);
            commonObj.setAttribute(ids.deliveredProgress, attrs.ariaValueNow, delivered);

            commonObj.setAttribute(ids.overallCompletion, attrs.dataPercent, overallCompletion);


        }
    }
}

var controlCenterObj = new controlCenterClass(controlCenterClassObj);

/*
controlCenterObj.getSchools()
  .then(data => {
    console.log(data.data.getSchools.schools);
});*/