<?php
    require("config.php");
    
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $StudentID = filter_input(INPUT_POST, 'StudentID');
    $ActivitiesID = filter_input(INPUT_POST, 'ActivitiesID');
    $FiscalYrs = filter_input(INPUT_POST, 'FiscalYrs');
    $ActRole = filter_input(INPUT_POST, 'ActRole');
    
    $query = "INSERT INTO [IVCSAT].[dbo].[StuRequest] (StatusID, StudentID, ActivitiesID, FiscalYrs, ActRole) "
                ."VALUES ('$StatusID', '$StudentID', '$ActivitiesID', '$FiscalYrs', '$ActRole')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);