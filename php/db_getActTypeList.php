<?php
    require("config.php");

    $query = "SELECT ActTypeName, ActTypeDescrip, "
            . "'<a href=# id=''acttype_id_' + CONVERT(NVARCHAR(255), ActTypeID) + '''><i class=''fa fa-edit''></i></a>' AS ActTypeID "
            . "FROM [IVCSAT].[dbo].[ActType] ORDER BY ActTypeName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);