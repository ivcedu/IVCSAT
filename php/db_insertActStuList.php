<?php
    require("config.php");
    
    $ActivitiesID = filter_input(INPUT_POST, 'ActivitiesID');
    $StudentID = filter_input(INPUT_POST, 'StudentID');
    
    $query = "INSERT INTO [IVCSAT].[dbo].[ActStuList] (ActivitiesID, StudentID) "
                ."VALUES ('$ActivitiesID', '$StudentID')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);