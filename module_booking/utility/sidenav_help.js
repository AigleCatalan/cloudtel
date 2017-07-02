/**
 *
 *@autor : Edmond
 *@version : November 2016
 *
 **/

function openNav() {
    resetErrorsOnSideNav();


    childCounter = 1;
    document.getElementById("sidenav").style.position = "absolute";
    document.getElementById("sidenav").style.height = "100%";
    document.getElementById("sidenav").style.width = "100%";
    document.getElementById("mySidenav").style.width = "500px";

    //Begin of properties, that allow to resolve problem seeing buttons
    document.getElementById("mySidenav").style.height = "auto";
    document.getElementById("mySidenav").style.top = "0";
    document.getElementById("mySidenav").style.bottom = "0";
    //End

    document.body.style.backgroundColor = "rgba(0,0,0,0.1)";
    var parEl = document.getElementById("personAttribute");
    var index = parEl.childElementCount;

    if (index > 0) {
        for (var i = 1; i <= index; i++) {
            var elem = document.getElementById("child" + i);
            elem.parentNode.removeChild(elem);
        }
    }
    // $("#overlay").attr("z-index", "0");
    CreateDivInSidenav();

}

function closeNav() {

    document.getElementById("sidenav").style.width = "0";
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
    //reset Local ArrayList and reservation variable.
    arrLocalReservationLists = null;
    oCurrentReserVation = null;
}

function changeDisabledAttributeValue(sIdOfElt) { // begin of changeDisabledAttributeValue

    var oElement = document.getElementById(sIdOfElt);

    if (oElement.disabled) {
        oElement.disabled = true; //sperren
    } else {
        oElement.disabled = true; //set value to true "sperren"
    }
} // end of changeDisabledAttributeValue


function CreateDivInSidenav() {

    if (childCounter == 1 && arrLocalReservationLists == undefined) {
        console.log("first creation");
        arrLocalReservationLists = new Array();
        createDiv();
        return;
    }
    if (childCounter == 2) {
        console.log("second creation");
        proceedBackendValidation();
    } else {
        // first frontend validation
        if (!isfrontendValid()) {
            alert("this date range has already been setted up")
            return;
        } else
            proceedBackendValidation();
    }
}

function proceedBackendValidation() {
    $.ajax({
        type: 'POST',
        url: "./module_booking/services/service_checkReservationPeriodServer.php",
        data: {
            process: "ADD",
            data: JSON.stringify(oCurrentReserVation)
        },
        dataType: "json"
    })
        .success(
            function (response) {

                //validation ok expand the room node
                if (response == "OK") { //TODO the server side has to return an object with the Attribut response this could be OK or NOTOK
                    createDiv();
                    //store current reservation to the List.
                    arrLocalReservationLists.push(oCurrentReserVation);
                    //disabled preview clone
                    disableFields(childCounter - 2);
                } else {
                    alert("period already use");
                }
            })

}

function createDiv() {
    var childDiv = document.createElement('div');
    var childId = "child" + childCounter;
    childDiv.setAttribute("id", childId);
    childDiv.innerHTML = childContent();
    document.getElementById("personAttribute").appendChild(childDiv);
    childCounter++;
    changeDisabledAttributeValue("myBtnWeiter");
    changeDisabledAttributeValue("myBtnSubmit");
    $('.childOfDiv').each(function () {

        if ($(this).attr('name') === "startdate" || $(this).attr('name') === "enddate") {

            $(this).datepicker({
                dateFormat: "dd.mm.yy",
                onClose: function () {
                    var sCheckDate = validate($(this).val());
                    return sCheckDate;
                }
            });

        }
    });

}

function isfrontendValid() {
    if (isDateValid())
        return true;
    return false;
}

function isDateValid() {
    var currentStartDate, currentEndDate, oldStartDate, oldEndDate;
    currentStartDate = new Date(oCurrentReserVation.startDate);
    currentEndDate = new Date(oCurrentReserVation.endDate);

    for (var i = 0; i < arrLocalReservationLists.length; i++) {
        if (arrLocalReservationLists[i].object == oCurrentReserVation.object) {
            oldStartDate = new Date(arrLocalReservationLists[i].startDate);
            oldEndDate = new Date(arrLocalReservationLists[i].endDate);

            if ((currentStartDate <= oldStartDate &&
                currentEndDate > oldEndDate) ||
                (currentStartDate >= oldStartDate &&
                currentStartDate <= oldEndDate) ||
                (currentEndDate >= oldStartDate &&
                currentEndDate <= oldEndDate)
            )
                return false;
        }
    }
    return true;

    //disableFields(childDiv.id);
}


/**

 * The function disables the fields inside one div when  the button
 * "add more" has been clicked.

 **/
function disableFields(childnumber) {

    var strIdOfElement = "child" + childnumber.toString();
    var oElt = document.getElementById(strIdOfElement);

    $('#' + oElt.id).find("input,select").each(function () {

        $(this).prop("disabled", true); //Disable the elements concerned

    });

}

/**
 *
 * Check if the inputs fields inside the <form> element are set.
 * Enable the <addUser> button.
 *
 **/
function checkData(elt) { // beginn of checkData

    var bIsEmpty = false;
    var isPeriodInvalid = false;

    // save id of element concerned
    var strParent = elt.parentElement.id;

    //console.log(strParent); //child1

    var oBtnWeiter = document.getElementById("myBtnWeiter");
    var oBtnSubmit = document.getElementById("myBtnSubmit");

    //get all element with attribute class 'childOfDiv' within the parent div element
    var aElts = document.getElementById(strParent).getElementsByClassName("childOfDiv");
    // count and save Elements with attribute class 'childOfDiv'
    var iCountElts = aElts.length;
    oBtnWeiter.disabled = true;
    oBtnSubmit.disabled = true;
    var dynDates = document.getElementById(strParent).getElementsByClassName("childOfDiv" + " dyn");
    var countDynDates = dynDates.length;

    for (var i = 0; i < iCountElts; i++) {

        if (aElts[i].value == null || aElts[i].value == "" || (aElts[i].name == "room" && aElts[i].value == "first")) {
            bIsEmpty = true;
        } else {
            if ((aElts[i].name == "startdate" || aElts[i].name == "enddate")) {
                if (aElts[i].name == elt.name && !checkDate(elt, aElts)) {
                    setupDymanicClass("add", aElts[i], "dyn");
                } else if (aElts[i].name == elt.name && checkDate(elt, aElts)) {
                    for (var j = 0; j < countDynDates; j++) {
                        setupDymanicClass("remove", dynDates[0], "dyn");
                    }
                }
                else
                    continue;
            }
        }
    }

    if (bIsEmpty == false && dynDates.length == 0) {
        oBtnWeiter.disabled = false;
        oBtnSubmit.disabled = false;
        oCurrentReserVation = {
            object: aElts["room"].value,
            startDate: convertStringToDate(aElts["startdate"].value),
            endDate: convertStringToDate(aElts["enddate"].value),
            firstname: aElts["firstname"].value,
            lastname: aElts["lastname"].value
        }
    }
    //console.log(bIsEmpty);//false
    return bIsEmpty;

} // end of checkData
function setupDymanicClass(action, elt, dynWord) {
    switch (action) {
        case 'add':
            elt.className += ' dyn';
            break;
        case 'remove':
            elt.className = elt.className.replace(dynWord, '');
            break;
    }
    return;
}


function checkDate(datePart, elts) {

    switch (datePart.name) {
        case "startdate":
            var enddate = elts['enddate'].value;
            if (enddate != "" && stringToDate(datePart.value) > stringToDate(enddate)) {
                return false;
            }
            break;
        case "enddate":
            var startdate = elts['startdate'].value;
            if (startdate != "" && stringToDate(startdate) > stringToDate(datePart.value))
                return false;
    }

    return true;
}

function disableButtonAddUser(elt) { // begin of disableButtonAddUsser

    var bIsEmpty = false;

    var oBtnWeiter = document.getElementById("myBtnWeiter");

    oBtnWeiter.disabled = false;

} // end of disableButtonAddUsser

/**
 *
 * Check if require fields are given.
 *
 **/
function validate(dateText) { //begin of validate

    var sErrorMsg = "";

    if (dateText == null || dateText == "") {

        sErrorMsg = "Empty date not allowed!";

        console.log(sErrorMsg);
        // bIsEmpty = !bIsEmpty;
    }

    return sErrorMsg;

}// end of validate

function showErrorsOnSideNav(errors) {
    var errorContent = document.getElementById("errorContent");
    errorContent.style.display = "block";
    errorContent.style.border = "2px solid red";
    errorContent.style.color = "red";
    errorContent.innerHTML = errors;

}
function resetErrorsOnSideNav() {
    document.getElementById("errorContent").style.display = "none";
}