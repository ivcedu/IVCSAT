<?php
    require("config.php");
    
    $StudentID = filter_input(INPUT_POST, 'StudentID');
    $StuID = filter_input(INPUT_POST, 'StuID');
    $StuName = filter_input(INPUT_POST, 'StuName');
    $StuEmail = filter_input(INPUT_POST, 'StuEmail');
    
    $query = "UPDATE [IVCSAT].[dbo].[Student] "
                ."SET StuID = '".$StuID."', StuName = '".$StuName."', StuEmail = '".$StuEmail."' "
                ."WHERE StudentID = '".$StudentID."'";  
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);