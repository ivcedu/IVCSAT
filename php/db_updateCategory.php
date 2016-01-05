<?php
    require("config.php");
    
    $CategoryID = filter_input(INPUT_POST, 'CategoryID');
    $CatName = filter_input(INPUT_POST, 'CatName');

    $query = "UPDATE [IVCSAT].[dbo].[Category] "
                ."SET CatName = '".$CatName."' "
                ."WHERE CategoryID = '".$CategoryID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);