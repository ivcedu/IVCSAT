<?php
    require("config.php");
    
    $StuID = filter_input(INPUT_POST, 'StuID');

    $query = "SELECT * FROM [IVCSAT].[dbo].[Student] WHERE StuID = '".$StuID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);