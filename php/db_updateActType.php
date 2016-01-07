<?php
    require("config.php");
    
    $ActTypeID = filter_input(INPUT_POST, 'ActTypeID');
    $ActTypeName = filter_input(INPUT_POST, 'ActTypeName');
    $ActTypeDescrip = filter_input(INPUT_POST, 'ActTypeDescrip');
    
    $query = "UPDATE [IVCSAT].[dbo].[ActType] "
                ."SET ActTypeName = '".$ActTypeName."', ActTypeDescrip = '".$ActTypeDescrip."' "
                ."WHERE ActTypeID = '".$ActTypeID."'";  
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);