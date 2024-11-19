var webSiteName = document.getElementById("siteName");
var webSiteUrl = document.getElementById("siteUrl");
var popUp = document.getElementById("boxValid");
var closeIcon = document.getElementById("close-popup");

var webSitesList = [];

if(localStorage.getItem('sites') != null){
  webSitesList = JSON.parse(localStorage.getItem('sites'));
  display();
}

// **************** Display Function ***************
function createSiteLink() {
  var siteData = {
    siteName: webSiteName.value,
    siteURL: webSiteUrl.value
  }
      if (nameValidate() == true && urlValidate() == true) {
        webSitesList.push(siteData);
        localStorage.setItem("sites", JSON.stringify(webSitesList));
        webSiteName.classList.remove("is-valid");
        webSiteUrl.classList.remove("is-valid");
      }else {
        popUp.classList.add("visible");
        popUp.classList.remove("hidden");
      }
  display();
  reset();
}

// ***************** Validation Inputs ***************

var nameRegExp = /^\w{3,}(\s+\w+)*$/;
var urlRegExp = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
function nameValidate() {
  if (nameRegExp.test(webSiteName.value)) {
    webSiteName.classList.add("is-valid");
    webSiteName.classList.remove("is-invalid");
    return true;
  } else {
    webSiteName.classList.add("is-invalid");
    webSiteName.classList.remove("is-valid");
    return false;
  }
}

function urlValidate() {
  if (urlRegExp.test(webSiteUrl.value) ) {
    webSiteUrl.classList.add("is-valid");
    webSiteUrl.classList.remove("is-invalid");
    return true;
  } else {
    webSiteUrl.classList.add("is-invalid");
    webSiteUrl.classList.remove("is-valid");
    return false;
  }
}
// **************** Display Function ***************
function display(){
   var trs = ``;
   for( var i = 0; i < webSitesList.length; i++){
      trs += `
      <tr>
            <td>${i + 1}</td>
            <td>${webSitesList[i].siteName}</td>
            <td>
               <button onClick="visit(${i})" class="btn btn-outline-success text-capitalize">
                  <i class="fa-solid fa-eye"></i>
                  visit
               </button>
            </td>
            <td>
               <button onClick="deleteSite(${i})" class="btn btn-outline-danger text-capitalize">
                  <i class="fa-solid fa-trash"></i>
                  delete
               </button>
            </td>
      </tr>
      `
   }

   document.getElementById("table-content").innerHTML = trs;
}

//*************** clear Inputs Function ***************
function reset() {
  webSiteName.value = "";
  webSiteUrl.value = "";
}

//*************** delete Function *****************
function deleteSite(indexOfTable) {
  webSitesList.splice(indexOfTable, 1);
  localStorage.setItem('sites', JSON.stringify(webSitesList));
  display();
}

//*************** Visit Function ***************
var linkRegExp = /^https?:\/\//;
function visit(index) {
    if (linkRegExp.test(webSitesList[index].siteURL)) {
      open(`${webSitesList[index].siteURL}`);
    } else {
      open(`https://${webSitesList[index].siteURL}`);
    }
}

//*************** Close Function ***************
function closePopUp(){
  popUp.classList.add("hidden");
  popUp.classList.remove("visible");
}