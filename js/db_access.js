// get AD login info ///////////////////////////////////////////////////////////
function getLoginUserInfo(php_file, user, pass) {
    var result = new Array();
    $.ajax({
        type:"POST",
        datatype:"json",
        url:php_file,
        data:{username:user, password:pass},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

// get DB //////////////////////////////////////////////////////////////////////
function db_getAdminList() {   
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAdminByID(AdminID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminByID.php",
        data:{AdminID:AdminID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAdminByEmail(AdminEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminByEmail.php",
        data:{AdminEmail:AdminEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFacultyList() {   
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFacultyList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getFacultyByID(FacultyID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getFacultyByID.php",
        data:{FacultyID:FacultyID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCategoryList() {   
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getCategoryList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCategory(CategoryID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getCategory.php",
        data:{CategoryID:CategoryID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

// insert DB ///////////////////////////////////////////////////////////////////
function db_insertAdmin(AdminName, AdminEmail) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertAdmin.php",
        data:{AdminName:AdminName, AdminEmail:AdminEmail},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertFaculty(FacName, FacEmail, FacTitle, FacPhone, FacDepart, FacDivision) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertFaculty.php",
        data:{FacName:FacName, FacEmail:FacEmail, FacTitle:FacTitle, FacPhone:FacPhone, FacDepart:FacDepart, FacDivision:FacDivision},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertCategory(CatName) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertCategory.php",
        data:{CatName:CatName},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

// update DB ///////////////////////////////////////////////////////////////////
function db_updateAdmin(AdminID, AdminName, AdminEmail) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateAdmin.php",
        data:{AdminID:AdminID, AdminName:AdminName, AdminEmail:AdminEmail},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateFaculty(FacultyID, FacName, FacEmail, FacTitle, FacPhone, FacDepart, FacDivision) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateFaculty.php",
        data:{FacultyID:FacultyID, FacName:FacName, FacEmail:FacEmail, FacTitle:FacTitle, FacPhone:FacPhone, FacDepart:FacDepart, FacDivision:FacDivision},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateCategory(CategoryID, CatName) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateCategory.php",
        data:{CategoryID:CategoryID, CatName:CatName},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

// delete DB ///////////////////////////////////////////////////////////////////
//function db_deleteAdmin(AdminID) {
//    var Result = false;
//    $.ajax({
//        type:"POST",
//        url:"php/db_deleteAdmin.php",
//        data:{AdminID:AdminID},
//        async: false,  
//        success:function(data) {
//            Result = JSON.parse(data);
//        }
//    });
//    return Result;
//}