<?php
    require("config.php");
    
    $ActivitiesID = filter_input(INPUT_POST, 'ActivitiesID');

    $query = "SELECT * FROM [IVCSAT].[dbo].[Activities] WHERE ActivitiesID = '".$ActivitiesID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);