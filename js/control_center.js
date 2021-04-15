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
        submittedProgress : "#SubmittedProgress"
    },
    jsAttr : {
        style : "style",
        ariaValueMax : "aria-valuemax"
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
            query{
                getSchools(input: {
                perPage: 20,
                pageNumber: 1
            }) {
                schools{
                schoolCode
                schoolName
                population
                status
                locationName
                projectOfficers{
                    fullName
                    img
                }
                }
                total
            }
            }
            ` 
        }),
        });

        return response.json();
        
    }

    setProgressKeys(keyValue = '') {
        var ids = this.ext.jsId;
        var attrs = this.ext.jsAttr;

        var target = '';
        var activeOfficers = '';
        var delivered = '';
        var printed = '';
        var submitted = '';
        var totalCompletion = '';
        var started = '';

        if(keyValue != '') {
           
            var target = keyValue.target;
            var activeOfficers = keyValue.activeOfficers;
            var delivered = keyValue.delivered;
            var printed = keyValue.printed;
            var submitted = keyValue.submitted;
            var totalCompletion = keyValue.totalCompletion;
            var started = keyValue.started;

            commonObj.changeInnerText(ids.targetSpan, target);
            commonObj.setAttribute(ids.targetProgress, attr.style, "width: 30%" );
        }
    }
}

var controlCenterObj = new controlCenterClass(controlCenterClassObj);

/*
controlCenterObj.getSchools()
  .then(data => {
    console.log(data.data.getSchools.schools);
});*/