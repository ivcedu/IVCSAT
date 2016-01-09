<?php
    require("config.php");
    
    $StudentID = filter_input(INPUT_POST, 'StudentID');

    $query = "SELECT Phone, [Address], City, [State], Zip "
            . "FROM [TOPSPIN.SOCCCD.EDU\TOPSPIN].[Tardis].[dbo].[StudentInfo] WHERE StudentID = '".$StudentID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);