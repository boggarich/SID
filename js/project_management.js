let projectManagementClassObj = {
    jsId : {
        panelHtml             : '#panelHtml',
        ProjectsDiv           : '#ProjectsDiv',
        SchoolsDiv            : '#SchoolsDiv',
        PrintPressDiv         : '#PrintPressDiv',
        ProjectOfficersDiv    : '#ProjectOfficersDiv',
        QualityOfficersDiv    : '#QualityOfficersDiv',
        managementPageHeader  : '#management-page-header',
        newProjectName        : "#NewProjectName",
        newCardTitle          : "#NewCardTitle",
        newInstitutionType    : '#NewInstitutionType',
        newFirstName          : "#NewFirstName",
        newSecondName         : "#NewSecondName",
        newMiddleName         : '#NewMiddleName',
        newIssueDate          : "#NewIssueDate",
        newIdNo               : "#NewIdNo",
        newQrCode             : "#NewQrCode",
        newProjectDurationStartDate : '#NewProjectDurationStartDate',
        newProjectDurationEndDate : '#NewProjectDurationEndDate',
        newCardSize           : '#NewCardSize',
        newPressName          : "#NewPressName",
        newPressGpsCode       : "#NewPressGpsCode",
        newPressLocation      : "#NewPressLocation",
        newPressContactName   : "#NewPressContactName",
        newPressContactNo     : '#NewPressContactNo',
    },
    jsData : {
        projects : 'Projects',
        schools : 'Schools',
        projectOfficers : 'Project Officers',
        printPress : 'Print Press',
        bgImg : ''
    }
}

class projectManagementClass {
    constructor(external) {
        this.ext = external;

    }    

    async getSchools() {
        
        const response = await fetch('https://staging.api.desafrica.com/v1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `
        query getSchools {
            getSchools(input: {
              perPage: 10,
              pageNumber: 1
            }){
              schools {
                schoolName
                population
                projectOfficers {
                  fullName
                }
                
              }
              total
            }
          }
            ` ,
            variables : {
                
            }
        }),
        });

        return await response.json();
        
    }

    async getProjects() {
        
        const response = await fetch('https://staging.api.desafrica.com/v1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `
        query getProjects {
            getProjects (input: {
              perPage: 1
              pageNumber: 0
            }) {
              projects {
                id
                name
                startDate
              }
              total
            }
          }
            ` ,
            variables : {
                
            }
        }),
        });

        return await response.json();
        
    }
    
    async getProjectOfficers() {
        
        const response = await fetch('https://staging.api.desafrica.com/v1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `
        query getProjectOfficers($input : GetProjectOfficersInput!) {
            getProjectOfficers(input: $input){
              projectOfficers {
                fullName
                phone
                projectId
                photoId
                photoIdNumber
                project {
                  name
                  startDate
                  endDate
                }
                
              }

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

    async getPresses() {
        
        const response = await fetch('https://staging.api.desafrica.com/v1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `
        query getPresses($input : GetPressesInput!) {
            getPresses(input: $input){
              presses {
                name
              }
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

    async addPress() {
        
        var ids = this.ext.jsId;
        var jsData = this.ext.jsData;

        var pressName = $(ids.newPressName).val();
        var gpsCode = $(ids.newPressGpsCode).val();
        var location = $(ids.newPressLocation).val();
        var contactName = $(ids.newPressContactName).val();
        var contactNo = $(ids.newPressContactNo).val();


        //console.log(jsData.bgImg)

        if(pressName != '' && gpsCode != '' && location != '' && contactName != '' && contactNo != '') {
            
            const response = await fetch('https://staging.api.desafrica.com/v1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: `
                mutation AddPress($input :  AddPressInput!) {
                    sid {
                      addPress(input: $input) {
                        id
                    
                      }
                    }
                  }
                    ` ,
                    variables : {
                        "input":  {
                            "name" : `${pressName}`,
                            "gpsCode" : `${gpsCode}`,
                            "location" :{
                                "lat" : '',
                                "lng" : '',
                            },
                            "contactName" : `${contactName}`,
                            "contactPhone" : `${contactNo}`,
                        },
                    }
                }),
                });
        
                var res = await response.json();
                console.log(res)
        }
        else {
            try {
                throw new Error('Check all fields are provided!')
              } catch (e) {
                console.error(e.name + ': ' + e.message)
              }
              
        }

        
    }

    async addProject() {
        
        var ids = this.ext.jsId;
        var jsData = this.ext.jsData;

        var projectName = $(ids.newProjectName).val();
        var cardTitle = $(ids.newCardTitle).val();
        var institutionType = $(ids.newInstitutionType);
        var startDate = $(ids.newProjectDurationStartDate).val();
        var endDate = $(ids.newProjectDurationEndDate);
        var cardSize = $(ids.cardSize).val();
        var firstName = $(ids.newFirstName).prop("checked");
        var secondName = $(ids.newSecondName).prop("checked");
        var middleName = $(ids.newMiddleName).prop("checked");

        

        if(projectName != '' && cardTitle != '' && startDate != '' && endDate != '' && cardSize != '') {
           
            const response = await fetch('https://staging.api.desafrica.com/v1', {
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json', 
                  'Accept' : 'application/json, text/plain, */*',
                },
                body: JSON.stringify({ query: `
                mutation AddProject($input :  AddProjectInput!, $BgImg : Upload!) {
                    sid {
                      addProject(input: $input, BgImg: $BgImg) {
                        id
                        name
                        cardTitle
                        fields{
                          firstName
                          lastName
                        }
                        startDate
                        endDate
                        cardSize
                        cardBgImg
                        initials
                        year
                        closure
                      }
                    }
                  }
                    ` ,
                    variables : {
                        "input":  {
                            "name" : projectName,
                            "initials" : "AQ",
                            "year" : "2020",
                            "closure" : true,
                            "cardTitle" : cardTitle,
                            "fields" : {
                                "firstName" : firstName,
                                "lastName" : secondName,
                                "middleName" : middleName,
                                "issueDate" : true,
                                "idNumber" : true,
                                "qrCode" : true,
                            },
                            "startDate" : "startDate",
                            "endDate" : "endDate",
                            "cardSize" : "cardSize",
                        },
                        "BgImg" : jsData.bgImg
                    }
                }),
                });
        

                var res = await response.json();
                console.log(res)
        }
        else {
            try {
                throw new Error('Check all fields are provided!')
              } catch (e) {
                console.error(e.name + ': ' + e.message)
              }
              
        }

        
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

var projectManagementObj = new projectManagementClass(projectManagementClassObj)