class commonClass {
    
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

    async getInstitutionType() {
        
        
        const response = await fetch('https://staging.api.desafrica.com/v1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `
            query GetInstitutionType(){
                getSchools(input: $input) {
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
            ` ,
            variables : {
                "input":  {
                    "perPage": 20,
                    "pageNumber": 1
                }
            }
        }),
        });

        return await response.json();
        
    }

    btnDesEnb(element, text="", action="des") {
        
        if(action == "des") {
            $(element).prop( "disabled", true );
            $(element).html(`<div class="spinner-border spinner-border-sm text-light" role="status"><span class="sr-only">Loading...</span></div>`);
        }

        if(action == "enb") {
            $(element).html(text);
            $(element).prop( "disabled", false );
        }
    }

    toastrError(message) {
        toastr.error(message);
    }

    toastrSuccess(message) {
        toastr.success(message);
    }

    createSelectOptions(element, objData) {
        var options = '';

        $.each(objData, function(key, data) {
            options +=  `<option value="${data.id}">${data.name}</option>`
        });

        this.changeInnerHtml(element, options);
    }

    createSelectOptionsFullName(element, objData) {
        var options = '';

        $.each(objData, function(key, data) {
            options +=  `<option value="${data.id}">${data.fullName}</option>`
        });

        this.changeInnerHtml(element, options);
    }

    btnLoader() {
        return `<div class="spinner-border" style="width: 3rem; height: 3rem; text-align: center;" role="status">
          <span class="sr-only"></span>
        </div>`;
    }

    createSelectOptionsSchool(element, objData) {
        var options = '';

        $.each(objData, function(key, data) {
            options +=  `<option value="${data.schoolCode}">${data.schoolName}</option>`
        });

        this.changeInnerHtml(element, options);
    }

    getDataAttr(element, dataAttr) {
        return $(element).data(dataAttr);
    }

    setDataAttr(element, dataAttr, value) {
        
        return $(element).data(dataAttr, value);
    }

    setInputVal(element, value) {
        return $(element).val(value);
    }

    changeInnerHtmlByEvent(element, html="") {
        $(element).html(html);    
    }

    changeOuterHtml(element, html="") {
        element.outerHTML = html;
    }

    changeInnerHtml(element, html="") {
        $(element).html(html);
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