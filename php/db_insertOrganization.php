<?php
    require("config.php");
    
    $OrgName = filter_input(INPUT_POST, 'OrgName');
    $OrgDescrip = filter_input(INPUT_POST, 'OrgDescrip');
    
    $query = "INSERT INTO [IVCSAT].[dbo].[Organization] (OrgName, OrgDescrip) "
                ."VALUES ('$OrgName', '$OrgDescrip')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);