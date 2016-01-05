<?php
    require("config.php");
    
    $FacName = filter_input(INPUT_POST, 'FacName');
    $FacEmail = filter_input(INPUT_POST, 'FacEmail');
    $FacTitle = filter_input(INPUT_POST, 'FacTitle');
    $FacPhone = filter_input(INPUT_POST, 'FacPhone');
    $FacDepart = filter_input(INPUT_POST, 'FacDepart');
    $FacDivision = filter_input(INPUT_POST, 'FacDivision');
    
    $query = "INSERT INTO [IVCSAT].[dbo].[Faculty] (FacName, FacEmail, FacTitle, FacPhone, FacDepart, FacDivision) "
                ."VALUES ('$FacName', '$FacEmail', '$FacTitle', '$FacPhone', '$FacDepart', '$FacDivision')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);