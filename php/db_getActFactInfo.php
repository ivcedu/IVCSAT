<?php
    require("config.php");
    
    $ActivitiesID = filter_input(INPUT_POST, 'ActivitiesID');

    $query = "SELECT actv.ActivitiesID, actv.ActDescription, fact.FacName "
            . "FROM [IVCSAT].[dbo].[Activities] AS actv INNER JOIN [IVCSAT].[dbo].[Faculty] AS fact ON actv.FacultyID = fact.FacultyID "
            . "WHERE actv.ActivitiesID = '".$ActivitiesID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);