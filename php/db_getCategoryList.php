<?php
    require("config.php");

    $query = "SELECT CatName,"
            . "'<a href=# id=''cat_id_' + CONVERT(NVARCHAR(255), CategoryID) + '''><i class=''fa fa-edit''></i></a>' AS CategoryID "
            . "FROM [IVCSAT].[dbo].[Category] ORDER BY CatName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);