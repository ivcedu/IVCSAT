<?php
    require("config.php");

    $query = "SELECT ActName, "
            . "'<a href=# id=''activities_id_' + CONVERT(NVARCHAR(255), ActivitiesID) + '''><i class=''fa fa-edit''></i></a>' AS ActivitiesID "
            . "FROM [IVCSAT].[dbo].[Activities] ORDER BY ActName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);