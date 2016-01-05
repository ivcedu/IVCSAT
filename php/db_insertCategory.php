<?php
    require("config.php");
    
    $CatName = filter_input(INPUT_POST, 'CatName');
    
    $query = "INSERT INTO [IVCSAT].[dbo].[Category] (CatName) "
                ."VALUES ('$CatName')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);