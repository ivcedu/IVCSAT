<?php
    require("config.php");
    
    $ActTypeName = filter_input(INPUT_POST, 'ActTypeName');
    $ActTypeDescrip = filter_input(INPUT_POST, 'ActTypeDescrip');
    
    $query = "INSERT INTO [IVCSAT].[dbo].[ActType] (ActTypeName, ActTypeDescrip) "
                ."VALUES ('$ActTypeName', '$ActTypeDescrip')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);