<?php
    require("config.php");
    
    $StuRequestID = filter_input(INPUT_POST, 'StuRequestID');
    $ApprComments = filter_input(INPUT_POST, 'ApprComments');
    
    $query = "UPDATE [IVCSAT].[dbo].[StuRequest] "
                ."SET ApprComments = '".$ApprComments."' "
                ."WHERE StuRequestID = '".$StuRequestID."'";  
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);