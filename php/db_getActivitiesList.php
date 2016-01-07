<?php
    require("config.php");

    $query = "SELECT * FROM [IVCSAT].[dbo].[Activities] ORDER BY ActName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);