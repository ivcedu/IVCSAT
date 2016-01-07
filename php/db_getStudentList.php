<?php
    require("config.php");

    $query = "SELECT * FROM [IVCSAT].[dbo].[Student] ORDER BY StuName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);