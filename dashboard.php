<?php
include 'module_booking/services/service_getAllRoonFromDatabase.php';
?>

<html>
<head>
    <!-- stylesheet -->
    <link rel="stylesheet" href="stylesheet/style.css">

    <!-- externe library -->
    <!-- <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js" type="text/javascript"></script> -->
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet"
          href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <!-- help scripts -->
    <script type="text/javascript" src="utility/global_vars.js"></script>
    <script type="text/javascript" src="utility/help.js"></script>
    <script type="text/javascript" src="module_booking/utility/bookingModule_help.js"></script>
    <script type="text/javascript" src="module_booking/utility/ed_help.js"></script>

    <!-- configuration script -->
    <script type="text/javascript"
            src="configuration/xmlHttpRequest_configurations.js"></script>

    <!-- scripts -->
    <script type="text/javascript"
            src="module_booking/services/service_tableGenerate.js"></script>
    <script type="text/javascript"
            src="module_booking/services/service_tableSelector.js"></script>
    <script type="text/javascript"
            src="module_booking/services/service_showDataFromDefinePeriod.js"></script>


    <script type="text/javascript">

        // set jquery-Datepicker
        $(function () {
            $(".datepicker").datepicker();
        });

    </script>
</head>
<body>
<div id="main">
    <div id="mySidenav" class="sidenav">
        <!--- Beginn of sidenav-->

        <a class="closebtn" onclick="closeNav()">&times;</a>

        <form id="addPerson" name="addPerson" method="post" action="">

            <div id="personAttribute">

                <div id="child1">
                    <br> <input type="text" name="room" class="childOfDiv"
                                onkeyup="checkData(this);" placeholder="Room">

                    <br> <input type="text" name="startdate"
                                class="childOfDiv" placeholder="Startdatum format tt.mm.jjjj"
                                onkeyup="checkData(this);">
                    <p id="error"></p>

                    <input type="text" name="enddate"
                           class="childOfDiv" placeholder="Enddatum format tt.mm.jjjj"
                           onkeyup="checkData(this);">
                    <p id="errorMsg"></p>

                    <input type="text" name="firstname" class="childOfDiv"
                           onkeyup="checkData(this);" placeholder="Vorname*"><br> <input
                            type="text" name="lastname" class="childOfDiv"
                            onkeyup="checkData(this);" placeholder="Nachname*"><br>
                </div>
            </div>
        </form>

        <button type="submit" onclick="request(readData);">Submit</button>
        <button id="myBtnWeiter" onclick="cloneDiv();" disabled>add More...</button>

    </div><!-- End of sidenav-->

    <!--- click on this element to show sidenav -->
    <div title="click to add reservation" onclick="openNav();"
         id="overlay">
        <span>&lsaquo;</span>
    </div>

    <!-- beginn of Dashboard-->
    <div id="divKalendar">
        <div id="kalendarNavDiv">
            <button id="leftKalendar" onclick="getAPreviousPeriodeClick()">
                <img alt="left" src="images/navLink.png">
            </button>
            <button id="RightKalendar" onclick="getANextPeriodeClick()">
                <img alt="rigth" src="images/navRecht.png">
            </button>
            <p style="clear: both;"></p>
        </div>

        <div>
            <div class="floatTable" id="roomDiv">

                <!-- this is a empty table on the top of the Object-table in order to get a good layout -->
                <table>
                    <tr>
                        <td></td>
                    </tr>
                </table>

                <!-- this is the Table with all room Information -->
                <table id="roomtable">
                    <tr>
                        <td>Objekte</td>
                    </tr>
                    <?php echo $roomTable ?>
                </table>
                <!-- this helps to save a number of all rooms, this is used to generate the booking table -->
                <input type="hidden" class=" notVisible" id="roomRowNbr"
                       value="<?php echo $RoomNum_rows ?>">
            </div>

            <!-- this is the table with all booking infomation -->
            <div class="floatTable" id="tableDiv">

            </div>
            <p style="clear: both;"></p>
        </div>

        <!-- this is a help field. could be used to save particular information -->
        <input type="text" id="inhalt" name="fname"><br>
    </div>
    <!-- End of Dashboard-->
    <!-- end of content-->

    <!-- *************************scripte************************************** -->
    <script type="text/javascript">

        // TODO: please set the rigth Date before going produtive
        // the EndDate needed to generate the booking Table
        var endDateFromFirstBookingTableGeneration = new Date();
        endDateFromFirstBookingTableGeneration = dateToString(endDateFromFirstBookingTableGeneration);

        var nbrOfRoomRows = parseInt(document.getElementById("roomRowNbr").value) + 1;
        document.getElementById("tableDiv").innerHTML = generateTable(nbrOfRoomRows, 28, endDateFromFirstBookingTableGeneration);

        // after create the Table all the data for the Period will be loaded.
        loadData();
        // set date Row onlyread
        onlyRead = $(".onlyRead");
        onlyRead.attr("disabled", "disabled");
        // The table Seletor to get the Possibility to make a select on the table
        tableSelector();

        // a click Funktion to get the last forteen (actually periode) days an  update the booking table
        function getAPreviousPeriodeClick() {
            var endDateFormat = stringToDate(endDateFromFirstBookingTableGeneration);

            endDateFormat.setDate(endDateFormat.getDate() - 14);
            endDateFormat = dateToString(endDateFormat);
            endDateFromFirstBookingTableGeneration = endDateFormat;
            document.getElementById("tableDiv").innerHTML = generateTable(nbrOfRoomRows, 28, endDateFromFirstBookingTableGeneration);
            // reload all Booking Information and tableSelector
            loadData();
            tableSelector();

        }
        // a click Funktion to get the next forteen (actually periode) days an  update the booking table
        function getANextPeriodeClick() {

            var endDateFormat = stringToDate(endDateFromFirstBookingTableGeneration);
            endDateFormat.setDate(endDateFormat.getDate() + 14);
            endDateFormat = dateToString(endDateFormat);
            endDateFromFirstBookingTableGeneration = endDateFormat;
            document.getElementById("tableDiv").innerHTML = generateTable(nbrOfRoomRows, 28, endDateFromFirstBookingTableGeneration);

            // reload all Booking Information and tableSelector
            loadData();
            tableSelector();
        }


        /***************BEGINN OF FUNCTION SET JQUERY-DATEPIKER***********************
         *
         * Set datepicker on choosen element
         *
         ******************************************************************************/

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

        /***************END OF FUNCTION SET JQUERY-DATEPIKER**************************/


        /***************BEGINN OF JQUERY-FUNCTION ************************************
         *
         * This function will help to deal with datepicker issue after the clone ***
         * We increment a variable nCount if the 'Add' button is clicked
         * We Know that after the click the form is cloned so we select the new div
         * We select the two first input because they must have an input and we remove
         * some attributes (e.g. hasDatepicker,id) and bind the datepicker again
         *
         ***************************************************************************/

        var nCount = 1;

        $("#myBtnWeiter").click(function () {

            nCount = nCount + 1;

            var sIdOfClonedElt = "#" + "child" + nCount + " " + ":input";

            //console.log($(sIdOfClonedElt).length);

            $(sIdOfClonedElt).each(function (index, value) {

                //console.log($(this).attr('name'));

                if ($(this).attr('name') === "startdate" || $(this).attr('name') === "enddate") {

                    $(this).removeClass('hasDatepicker')

                        .removeAttr("id")

                        .datepicker({
                            dateFormat: "dd.mm.yy",

                            onClose: function () {

                                var sCheckDate = validate($(this).val());

                                return sCheckDate;

                            }

                        });

                }

            });

        });

        /***************END OF JQUERY-FUNCTION ************************************/



/// When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
//console.log("inside 2 js "+event.target.nodeName);
            if (event.target.nodeName === "HTML") {

                /*
                 document.getElementById("mySidenav").style.display = "none";
                 document.getElementById("main").style.marginLeft= "0";
                 */
                document.getElementById("mySidenav").style.width = "0";

                document.body.style.backgroundColor = "white";

                //console.log("inside 3 js ");

            }

        }

        function openNav() {

            /*
             document.getElementById("mySidenav").style.width = "850px";
             document.getElementById("main").style.marginLeft = "0px";
             document.body.style.overflow-y = "scroll"; Add vertical scrollbar
             document.body.style.overflow-x = "hidden"; /* Hide horizontal scrollbar
             document.body.style.overflow = "scroll";
             */
            //document.body.style.overflow ="scroll";
            document.getElementById("mySidenav").style.position = "absolute";

            document.getElementById("mySidenav").style.width = "500px";

            //document.getElementById("mySidenav").style.height ="850px";
            //document.getElementById("mySidenav").style.overflow ="scroll";

            document.body.style.backgroundColor = "rgba(0,0,0,0.1)";

        }

        function closeNav() {

            document.getElementById("mySidenav").style.width = "0";

            document.getElementById("main").style.marginLeft = "0";

            document.body.style.backgroundColor = "white";

        }

        function request(callback) {

            var xhr = getXMLHttpRequest();

            xhr.onreadystatechange = function () {

                if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {

                    callback(xhr.responseText); //recuperation de donnees sous forme textuel


                }

            };

            var oStoredData = getJsonData();

            xhr.open("POST", "module_booking/services/service_boockingDataValidator.php", true);

            xhr.setRequestHeader("Content-Type", "application/json");


            xhr.send(oStoredData);

            document.getElementById("mySidenav").style.width = "0";

            document.getElementById("main").style.marginLeft = "0";

            document.body.style.backgroundColor = "white";

        }

        function readData(sData) {

            if (sData) {

                //  alert("C'est bon"+sData);

                document.getElementById("console").innerHTML = "...." + sData;

            } else {

                alert("Y'a eu un problème");

            }

        }


    </script>

</div>
<!-- end of main-->
</body>
</html>