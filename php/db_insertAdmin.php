<?php
    require("config.php");
    
    $AdminName = filter_input(INPUT_POST, 'AdminName');
    $AdminEmail = filter_input(INPUT_POST, 'AdminEmail');
    
    $query = "INSERT INTO [IVCSAT].[dbo].[Admin] (AdminName, AdminEmail) "
                ."VALUES ('$AdminName', '$AdminEmail')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);