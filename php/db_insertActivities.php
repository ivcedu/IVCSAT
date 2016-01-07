<?php
    require("config.php");
    
    $CategoryID = filter_input(INPUT_POST, 'CategoryID');
    $ActTypeID = filter_input(INPUT_POST, 'ActTypeID');
    $FacultyID = filter_input(INPUT_POST, 'FacultyID');
    $ActName = filter_input(INPUT_POST, 'ActName');
    $ActDescription = filter_input(INPUT_POST, 'ActDescription');
    
    $query = "INSERT INTO [IVCSAT].[dbo].[Activities] (CategoryID, ActTypeID, FacultyID, ActName, ActDescription) "
                ."VALUES ('$CategoryID', '$ActTypeID', '$FacultyID', '$ActName', '$ActDescription')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);