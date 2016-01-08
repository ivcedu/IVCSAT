<?php
    require("config.php");

    $query = "SELECT actv.ActName, stud.StuName, "
            . "'<a href=# id=''act_stu_list_id_' + CONVERT(NVARCHAR(255), aslt.ActStuListID) + '''><i class=''fa fa-trash-o''></i></a>' AS ActStuListID "
            . "FROM [IVCSAT].[dbo].[ActStuList] AS aslt LEFT JOIN [IVCSAT].[dbo].[Activities] AS actv ON aslt.ActivitiesID = actv.ActivitiesID "
            . "LEFT JOIN [IVCSAT].[dbo].[Student] AS stud ON aslt.StudentID = stud.StudentID";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);