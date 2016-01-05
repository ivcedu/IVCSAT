<?php
    require("config.php");
    
    $FacultyID = filter_input(INPUT_POST, 'FacultyID');

    $query = "SELECT * FROM [IVCSAT].[dbo].[Faculty] WHERE FacultyID = '".$FacultyID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);