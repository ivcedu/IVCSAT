<?php
    require("config.php");

    $query = "SELECT * FROM [IVCSAT].[dbo].[Faculty] ORDER BY FacName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);