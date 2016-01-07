<?php
    require("config.php");

    $query = "SELECT aslt.ActStuListID, actv.ActName, stud.StuName "
            . "FROM [IVCSAT].[dbo].[ActStuList] AS aslt LEFT JOIN [IVCSAT].[dbo].[Activities] AS actv ON aslt.ActivitiesID = actv.ActivitiesID "
            . "LEFT JOIN [IVCSAT].[dbo].[Student] AS stud ON aslt.StudentID = stud.StudentID";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);