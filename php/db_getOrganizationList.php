<?php
    require("config.php");

    $query = "SELECT OrgName, OrgDescrip, "
            . "'<a href=# id=''org_id_' + CONVERT(NVARCHAR(255), OrganizationID) + '''><i class=''fa fa-edit''></i></a>' AS OrganizationID "
            . "FROM [IVCSAT].[dbo].[Organization] ORDER BY OrgName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);