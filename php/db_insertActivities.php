<?php
    require("config.php");
    
    $CategoryID = filter_input(INPUT_POST, 'CategoryID');
    $OrganizationID = filter_input(INPUT_POST, 'OrganizationID');
    $FacultyID = filter_input(INPUT_POST, 'FacultyID');
    $ActName = filter_input(INPUT_POST, 'ActName');
    $ActDescription = filter_input(INPUT_POST, 'ActDescription');
    
    $query = "INSERT INTO [IVCSAT].[dbo].[Activities] (CategoryID, OrganizationID, FacultyID, ActName, ActDescription) "
                ."VALUES ('$CategoryID', '$OrganizationID', '$FacultyID', '$ActName', '$ActDescription')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);