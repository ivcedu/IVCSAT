<?php
    require("config.php");
    
    $ActStuListID = filter_input(INPUT_POST, 'ActStuListID');
    
    $query = "DELETE [IVCSAT].[dbo].[ActStuList] WHERE ActStuListID = '".$ActStuListID ."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);