<?php
    require("config.php");
    
    $OrganizationID = filter_input(INPUT_POST, 'OrganizationID');
    $OrgName = filter_input(INPUT_POST, 'OrgName');
    $OrgDescrip = filter_input(INPUT_POST, 'OrgDescrip');
    
    $query = "UPDATE [IVCSAT].[dbo].[Organization] "
                ."SET OrgName = '".$OrgName."', OrgDescrip = '".$OrgDescrip."' "
                ."WHERE OrganizationID = '".$OrganizationID."'";  
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);