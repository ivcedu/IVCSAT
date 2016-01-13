<?php
    require("config.php");
    
    $FacEmail = filter_input(INPUT_POST, 'FacEmail');

    $query = "SELECT actv.ActName, stud.StuName, stus.[Status], "
            . "CONVERT(VARCHAR(10), strq.DTStamp, 101) + STUFF(RIGHT(CONVERT(VARCHAR(26), DTStamp, 109), 15), 7, 7, ' ') AS DTStamp, "
            . "'<a href=# id=''stu_request_id_' + CONVERT(NVARCHAR(255), strq.StuRequestID) + '''><i class=''fa fa-legal''></i></a>' AS StuRequestID "
            . "FROM [IVCSAT].[dbo].[StuRequest] AS strq INNER JOIN [IVCSAT].[dbo].[Student] AS stud ON strq.StudentID = stud.StudentID "
            . "INNER JOIN [IVCSAT].[dbo].[Activities] AS actv ON strq.ActivitiesID = actv.ActivitiesID "
            . "INNER JOIN [IVCSAT].[dbo].[Faculty] AS fact ON actv.FacultyID = fact.FacultyID "
            . "INNER JOIN [IVCSAT].[dbo].[Status] AS stus ON strq.StatusID = stus.StatusID "
            . "WHERE fact.FacEmail = '".$FacEmail."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);