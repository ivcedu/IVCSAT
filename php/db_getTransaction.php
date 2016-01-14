<?php
    require("config.php");
    
    $StuRequestID = filter_input(INPUT_POST, 'StuRequestID');

    $query = "SELECT * FROM [IVCSAT].[dbo].[Transaction] WHERE StuRequestID = '".$StuRequestID."' ORDER BY TransactionID DESC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);