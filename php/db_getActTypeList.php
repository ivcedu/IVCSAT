<?php
    require("config.php");

    $query = "SELECT * FROM [IVCSAT].[dbo].[ActType] ORDER BY ActTypeName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);