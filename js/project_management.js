let projectManagementClassObj = {
    jsId : {
        panelHtml             : '#panelHtml',
        ProjectsDiv           : '#ProjectsDiv',
        SchoolsDiv            : '#SchoolsDiv',
        PrintPressDiv         : '#PrintPressDiv',
        ProjectOfficersDiv    : '#ProjectOfficersDiv',
        QualityOfficersDiv    : '#QualityOfficersDiv',
        managementPageHeader  : '#management-page-header',

        //Add new Project
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

        //Add new Press
        newPressName          : "#NewPressName",
        newPressGpsCode       : "#NewPressGpsCode",
        newPressLocation      : "#NewPressLocation",
        newPressContactName   : "#NewPressContactName",
        newPressContactNo     : '#NewPressContactNo',


        //Assign Institution to Project Officer
        assignProjectOfficerSchoolNameHTML : '#AssignProjectOfficerSchoolNameHTML',
        assignProjectOfficerNameSelect     : '#AssignProjectOfficerNameSelect',
        assignProjectOfficerSchoolCode     : '#AssignProjectOfficerSchoolCode',

        //Add Task to Project Officer Name
        assignProjectOfficerInstSelect     : '#AssignProjectOfficerInstSelect',
        assignProjectOfficerStartDate      : '#AssignProjectOfficerStartDate',
        assignProjectOfficerEndDate        : '#AssignProjectOfficerEndDate',
        assignProjectOfficerId             : '#AssignProjectOfficerId',

        //Assign Print Officer to Press
        assignPrintOfficerPressNameHTML    : '#AssignPrintOfficerPressNameHTML',
        assignPrintOfficerNameSelect       : '#AssignPrintOfficerNameSelect',
        assignPrintOfficerPressId          : '#AssignPrintOfficerPressId',
        assignPrintOfficerNameSelect       : '#AssignPrintOfficerNameSelect',

        //Add new school
        newSchoolName         : '#NewSchoolName',
        newSchoolPopulation   : '#NewSchoolPopulation'
    },
    jsData : {
        projects : 'Projects',
        schools : 'Schools',
        projectOfficers : 'Project Officers',
        printPress : 'Print Press',
        bgImg : '',
        datePickerAssignProjectOfficerStartDate : '',
        datePickerAssignProjectOfficerEndDate : '',
        location : {
          lat : '',
          lng : ''
        }

    }
}

class projectManagementClass {
    constructor(external) {
        this.ext = external;

    }    



    async assignOfficerToPress() {

      var ids = this.ext.jsId;

      var pressId = $(ids.assignPrintOfficerPressId).val();
      var printOfficerId = $(ids.assignPrintOfficerNameSelect).val();

      

      if(pressId != '' && printOfficerId != '') { 

        const response = await fetch('https://staging.api.desafrica.com/v1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `
            mutation AssignOfficerToPress($input : AssignOfficerToPressInput!) {
                sid {
                  assignOfficerToPress(input : $input) {
                    id
                    pressId
                    printOfficerId
                  }
              }
            }
            ` ,
            variables : {
              "input": {
                "pressId": pressId,
                "printOfficerId": printOfficerId,
              }
            }
        }),
        
        });

        await response.json()
        .then(data => {
          console.log(data)
          if(data.data.sid != null) {
            toastr.success('Print Officer Assigned Successfully');
          }
          else {
            toastr.error('Error: Failed to Assign Print Officer');
          }
          
        });
      
     }



      
      
  }


    async addTaskToProjectOfficerName() {

      var ids = this.ext.jsId;

      var startDate = $(ids.assignProjectOfficerStartDate).val();
      var endDate = $(ids.assignProjectOfficerEndDate).val();
      var institutionId = $(ids.assignProjectOfficerInstSelect).val();
      var projectOfficerId = +($(ids.assignProjectOfficerId).val());
      
      
      if(startDate != '' && endDate != '' && institutionId != '') { 

        const response = await fetch('https://staging.api.desafrica.com/v1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `
            mutation AssignInstitutionToPO($input : POIAssignmentInput!) {
              sid {
                assignInstitutionToPO(input : $input) {
                  id
                }
              }
            }
            ` ,
            variables : {
              "input": {
                "institutionId": institutionId,
                "projectOfficerId": projectOfficerId ,
                "endDate": endDate ,
                "startDate": startDate
              }
            }
        }),
        
        });

        await response.json()
        .then(data => {
          
          if(data.data.sid != null) {
            toastr.success('Project Officer Assigned Successfully');
          }
          else {
            toastr.error('Error: Failed to Assign Project Officer');
          }
          
        });
      
     }



      
      
  }

    async assignInstitutionToPO() {
        
      var ids = this.ext.jsId;

      var projectOfficerId = +($(ids.assignProjectOfficerNameSelect).val());
      var institutionId = $(ids.assignProjectOfficerSchoolCode).val();
      var startDate = '';
      var endDate = '';

      if(institutionId != '' && projectOfficerId != '') {
        const response = await fetch('https://staging.api.desafrica.com/v1', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: `
              mutation AssignInstitutionToPO($input : POIAssignmentInput!) {
                sid {
                  assignInstitutionToPO(input : $input) {
                    id
                  }
                }
              }
              ` ,
              variables : {
                "input": {
                  "institutionId": institutionId,
                  "projectOfficerId": projectOfficerId,
                  "endDate": "01/03/2020",
                  "startDate": "01/03/2020"
                }
              }
          }),
          });
    
          await response.json()
          .then(data => {
            console.log(data)
            if(data.data.sid != null) {
              toastr.success('Project Officer Assigned Successfully');
            }
            else {
              toastr.error('Error: Failed to Assign Project Officer');
            }
            
          });
      }


      
      
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
                schoolCode
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
                id
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

    async getPrintOfficers() {
        
      const response = await fetch('https://staging.api.desafrica.com/v1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `
          query getPrintOfficers($input : GetPrintOfficersInput!) {
            getPrintOfficers(input : $input) {
              printOfficers {
                id
                fullName
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
                id
                name
                officers {
                  printOfficers {
                    fullName
                  }
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

    async addPress() {
        
        var ids = this.ext.jsId;
        var jsData = this.ext.jsData;

        var pressName = $(ids.newPressName).val();
        var gpsCode = $(ids.newPressGpsCode).val();

        var lat = jsData.location.lat;
        var lng = jsData.location.lng;

        var contactName = $(ids.newPressContactName).val();
        var contactNo = $(ids.newPressContactNo).val();

        if(pressName != '' && gpsCode != '' && lat != '' && lng != '' && contactName != '' && contactNo != '') {
            
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
                                "lat" : `${lat}`,
                                "lng" : `${lng}`,
                            },
                            "contactName" : `${contactName}`,
                            "contactPhone" : `${contactNo}`,
                        },
                    }
                }),
                });
        
                await response.json()
                .then(data => {
                  console.log(data)
                  if(data.data.sid != null) {
                    toastr.success('Press Added Successfully');
                  }
                  else {
                    toastr.error('Error: Failed to Add Press');
                  }
                  
                });
                
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