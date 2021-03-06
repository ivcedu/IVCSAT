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

// get tardis DB ///////////////////////////////////////////////////////////////
function tardis_getStudentInfo(StudentID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/tardis_getStudentInfo.php",
        data:{StudentID:StudentID},
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

function db_getStudentList() {   
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStudentList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStudentByID(StudentID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStudentByID.php",
        data:{StudentID:StudentID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStudentByStuID(StuID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStudentByStuID.php",
        data:{StuID:StuID},
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

function db_getCategoryByID(CategoryID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getCategoryByID.php",
        data:{CategoryID:CategoryID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getOrganizationList() {   
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getOrganizationList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getOrganizationByID(OrganizationID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getOrganizationByID.php",
        data:{OrganizationID:OrganizationID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getActivitiesList() {   
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getActivitiesList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getActivitiesByID(ActivitiesID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getActivitiesByID.php",
        data:{ActivitiesID:ActivitiesID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getActStudentList() {   
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getActStudentList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getActStuListByID(ActStuListID) {   
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getActStuListByID.php",
        async: false,  
        data:{ActStuListID:ActStuListID},
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStuActList(StuID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getStuActList.php",
        data:{StuID:StuID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getActFactInfo(ActivitiesID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getActFactInfo.php",
        data:{ActivitiesID:ActivitiesID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStuReqByStuID(StuID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getStuReqByStuID.php",
        data:{StuID:StuID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStuReqByFacultyEmail(FacEmail) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getStuReqByFacultyEmail.php",
        data:{FacEmail:FacEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStuReqInfo(StuRequestID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getStuReqInfo.php",
        data:{StuRequestID:StuRequestID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStuReqByStudentActivitiesID(StudentID, ActivitiesID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getStuReqByStudentActivitiesID.php",
        data:{StudentID:StudentID, ActivitiesID:ActivitiesID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getTransaction(StuRequestID) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getTransaction.php",
        data:{StuRequestID:StuRequestID},
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

function db_insertStudent(StuID, StuName, StuEmail) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertStudent.php",
        data:{StuID:StuID, StuName:StuName, StuEmail:StuEmail},
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

function db_insertOrganization(OrgName, OrgDescrip) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertOrganization.php",
        data:{OrgName:OrgName, OrgDescrip:OrgDescrip},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertActivities(CategoryID, OrganizationID, FacultyID, ActName, ActDescription) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertActivities.php",
        data:{CategoryID:CategoryID, OrganizationID:OrganizationID, FacultyID:FacultyID, ActName:ActName, ActDescription:ActDescription},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertActStuList(ActivitiesID, StudentID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertActStuList.php",
        data:{ActivitiesID:ActivitiesID, StudentID:StudentID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertStuRequest(StatusID, StudentID, ActivitiesID, FiscalYrs, ActRole) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertStuRequest.php",
        data:{StatusID:StatusID, StudentID:StudentID, ActivitiesID:ActivitiesID, FiscalYrs:FiscalYrs, ActRole:ActRole},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertStuRequestAprComments(StuRequestID, ApprComments) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertStuRequestAprComments.php",
        data:{StuRequestID:StuRequestID, ApprComments:ApprComments},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertStuReqLog(StuRequestID, StatusID, LoginName) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertStuReqLog.php",
        data:{StuRequestID:StuRequestID, StatusID:StatusID, LoginName:LoginName},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertTransaction(StuRequestID, SysConfigID, LoginName, Note) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertTransaction.php",
        data:{StuRequestID:StuRequestID, SysConfigID:SysConfigID, LoginName:LoginName, Note:Note},
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

function db_updateStudent(StudentID, StuID, StuName, StuEmail) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateStudent.php",
        data:{StudentID:StudentID, StuID:StuID, StuName:StuName, StuEmail:StuEmail},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateStudentEmail2($StudentID, StuEmail2) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateStudentEmail2.php",
        data:{$StudentID:$StudentID, StuEmail2:StuEmail2},
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

function db_updateOrganization(OrganizationID, OrgName, OrgDescrip) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateOrganization.php",
        data:{OrganizationID:OrganizationID, OrgName:OrgName, OrgDescrip:OrgDescrip},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateActivities(ActivitiesID, CategoryID, OrganizationID, FacultyID, ActName, ActDescription) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateActivities.php",
        data:{ActivitiesID:ActivitiesID, CategoryID:CategoryID, OrganizationID:OrganizationID, FacultyID:FacultyID, ActName:ActName, ActDescription:ActDescription},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateStuRequestStatus(StuRequestID, StatusID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateStuRequestStatus.php",
        data:{StuRequestID:StuRequestID, StatusID:StatusID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

// delete DB ///////////////////////////////////////////////////////////////////
function db_deleteActStuList(ActStuListID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteActStuList.php",
        data:{ActStuListID:ActStuListID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}