<?php
    require("config.php");
    
    $StudentID = filter_input(INPUT_POST, 'StudentID');
    $ActivitiesID = filter_input(INPUT_POST, 'ActivitiesID');

    $query = "SELECT * FROM [IVCSAT].[dbo].[StuRequest] WHERE StudentID = '".$StudentID."' AND ActivitiesID = '".$ActivitiesID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);