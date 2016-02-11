<?php
    require("config.php");
    
    $OrganizationID = filter_input(INPUT_POST, 'OrganizationID');

    $query = "SELECT * FROM [IVCSAT].[dbo].[Organization] WHERE OrganizationID = '".$OrganizationID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);