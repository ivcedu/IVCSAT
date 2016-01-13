<?php
    require("config.php");
    
    $StuRequestID = filter_input(INPUT_POST, 'StuRequestID');
    $SysConfigID = filter_input(INPUT_POST, 'SysConfigID');
    $LoginName = filter_input(INPUT_POST, 'LoginName');
    $Note = filter_input(INPUT_POST, 'Note');
    
    $query = "INSERT INTO [IVCSAT].[dbo].[Transaction] (StuRequestID, SysConfigID, LoginName, Note) "
                ."VALUES ('$StuRequestID', 'SysConfigID', '$LoginName', '$Note')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);