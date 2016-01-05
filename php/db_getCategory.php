<?php
    require("config.php");
    
    $CategoryID = filter_input(INPUT_POST, 'CategoryID');

    $query = "SELECT CatName FROM [IVCSAT].[dbo].[Category] WHERE CategoryID = '".$CategoryID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();

    echo json_encode($data['CatName']);