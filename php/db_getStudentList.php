<?php
    require("config.php");

    $query = "SELECT StuID, StuName, StuEmail, "
            . "'<a href=# id=''student_id_' + CONVERT(NVARCHAR(255), StudentID) + '''><i class=''fa fa-edit''></i></a>' AS StudentID "
            . "FROM [IVCSAT].[dbo].[Student] ORDER BY StuName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);