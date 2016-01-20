<?php
    require("config.php");
    
    $ActStuListID = filter_input(INPUT_POST, 'ActStuListID');

    $query = "SELECT * FROM [IVCSAT].[dbo].[ActStuList] WHERE ActStuListID = '".$ActStuListID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);