<?php
    require("config.php");
    
    $StuID = filter_input(INPUT_POST, 'StuID');
    $StuName = filter_input(INPUT_POST, 'StuName');
    $StuEmail = filter_input(INPUT_POST, 'StuEmail');
    
    $query = "INSERT INTO [IVCSAT].[dbo].[Student] (StuID, StuName, StuEmail) "
                ."VALUES ('$StuID', '$StuName', '$StuEmail')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);