<?php
    require("config.php");
    
    $StuRequestID = filter_input(INPUT_POST, 'StuRequestID');

    $query = "SELECT actv.ActName, actv.ActDescription, orgn.OrgName, orgn.OrgDescrip, catg.CatName, strq.FiscalYrs, strq.ActRole, stud.StuID, stud.StuName, stus.[Status], fact.facName, "
            . "CONVERT(VARCHAR(10), strq.DTStamp, 101) + STUFF(RIGHT(CONVERT(VARCHAR(26), DTStamp, 109), 15), 7, 7, ' ') AS DTStamp "
            . "FROM [IVCSAT].[dbo].[StuRequest] AS strq INNER JOIN [IVCSAT].[dbo].[Status] AS stus ON strq.StatusID = stus.StatusID "
            . "INNER JOIN [IVCSAT].[dbo].[Activities] AS actv ON strq.ActivitiesID = actv.ActivitiesID "
            . "INNER JOIN [IVCSAT].[dbo].[Organization] AS orgn ON actv.OrganizationID = orgn.OrganizationID "
            . "INNER JOIN [IVCSAT].[dbo].[Category] AS catg ON actv.CategoryID = catg.CategoryID "
            . "INNER JOIN [IVCSAT].[dbo].[Student] AS stud ON strq.StudentID = stud.StudentID "
            . "INNER JOIN [IVCSAT].[dbo].[Faculty] AS fact ON actv.FacultyID = fact.FacultyID "
            . "WHERE strq.StuRequestID = '".$StuRequestID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);