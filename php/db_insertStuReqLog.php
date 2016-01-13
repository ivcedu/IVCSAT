<?php
    require("config.php");
    
    $StuRequestID = filter_input(INPUT_POST, 'StuRequestID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    $LoginName = filter_input(INPUT_POST, 'LoginName');
    
    $query = "INSERT INTO [IVCSAT].[dbo].[StuReqLog] (StuRequestID, StatusID, LoginName) "
                ."VALUES ('$StuRequestID', '$StatusID', '$LoginName')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);