let projectManangementClassObj = {
    jsId : {
        panelHtml : '#panelHtml',
        ProjectsDiv : '#ProjectsDiv',
        SchoolsDiv : '#SchoolsDiv',
        PrintPressDiv : '#PrintPressDiv',
        ProjectOfficersDiv : '#ProjectOfficersDiv',
        QualityOfficersDiv : '#QualityOfficersDiv',
        managementPageHeader : '#management-page-header',
    },
    jsData : {
        projects : 'Projects',
        schools : 'Schools',
        projectOfficers : 'Project Officers',
        printPress : 'Print Press',

    }
}

class projectManagementClass {
    constructor(external) {
        this.ext = external;
    }

    

    showHideDiv(div) {
        var jsId = this.ext.jsId;
        var jsData = this.ext.jsData;

        if(div == jsId.ProjectsDiv) {
            $(jsId.ProjectsDiv).show(300);
            $(jsId.SchoolsDiv).hide(300);
            $(jsId.PrintPressDiv).hide(300);
            $(jsId.ProjectOfficersDiv).hide(300);
            $(jsId.QualityOfficersDiv).hide(300);
            commonObj.changeInnerText(jsId.managementPageHeader, jsData.projects);
        }

        if(div == jsId.SchoolsDiv) {
            $(jsId.ProjectsDiv).hide(300);
            $(jsId.SchoolsDiv).show(300);
            $(jsId.PrintPressDiv).hide(300);
            $(jsId.ProjectOfficersDiv).hide(300);
            $(jsId.QualityOfficersDiv).hide(300);
            commonObj.changeInnerText(jsId.managementPageHeader, jsData.schools);

        }

        if(div == jsId.PrintPressDiv) {
            $(jsId.ProjectsDiv).hide(300);
            $(jsId.SchoolsDiv).hide(300);
            $(jsId.PrintPressDiv).show(300);
            $(jsId.ProjectOfficersDiv).hide(300);
            $(jsId.QualityOfficersDiv).hide(300);
            commonObj.changeInnerText(jsId.managementPageHeader, jsData.printPress);

        }

        if(div == jsId.ProjectOfficersDiv) {
            $(jsId.ProjectsDiv).hide(300);
            $(jsId.SchoolsDiv).hide(300);
            $(jsId.PrintPressDiv).hide(300);
            $(jsId.ProjectOfficersDiv).show(300);
            $(jsId.QualityOfficersDiv).hide(300);
            commonObj.changeInnerText(jsId.managementPageHeader, jsData.projectOfficers);

        }

        if(div == jsId.QualityOfficersDiv) {
            $(jsId.ProjectsDiv).hide(300);
            $(jsId.SchoolsDiv).hide(300);
            $(jsId.PrintPressDiv).hide(300);
            $(jsId.ProjectOfficersDiv).hide(300);
            $(jsId.QualityOfficersDiv).show(300);
        }


    }
}

var projectManagementObj = new projectManagementClass(projectManangementClassObj)