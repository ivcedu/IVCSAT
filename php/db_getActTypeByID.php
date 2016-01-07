<?php
    require("config.php");
    
    $ActTypeID = filter_input(INPUT_POST, 'ActTypeID');

    $query = "SELECT * FROM [IVCSAT].[dbo].[ActType] WHERE ActTypeID = '".$ActTypeID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);