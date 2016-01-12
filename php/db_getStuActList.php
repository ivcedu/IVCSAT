<?php
    require("config.php");
    
    $StuID = filter_input(INPUT_POST, 'StuID');

    $query = "SELECT actv.ActivitiesID, actv.ActName "
            . "FROM [IVCSAT].[dbo].[ActStuList] AS aslt INNER JOIN [IVCSAT].[dbo].[Activities] AS actv ON aslt.ActivitiesID = actv.ActivitiesID "
            . "INNER JOIN [IVCSAT].[dbo].[Student] AS stud ON aslt.StudentID = stud.StudentID "
            . "WHERE stud.StuID = '".$StuID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);