var webSiteName = document.getElementById("siteName");
var webSiteUrl = document.getElementById("siteUrl");
var popUp = document.getElementById("boxValid");
var closeIcon = document.getElementById("close-popup");
var listItems = document.getElementById("list-items");
var CharIcon = document.querySelectorAll('.check-icon');
var subBtn = document.getElementById("submitBtn");
var updBtn = document.getElementById("updateBtn");
var urlMsg = document.getElementById("urlMsg");


var webSitesList = JSON.parse(localStorage.getItem('sites')) || [];

window.addEventListener("load", function () {
  display();
})
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
  } else {
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
  for (var i = 0; i < CharIcon.length; i++) {
    if (/[A-Z]/.test(siteName.value)) {
      CharIcon[0].classList.add('checked');
    } else {
      CharIcon[0].classList.remove('checked');
    }
    if (/[a-z]/.test(siteName.value)) {
      CharIcon[1].classList.add('checked');
    } else {
      CharIcon[1].classList.remove('checked');
    }
    if (/[0-9]/.test(siteName.value)) {
      CharIcon[2].classList.add('checked');
    } else {
      CharIcon[2].classList.remove('checked');
    }
    if (/[_]/.test(siteName.value)) {
      CharIcon[3].classList.add('checked');
    } else {
      CharIcon[3].classList.remove('checked');
    }
  }

  if (nameRegExp.test(webSiteName.value)) {
    webSiteName.classList.add("is-valid");
    webSiteName.classList.remove("is-invalid");
    listItems.classList.add("hide-list");
    listItems.classList.remove("show-list");
    return true;
  } else {
    webSiteName.classList.add("is-invalid");
    webSiteName.classList.remove("is-valid");
    listItems.classList.add("show-list");
    listItems.classList.remove("hide-list");
    return false;
  }
}

function urlValidate() {
  if (urlRegExp.test(webSiteUrl.value)) {
    webSiteUrl.classList.add("is-valid");
    webSiteUrl.classList.remove("is-invalid");
    urlMsg.classList.add("d-none");
    return true;
  } else {
    webSiteUrl.classList.add("is-invalid");
    webSiteUrl.classList.remove("is-valid");
    urlMsg.classList.remove("d-none");
    return false;
  }
}
// **************** Display Function ***************
function display() {
  var trs = ``;
  for (var i = 0; i < webSitesList.length; i++) {
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
            <td>
               <button onClick="updateOnSite(${i})" class="btn btn-outline-warning text-capitalize">
                  <i class="fa-solid fa-pen-nib"></i>
                  update
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
function closePopUp() {
  popUp.classList.add("hidden");
  popUp.classList.remove("visible");
}

//*************** Update Function ***************
var indexInfo;
function updateOnSite(index) {
  indexInfo = index;
  webSiteName.value = webSitesList[index].siteName;
  webSiteUrl.value = webSitesList[index].siteURL;

  subBtn.style.display = "none";
  updBtn.style.display = "block";
}
function update() {
  webSitesList[indexInfo].siteName = webSiteName.value;
  webSitesList[indexInfo].siteURL = webSiteUrl.value;
  display(webSitesList);
  localStorage.setItem("sites", JSON.stringify(webSitesList));
  reset();
  subBtn.style.display = "block";
  updBtn.style.display = "none";
}
