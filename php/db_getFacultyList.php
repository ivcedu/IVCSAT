<?php
    require("config.php");

    $query = "SELECT FacName, FacEmail, "
            . "'<a href=# id=''faculty_id_' + CONVERT(NVARCHAR(255), FacultyID) + '''><i class=''fa fa-edit''></i></a>' AS FacultyID "
            . "FROM [IVCSAT].[dbo].[Faculty] ORDER BY FacName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);