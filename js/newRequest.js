var login_name = "";
var m_table;
var row_idx;
var student_id;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        $('.splash').css('display', 'none');
        getLoginInfo();
        setStuActList();
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
    
    // add activity button /////////////////////////////////////////////////////
    $('#btn_add_act').click(function() {
        $('#mod_act_header').html("Add Activity");
        $('#mod_sel_act_name').val("0").selectpicker('refresh');
        $('#mod_sel_act_fac').val("");
        $('#mod_sel_act_descrip').val("").trigger('autosize.resize');
        $('#mod_act_fis_yr').val("");
        $('#mod_act_role').val("").trigger('autosize.resize');
        
        hideModButtons();
        $('.mod_add_btn_class').show();
    });
    
    // mod activity change event ///////////////////////////////////////////////
    $('#mod_sel_act_name').change(function() {
        var act_id = $(this).val();
        if (act_id === "0") {
            $('#mod_sel_act_fac').val("");
            $('#mod_sel_act_descrip').val("").trigger('autosize.resize');
        }
        else {
            var result = new Array();
            result = db_getActFactInfo(act_id);
            $('#mod_sel_act_fac').val(result[0]['FacName']);
            $('#mod_sel_act_descrip').val(result[0]['ActDescription']).trigger('autosize.resize');
        }
        
        return false;
    });
    
    // table category edit click event /////////////////////////////////////////
    $('table').on('click', 'td', function() {   
        var cell = m_table.cell( this ).data();
        if (cell.indexOf("<i class='fa fa-edit'></i>") <= 0) {
            return false;
        }
        else {
            $('#mod_add_act').modal('show');
            hideModButtons();
            $('.mod_edit_btn_class').show();
            
            row_idx = m_table.cell( this ).index().row;
            var row_data = m_table.row(row_idx).data();
            var activities_id = cell.replace("<a href=# id='activities_id_", "").replace("'><i class='fa fa-edit'></i></a>", "");
            var fac_name = row_data[1];
            var act_descrip = row_data[2];
            var fis_yr = row_data[3];
            var act_role = row_data[4];
            setTimeout(function() {                 
                $('#mod_act_header').html("Edit Activity");
                $('#mod_sel_act_name').val(activities_id).selectpicker('refresh');
                $('#mod_sel_act_fac').val(fac_name);
                $('#mod_sel_act_descrip').val(act_descrip).trigger('autosize.resize');
                $('#mod_act_fis_yr').val(fis_yr);
                $('#mod_act_role').val(act_role).trigger('autosize.resize');
            }, 200);
        }

        return false;
    });
    
    // mod add button click ////////////////////////////////////////////////////
    $('#mod_act_btn_add').click(function() {
        var act_id = $('#mod_sel_act_name').val();
        var act_name = $("#mod_sel_act_name option:selected").text();
        var fac_name = $('#mod_sel_act_fac').val();
        var act_descrip = $('#mod_sel_act_descrip').val();
        var fiscal_yr = $('#mod_act_fis_yr').val();
        var act_role = $('#mod_act_role').val();
        
        m_table.row.add( [act_name, fac_name, act_descrip, fiscal_yr, act_role, "<a href=# id='activities_id_" + act_id + "'><i class='fa fa-edit'></i></a>"] ).draw();
    });
    
    // mod save button click ///////////////////////////////////////////////////
    $('#mod_act_btn_save').click(function() {
        var act_id = $('#mod_sel_act_name').val();
        var act_name = $("#mod_sel_act_name option:selected").text();
        var fac_name = $('#mod_sel_act_fac').val();
        var act_descrip = $('#mod_sel_act_descrip').val();
        var fiscal_yr = $('#mod_act_fis_yr').val();
        var act_role = $('#mod_act_role').val();
        
        m_table.row(row_idx).data( [act_name, fac_name, act_descrip, fiscal_yr, act_role, "<a href=# id='activities_id_" + act_id + "'><i class='fa fa-edit'></i></a>"] ).draw();
    });
    
    // mod delete button click /////////////////////////////////////////////////
    $('#mod_act_btn_delete').click(function() {
        m_table.row(row_idx).remove().draw();
    });
    
    // submit button click /////////////////////////////////////////////////////
    $('#btn_submit').click(function() {
        var stu_email2 = $.trim($('#stu_email2').val());
        if (stu_email2 !== "" && !isValidEmailAddress(stu_email2)) {
            swal({title: "Alternate Email", text: "Please enter valid email address for Email 2 section", type: "warning"});
            return false;
        }
        else {
            db_updateStudentEmail2(student_id, stu_email2);
        }

        if (m_table.data().length === 0) {
            swal({title: "No Activities", text: "Please add activities to submit", type: "warning"});
            return false;
        }
        else {
            addStuRequest();
            swal({ title: "Activities Submitted", 
               text: "Your request has been submitted successfully",
               type: "success", 
               showCancelButton: false, 
               confirmButtonText: "OK",
               closeOnConfirm: true },
               function() {
                    m_table.clear();
                    window.open('studentHome.html', '_self');
                    return false;
               }
            );
        }
    });
    
    // cancel button click /////////////////////////////////////////////////////
    $('#btn_cancel').click(function() {
        m_table.clear();
        window.open('studentHome.html', '_self');
        return false;
    });
    
    // auto size
    $('#mod_sel_act_descrip').autosize();
    $('#mod_act_role').autosize();
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_req_list').DataTable({ paging: false, bInfo: false, searching: false });
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
function hideModButtons() {
    $('.mod_add_btn_class').hide();
    $('.mod_edit_btn_class').hide();
}

////////////////////////////////////////////////////////////////////////////////
function getLoginInfo() {
    login_name = sessionStorage.getItem('ss_stu_sat_Name');
    $('#login_user').html(login_name);
    
    var stu_id = sessionStorage.getItem('ss_stu_sat_StudentID');
    $('#cur_date').val(getToday());
    $('#stu_id').val(stu_id);
    $('#stu_name').val(login_name);
    $('#stu_email').val(sessionStorage.getItem('ss_stu_sat_Email'));
    
//    var result = new Array();
//    result = tardis_getStudentInfo(stu_id);
//    if (result.length === 1) {
//        $('#stu_phone').val(result[0]['Phone']);
//        $('#stu_address').val(result[0]['Address']);
//        $('#stu_city').val(result[0]['City']);
//        $('#stu_state').val(result[0]['State']);
//        $('#stu_zip').val(result[0]['Zip']);
//    }
    
    var result2 = new Array();
    result2 = db_getStudentByStuID(stu_id);
    if (result2.length === 1) {
        student_id = result2[0]['StudentID'];
        $('#stu_email2').val(result2[0]['StuEmail2']);
    }
}

////////////////////////////////////////////////////////////////////////////////
function setStuActList() {
    var stu_id = sessionStorage.getItem('ss_stu_sat_StudentID');
    var result = new Array();
    result = db_getStuActList(stu_id); 
    
    $('#mod_sel_act_name').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['ActivitiesID'] + "'>" + result[i]['ActName'] + "</option>";
    }
    
    $('#mod_sel_act_name').append(html);
    $('#mod_sel_act_name').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function addStuRequest() {
    m_table.rows().data().each(function(value) {
        var cur_row = value;
        var act_id = cur_row[5].replace("<a href=# id='activities_id_", "").replace("'><i class='fa fa-edit'></i></a>", "");
        var fis_yr = textReplaceApostrophe($.trim(cur_row[3]));
        var act_role = textReplaceApostrophe($.trim(cur_row[4]));
        var stu_request_id = db_insertStuRequest(1, student_id, act_id, fis_yr, act_role);
        db_insertTransaction(stu_request_id, 0, login_name, "Activities Request Submitted");
    });
}