////////////////////////////////////////////////////////////////////////////////
window.onload = function() {  
    $('#logn_error').hide();
    var curBrowser = bowser.name;
    var curVersion = Number(bowser.version);
    
    switch (curBrowser) {
        case "Safari":
            if (curVersion < 6)
                window.open('browser_not_support.html', '_self');
            break;
        case "Chrome":
            if (curVersion < 7)
                window.open('browser_not_support.html', '_self');
            break;
        case "Firefox":
            if (curVersion < 22)
                window.open('browser_not_support.html', '_self');
            break;
        case "Internet Explorer":
            if (curVersion < 11)
                window.open('browser_not_support.html', '_self');
            break;
        default:     
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {      
    $('#btn_login').click(function() { 
        $('#error_msg').html("");
        $('#logn_error').hide();

        if(loginInfo()) {
            if (location.href.indexOf("ireport.ivc.edu") >= 0) {
                sessionStorage.setItem('m_parentSite', 'https://ireport.ivc.edu');
            }
            else {
                sessionStorage.setItem('m_parentSite', 'https://services.ivc.edu');
            }
            
            var login = sessionStorage.getItem('ss_sat_Login');
            if (login === "Staff") {
                window.open('staffHome.html', '_self');
                return false;
            }
            else {
                window.open('studentHome.html', '_self');
                return false;
            }
        }
        else {
            $('#error_msg').html("Invalid username or password");
            $('#logn_error').show();
            return false;
        }
    });
});

////////////////////////////////////////////////////////////////////////////////
function loginInfo() {   
    var username = $('#username').val().toLowerCase().replace("@ivc.edu", "");
    var password = $('#password').val();
    
    var staff_faculty = new Array();
    staff_faculty = getLoginUserInfo("php/login.php", username, password);    
    if (staff_faculty.length > 0) {
        var name = objToString(staff_faculty[0]);
        var email = objToString(staff_faculty[1]);
        var etype = objToString(staff_faculty[2]);
        var phone = objToString(staff_faculty[3]);
        var title = objToString(staff_faculty[4]);
        var depart = objToString(staff_faculty[5]);
        var division = objToString(staff_faculty[6]);
        sessionStorage.setItem('ss_sat_Login', "Staff");
        sessionData_staff_faculty_login(name, email, etype, phone, title, depart, division);
        return true;
    }

    var student = new Array();
    student = getLoginUserInfo("php/login_student.php", username, password);
    if (student.length > 0) {
        var student_id = objToString(student[0]);
        var stu_name = objToString(student[1]);
        var stu_email = objToString(student[2]);
        sessionStorage.setItem('ss_sat_Login', "Student");
        sessionData_student_login(student_id, stu_name, stu_email);
        return true;
    }
    
    return false;
}