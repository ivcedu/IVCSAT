var login_name = "";
var m_table;
var act_stu_list_id = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        $('.splash').css('display', 'none');
        adminSetting();
        getLoginInfo();
        getActivitiesList();
        getStudentList();
        getActStudentList();
    }
    else {
        window.open('Login.html', '_self');
    }
};

$(window).bind("resize click", function () {
    // Add special class to minimalize page elements when screen is less than 768px
    setBodySmall();

    // Waint until metsiMenu, collapse and other effect finish and set wrapper height
    setTimeout(function () {
        fixWrapperHeight();
    }, 300);
});

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    // Add special class to minimalize page elements when screen is less than 768px
    setBodySmall();
    
    // Handle minimalize sidebar menu
    $('.hide-menu').click(function(event){
        event.preventDefault();
        if ($(window).width() < 769) {
            $("body").toggleClass("show-sidebar");
        } else {
            $("body").toggleClass("hide-sidebar");
        }
    });
    
    // Initialize metsiMenu plugin to sidebar menu
    $('#side-menu').metisMenu();
    
    // Initialize iCheck plugin
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
    
    // Initialize animate panel function
    $('.animate-panel').animatePanel();
    
    // Function for collapse hpanel
    $('.showhide').click(function (event) {
        event.preventDefault();
        var hpanel = $(this).closest('div.hpanel');
        var icon = $(this).find('i:first');
        var body = hpanel.find('div.panel-body');
        var footer = hpanel.find('div.panel-footer');
        body.slideToggle(300);
        footer.slideToggle(200);

        // Toggle icon from up to down
        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        hpanel.toggleClass('').toggleClass('panel-collapse');
        setTimeout(function () {
            hpanel.resize();
            hpanel.find('[id^=map-]').resize();
        }, 50);
    });
    
    // Function for close hpanel
    $('.closebox').click(function (event) {
        event.preventDefault();
        var hpanel = $(this).closest('div.hpanel');
        hpanel.remove();
    });
    
    // Fullscreen for fullscreen hpanel
    $('.fullscreen').click(function() {
        var hpanel = $(this).closest('div.hpanel');
        var icon = $(this).find('i:first');
        $('body').toggleClass('fullscreen-panel-mode');
        icon.toggleClass('fa-expand').toggleClass('fa-compress');
        hpanel.toggleClass('fullscreen');
        setTimeout(function() {
            $(window).trigger('resize');
        }, 100);
    });

    // Open close right sidebar
    $('.right-sidebar-toggle').click(function () {
        $('#right-sidebar').toggleClass('sidebar-open');
    });

    // Function for small header
    $('.small-header-action').click(function(event){
        event.preventDefault();
        var icon = $(this).find('i:first');
        var breadcrumb  = $(this).parent().find('#hbreadcrumb');
        $(this).parent().parent().parent().toggleClass('small-header');
        breadcrumb.toggleClass('m-t-lg');
        icon.toggleClass('fa-arrow-up').toggleClass('fa-arrow-down');
    });

    // Set minimal height of #wrapper to fit the window
    setTimeout(function () {
        fixWrapperHeight();
    });
    
    // Sparkline bar chart data and options used under Profile image on left navigation panel
    $("#sparkline1").sparkline([5, 6, 7, 2, 0, 4, 2, 4, 5, 7, 2, 4, 12, 11, 4], {
        type: 'bar',
        barWidth: 7,
        height: '30px',
        barColor: '#62cb31',
        negBarColor: '#53ac2a'
    });
    
    // Initialize tooltips
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]"
    });

    // Initialize popover
    $("[data-toggle=popover]").popover();

    // Move modal to body
    // Fix Bootstrap backdrop issue with animation.css
    $('.modal').appendTo("body");
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('Login.html', '_self');
        return false;
    });
    
    // add category button /////////////////////////////////////////////////////
    $('#btn_act_student_add').click(function() {
        $('#mod_act_student_header').html("Add Activities Student");
        $('#mod_sel_activities').val("0");
        $('#mod_sel_activities').selectpicker('refresh');
        $('#mod_sel_student').val("0");
        $('#mod_sel_student').selectpicker('refresh');
    });
    
    // mod add category save button ////////////////////////////////////////////
    $('#mod_act_student_btn_save').click(function() {
        var activities_id = $('#mod_sel_activities').val();
        var student_id = $('#mod_sel_student').val();
        if (activities_id === "0" || student_id === "0") {
            swal({title: "Error", text: "Please select activities and student", type: "error"});
            return false;
        }

        var new_act_stu_list_id = db_insertActStuList(activities_id, student_id);
        db_insertTransaction(0, 7, login_name, "Added activities student ID: " + new_act_stu_list_id);
        
        $('#mod_add_act_student').modal('hide');
        getActStudentList();
        return false;
    });
    
    // table category edit click event /////////////////////////////////////////
    $('table').on('click', 'a[id^="act_stu_list_id_"]', function() {
        act_stu_list_id = $(this).attr('id').replace("act_stu_list_id_", "");
        
        swal({ title: "Are you sure?", 
               text: "You will not be able to recover this activities student list",
               type: "warning", 
               showCancelButton: true, 
               confirmButtonColor: "#DD6B55", 
               confirmButtonText: "Yes, delete it!",
               closeOnConfirm: false }, 
               function() {
                   db_deleteActStuList(act_stu_list_id);
                   db_insertTransaction(0, 7, login_name, "Deleted activities student ID: " + act_stu_list_id);
                   getActStudentList();
                   swal("Deleted!", "Selected student has been deleted from activities.", "success");
               }
            );
        
        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_act_student_list').DataTable({ paging: false, bInfo: false });
    
    // bootstrap selectpicker
    $('.selectpicker').selectpicker();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});

////////////////////////////////////////////////////////////////////////////////
function fixWrapperHeight() {
    // Get and set current height
    var headerH = 62;
    var navigationH = $("#navigation").height();
    var contentH = $(".content").height();

    // Set new height when contnet height is less then navigation
    if (contentH < navigationH) {
        $("#wrapper").css("min-height", navigationH + 'px');
    }

    // Set new height when contnet height is less then navigation and navigation is less then window
    if (contentH < navigationH && navigationH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - headerH  + 'px');
    }

    // Set new height when contnet is higher then navigation but less then window
    if (contentH > navigationH && contentH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - headerH + 'px');
    }
}

function setBodySmall() {
    if ($(this).width() < 769) {
        $('body').addClass('page-small');
    } else {
        $('body').removeClass('page-small');
        $('body').removeClass('show-sidebar');
    }
}

// Animate panel function
$.fn['animatePanel'] = function() {
    var element = $(this);
    var effect = $(this).data('effect');
    var delay = $(this).data('delay');
    var child = $(this).data('child');

    // Set default values for attrs
    if(!effect) { effect = 'zoomIn';}
    if(!delay) { delay = 0.06; } else { delay = delay / 10; }
    if(!child) { child = '.row > div';} else {child = "." + child;}

    //Set defaul values for start animation and delay
    var startAnimation = 0;
    var start = Math.abs(delay) + startAnimation;

    // Get all visible element and set opacity to 0
    var panel = element.find(child);
    panel.addClass('opacity-0');

    // Get all elements and add effect class
    panel = element.find(child);
    panel.addClass('stagger').addClass('animated-panel').addClass(effect);

    var panelsCount = panel.length + 10;
    var animateTime = (panelsCount * delay * 10000) / 10;

    // Add delay for each child elements
    panel.each(function (i, elm) {
        start += delay;
        var rounded = Math.round(start * 10) / 10;
        $(elm).css('animation-delay', rounded + 's');
        // Remove opacity 0 after finish
        $(elm).removeClass('opacity-0');
    });

    // Clear animation after finish
    setTimeout(function(){
        $('.stagger').css('animation', '');
        $('.stagger').removeClass(effect).removeClass('animated-panel').removeClass('stagger');
    }, animateTime);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function adminSetting() {
    var result = new Array();
    result = db_getAdminByEmail(sessionStorage.getItem('ss_sf_sat_Email'));
    
    if (result.length === 0) {
        $('#nav_admin').hide();
        $('#nav_faculty').hide();
    }
}

////////////////////////////////////////////////////////////////////////////////
function getLoginInfo() {
    login_name = sessionStorage.getItem('ss_sf_sat_Name');
    $('#login_user').html(login_name);
}

////////////////////////////////////////////////////////////////////////////////
function getActivitiesList() {
    var result = new Array(); 
    result = db_getActivitiesList();
    
    $('#mod_sel_activities').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        var activities_id = result[i]['ActivitiesID'].replace("<a href=# id='activities_id_", "").replace("'><i class='fa fa-edit'></i></a>", "");
        html += "<option value='" + activities_id + "'>" + result[i]['ActName'] + "</option>";
    }
    
    $('#mod_sel_activities').append(html);
    $('#mod_sel_activities').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function getStudentList() {
    var result = new Array(); 
    result = db_getStudentList();
    
    $('#mod_sel_student').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        var student_id = result[i]['StudentID'].replace("<a href=# id='student_id_", "").replace("'><i class='fa fa-edit'></i></a>", "");
        html += "<option value='" + student_id + "'>" + result[i]['StuName'] + "</option>";
    }
    
    $('#mod_sel_student').append(html);
    $('#mod_sel_student').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function getActStudentList() {
    var result = new Array();
    result = db_getActStudentList();
    
    m_table.clear();
    m_table.rows.add(result).draw();
    
    $('.animate-panel').animatePanel();
}