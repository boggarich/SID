let projectManagementClassObj = {
    jsId : {
        panelHtml             : '#panelHtml',
        ProjectsDiv           : '#ProjectsDiv',
        SchoolsDiv            : '#SchoolsDiv',
        PrintPressDiv         : '#PrintPressDiv',
        ProjectOfficersDiv    : '#ProjectOfficersDiv',
        QualityOfficersDiv    : '#QualityOfficersDiv',
        managementPageHeader  : '#management-page-header',
        CreateProjectOfficerBtn : '#CreateProjectOfficerBtn',

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
        newProjectCardSize    : '#NewProjectCardSize',
        newProjectCardBackImg : '#NewProjectCardBackImg',

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
        newSchoolPopulation   : '#NewSchoolPopulation',

        //Add new Project Officer
        newProjectOfficerName                       : '#NewProjectOfficerName',
        newProjectOfficerAssignedProject            : '#NewProjectOfficerAssignedProject',
        newProjectOfficerAssignedProjectLocation    : '#NewProjectOfficerAssignedProjectLocation',
        newProjectOfficerAssignedProjectIdOne       : '#NewProjectOfficerAssignedProjectIdOne',
        newProjectOfficerAssignedProjectIdTwo       : '#NewProjectOfficerAssignedProjectIdTwo',
        newProjectOfficerMobileNo                   : '#NewProjectOfficerMobileNo',
        newProjectOfficerPassword                   : '#NewProjectOfficerPassword',
        newProjectOfficerConfirmPassword            : '#NewProjectOfficerConfirmPassword',
        newProjectOfficerResidentialAddress         : '#NewProjectOfficerResidentialAddress',
        newProjectOfficerIDType                     : '#NewProjectOfficerIDType',
        newProjectOfficerIDNo                       : '#NewProjectOfficerIDNo',
        newProjectOfficerIDExpiryDate               : '#NewProjectOfficerIDExpiryDate',
        newProjectOfficerIdCardImg                  : '#NewProjectOfficerIdCardImg'
    },
    jsData : {
        projects                : 'Projects',
        schools                 : 'Schools',
        projectOfficers         : 'Project Officers',
        printPress              : 'Print Press',
        bgImg                   : '',
        datePickerAssignProjectOfficerStartDate : '',
        datePickerAssignProjectOfficerEndDate : '',
        location : {
          lat : '',
          lng : ''
        },
        

    }
}

class projectManagementClass {
    constructor(external) {
        this.ext = external;

    }    

    async addProjectOfficer() {
        
      var ids = this.ext.jsId;
      var jsData = this.ext.jsData;

      var fullName = $(ids.newProjectOfficerName).val();
      //var projectId = $(ids.newProjectOfficerAssignedProjectIdOne).val() + $(ids.newProjectOfficerAssignedProjectIdTwo).val();
      var projectId = $(ids.newProjectOfficerAssignedProject).val();
      var phone = $(ids.newProjectOfficerMobileNo).val();
      var password = $(ids.newProjectOfficerPassword).val();
      var confirmPass = $(ids.newProjectOfficerConfirmPassword).val();
      var residentialAddress = $(ids.newProjectOfficerResidentialAddress).val();
      var photoId = $(ids.newProjectOfficerIDType).val();
      var photoIdNumber = $(ids.newProjectOfficerIDNo).val();
      var photoIdExpiry = $(ids.newProjectOfficerIDExpiryDate).val();
      var idCardImg = $(ids.newProjectOfficerIdCardImg).val();

      var profilePic = "";
      
      var passwordValidation = password.match(/^[0-9]{5}$/g);

      if(passwordValidation == null) {
        commonObj.toastrError('Error: Enter 5-digit passcode');
        return;
       }
     

      if(password != confirmPass) {
        commonObj.toastrError('Error: Passwords don\'t match');
        return;
      }

      

      if(fullName != '' && projectId != '' && phone != '' &&  password != '' && residentialAddress != '' && photoId != '' && photoIdNumber != '' && photoIdExpiry != '' && idCardImg != '') {
          

          const response = await fetch('https://staging.api.desafrica.com/v1', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json', 
                'Accept' : 'application/json, text/plain, */*',
              },
              body: JSON.stringify({ query: `
              mutation AddProjectOfficer($input :  AddProjectOfficerInput!) {
                  sid {
                    addProjectOfficer(input: $input) {
                      id
                    }
                  }
                }
                  ` ,
                  variables : {
                      "input":  {
                          "fullName" : fullName,
                          "projectId" : projectId,
                          "phone" : phone,
                          "password" : password,
                          "residentialAddress" : residentialAddress,
                          "photoId" : photoId,
                          "photoIdNumber" : photoIdNumber,
                          "photoIdExpiry" : photoIdExpiry,
                          "idCardImg" : idCardImg,
                          "profilePic" : profilePic
                      }
                  }
              }),
              });
      

              await response.json()
              .then(data => {
                console.log(data)
                if(data.data.sid != null) {
                  toastr.success('Project Officer Added Successfully');
                }
                else {
                  toastr.error('Error: Failed to Add Project Officer');
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
        
        /*const response = await fetch('https://staging.api.desafrica.com/v1', {
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
	*/

	return await {
	data: {
			getSchools: {	
				schools: [
					{
						schoolCode: '0244115533',
						schoolName: 'Accra High School',
						population: '300',
						projectOfficers: [
							{
								fullName: 'Kweku Anase'
							},
							{
								fullName: 'Abena Mansah'
							}
						],
						completed: '150'
					},
					{
						schoolCode: '0255114866',
						schoolName: 'Accra Academy',
						population: '205',
						projectOfficers: [
							{
								fullName: 'Efya Siribuor Obonkruwa'
							},
							{
								fullName: 'Nii Kwakwe Edin'
							}
						],
						completed: '70'
						
					},
					{
						schoolCode: '0254685439',
						schoolName: 'Achimota School',
						population: '500',
						projectOfficers: [
							{
								fullName: 'Kofi Baboni Mensah'
							}
						],
						completed: '95'
					},
					{
						schoolCode: '0551423684',
						schoolName: 'Presbetarian School',
						population: '125',
						projectOfficers: [],
						completed: '0'
					},
					{
						schoolCode: '0577725465',
						schoolName: 'Kumasi Technical School',
						population: '1500',
						projectOfficers: [],
						completed: '95'
					},
				]
			}
		}
	}
        
    }

    async getProjects() {
        
        /*const response = await fetch('https://staging.api.desafrica.com/v1', {
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
*/

	return await {
		data: {
			getProjects: {	
				projects: [
					{
						name: 'Ghana Education Service - SHS 2020',
						id: '008',
						startDate: '01-03-2021',
					},

					{
						name: 'GES SHS 2 - 2021',
						id: '007',
						startDate: '01-03-2021',
					},

					{
						name: 'GES SHS 3 - 2021',
						id: '006',
						startDate: '01-03-2021',
					},

					{
						name: 'CCHN Student ID card',
						id: '005',
						startDate: '01-03-2021',
					},

					{
						name: 'National ID',
						id: '004',
						startDate: '01-03-2021',
					}
				]
			}
		}
		
	}
        
    }
    
    async getProjectOfficers() {
        
        /*const response = await fetch('https://staging.api.desafrica.com/v1', {
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
*/

	return await {
		data: {
		getProjectOfficers: {
			projectOfficers: [
				{
					fullName: 'Kweku Ananse',
					phone: '0244115533',
					projectId: 'AA',
					assignSchools: [
						{
							name: 'Accra High School',
						},
						{
							name: 'Accra Academy',
						}
					],
					instEngaged: '008',
					totalSubmits: '008',
					taskDuration: '12 months',
					photoId: 'Passport',
					photoIdNumber: 'GS-237689',
					project: {
						name: 'GES SHS 2 - 2021',
						startDate: '01-03-2021',
						endDate: '01-03-2021',
					}
				},
				{
					fullName: 'Abena Mansah',
					phone: '0255114466',
					projectId: 'AB',
					assignSchools: [
						{
							name: 'Kumasi Technical School',
						},
						{
							name: 'Achimota School',
						}
					],
					instEngaged: '007',
					totalSubmits: '007',
					taskDuration: '15 days',
					photoId: 'Voters ID',
					photoIdNumber: 'GS-237689',
					project: {
						name: 'GES SHS 2 - 2021',
						startDate: '01-03-2021',
						endDate: '01-03-2021',
					}
				},
				{
					fullName: 'Efya Siribuour',
					phone: '0254685439',
					projectId: 'AC',
					assignSchools: [
						{
							name: 'Kumasi Technical School',
						}
					],
					instEngaged: '006',
					totalSubmits: '006',
					taskDuration: '2 weeks',
					photoId: 'National ID',
					photoIdNumber: 'GS-237689',
					project: {
						name: 'GES SHS 2 - 2021',
						startDate: '01-03-2021',
						endDate: '01-03-2021',
					}
				},
				{
					fullName: 'Kweku Ananse',
					phone: '0244115533',
					projectId: 'AD',
					assignSchools: [],
					instEngaged: '',
					totalSubmits: '',
					taskDuration: '1 month',
					photoId: 'NHIS',
					photoIdNumber: 'GS-237689',
					project: {
						name: 'GES SHS 2 - 2021',
						startDate: '01-03-2021',
						endDate: '01-03-2021',
					}
				},
				{
					fullName: 'Kweku Ananse',
					phone: '0244115533',
					projectId: 'AE',
					assignSchools: [],
					instEngaged: '',
					totalSubmits: '',
					taskDuration: '5 weeks',
					photoId: 'Voters',
					photoIdNumber: 'GS-237689',
					project: {
						name: 'GES SHS 2 - 2021',
						startDate: '01-03-2021',
						endDate: '01-03-2021',
					}
				},

			]
		}
		}
	}
      
        
    }

    async getPrintOfficers() {
        
      /*const response = await fetch('https://staging.api.desafrica.com/v1', {
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
    */
      
  }

    async getPresses() {
        
/*
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

*/

	return await {
		data: {
			getPresses: {
				presses: [
					{
						id: 'Kokomlemle',
						name: 'Lema Press',
						officer: {
							fullName: 'Kofi Omane'
						}
					},
					{
						id: 'Accra-Newtown, Accra',
						name: 'Newtown press',
						officer: {
							fullName: 'Nii Alonte'
						}
					},
					{
						id: 'Location, District, Region',
						name: 'ABC Printing',
						officer: {
							fullName: 'Abdul Osman'
						}
					},
					{
						id: 'North-Kaneshie, Accra',
						name: 'RS Press',
						officer: {}
					},
					{
						id: 'Circle, Accra',
						name: 'Shinning colors',
						officer: {}
					},
				]
			}
		}	
	}
        
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
        var institutionType = $(ids.newInstitutionType).val();
        var startDate = $(ids.newProjectDurationStartDate).val();
        var endDate = $(ids.newProjectDurationEndDate).val();
        var cardSize = $(ids.newProjectCardSize).val();
        var firstName = $(ids.newFirstName).prop("checked");
        var secondName = $(ids.newSecondName).prop("checked");
        var middleName = $(ids.newMiddleName).prop("checked");
        var issueDate = $(ids.newIssueDate).prop("checked");
        var idNo = $(ids.newIdNo).prop("checked");
        var qrCode = $(ids.newQrCode).prop("checked");
    

        var bgImg = $(ids.newProjectCardBackImg).val();

      

        if(projectName != '' && cardTitle != '' && startDate != '' && endDate != '' && cardSize != '' && bgImg != '') {
           
            const response = await fetch('https://staging.api.desafrica.com/v1', {
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json', 
                  'Accept' : 'application/json, text/plain, */*',
                },
                body: JSON.stringify({ query: `
                mutation AddProject($input :  AddProjectInput!) {
                    sid {
                      addProject(input: $input) {
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
                            "closure" : false,
                            "cardTitle" : cardTitle,
                            "fields" : {
                                "firstName" : firstName,
                                "lastName" : secondName,
                                "middleName" : middleName,
                                "issueDate" : issueDate,
                                "idNumber" : idNo,
                                "qrCode" : qrCode,
                            },
                            "startDate" : startDate,
                            "endDate" : endDate,
                            "cardSize" : cardSize,
                            "cardBgImg" : bgImg
                        }
                    }
                }),
                });
        

                await response.json()
                .then(data => {
                  console.log(data)
                  if(data.data.sid != null) {
                    toastr.success('Project Added Successfully');
                  }
                  else {
                    toastr.error('Error: Failed to Add Project');
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