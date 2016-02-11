<?php
    require("config.php");
    
    $ActivitiesID = filter_input(INPUT_POST, 'ActivitiesID');
    $CategoryID = filter_input(INPUT_POST, 'CategoryID');
    $OrganizationID = filter_input(INPUT_POST, 'OrganizationID');
    $FacultyID = filter_input(INPUT_POST, 'FacultyID');
    $ActName = filter_input(INPUT_POST, 'ActName');
    $ActDescription = filter_input(INPUT_POST, 'ActDescription');
    
    $query = "UPDATE [IVCSAT].[dbo].[Activities] "
                ."SET CategoryID = '".$CategoryID."', OrganizationID = '".$OrganizationID."', FacultyID = '".$FacultyID."', ActName = '".$ActName."', ActDescription = '".$ActDescription."' "
                ."WHERE ActivitiesID = '".$ActivitiesID."'";  
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);