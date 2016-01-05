<?php
    require("config.php");
    
    $FacultyID = filter_input(INPUT_POST, 'FacultyID');
    $FacName = filter_input(INPUT_POST, 'FacName');
    $FacEmail = filter_input(INPUT_POST, 'FacEmail');
    $FacTitle = filter_input(INPUT_POST, 'FacTitle');
    $FacPhone = filter_input(INPUT_POST, 'FacPhone');
    $FacDepart = filter_input(INPUT_POST, 'FacDepart');
    $FacDivision = filter_input(INPUT_POST, 'FacDivision');
    
    $query = "UPDATE [IVCSAT].[dbo].[Faculty] "
                ."SET FacName = '".$FacName."', FacEmail = '".$FacEmail."', FacTitle = '".$FacTitle."', FacPhone = '".$FacPhone."', FacDepart = '".$FacDepart."', FacDivision = '".$FacDivision."' "
                ."WHERE FacultyID = '".$FacultyID."'";  
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);