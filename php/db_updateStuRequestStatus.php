<?php
    require("config.php");
    
    $StuRequestID = filter_input(INPUT_POST, 'StuRequestID');
    $StatusID = filter_input(INPUT_POST, 'StatusID');
    
    $query = "UPDATE [IVCSAT].[dbo].[StuRequest] "
                ."SET StatusID = '".$StatusID."' "
                ."WHERE StuRequestID = '".$StuRequestID."'";  
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);