<?php
    require("config.php");
    
    $StudentID = filter_input(INPUT_POST, 'StudentID');
    $StuEmail2 = filter_input(INPUT_POST, 'StuEmail2');
    
    $query = "UPDATE [IVCSAT].[dbo].[Student] "
                ."SET StuEmail2 = '".$StuEmail2."' "
                ."WHERE StudentID = '".$StudentID."'";  
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);