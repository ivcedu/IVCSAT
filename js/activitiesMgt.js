var login_name = "";
var m_table;
var activities_id = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        $('.splash').css('display', 'none');
        adminSetting();
        getLoginInfo();
        getCategoryList();
        getActTypeList();
        getFacultyList();
        getActivitiesList();
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
    $('#btn_activity_add').click(function() {
        activities_id = "";
        $('#mod_activity_header').html("New Activity");
        $('#mod_sel_category').val("0");
        $('#mod_sel_category').selectpicker('refresh');
        $('#mod_sel_acttype').val("0");
        $('#mod_sel_acttype').selectpicker('refresh');
        $('#mod_sel_faculty').val("0");
        $('#mod_sel_faculty').selectpicker('refresh');
        $('#mod_activity_mame').val("");
        $('#mod_activity_descrip').val("").trigger('autosize.resize');
    });
    
    // mod add category save button ////////////////////////////////////////////
    $('#mod_activity_btn_save').click(function() {
        var category_id = $('#mod_sel_category').val();
        var acttype_id = $('#mod_sel_acttype').val();
        var faculty_id = $('#mod_sel_faculty').val();
        var act_name = textReplaceApostrophe($.trim($('#mod_activity_mame').val()));
        var act_description = textReplaceApostrophe($.trim($('#mod_activity_descrip').val()));
        if (category_id === "0" || acttype_id === "0" || faculty_id === "0" || act_name === "") {
            swal({title: "Error", text: "Please select category, activity type and faculty and enter activities name", type: "error"});
            return false;
        }
        
        if (activities_id === "") {
            var new_activities_id = db_insertActivities(category_id, acttype_id, faculty_id, act_name, act_description);
            db_insertTransaction(0, 6, login_name, "Added activities ID: " + new_activities_id);
        }
        else {
            db_updateActivities(activities_id, category_id, acttype_id, faculty_id, act_name, act_description);
            db_insertTransaction(0, 6, login_name, "Update activities ID: " + activities_id);
        }
        
        $('#mod_add_activity').modal('hide');
        getActivitiesList();
        return false;
    });
    
    // table category edit click event /////////////////////////////////////////
    $('table').on('click', 'a[id^="activities_id_"]', function() {
        $('#mod_add_activity').modal('show');

        activities_id = $(this).attr('id').replace("activities_id_", "");
        var result = db_getActivitiesByID(activities_id);
        setTimeout(function() { 
            $('#mod_activity_header').html("Edit Activities");
            $('#mod_sel_category').val(result[0]['CategoryID']);
            $('#mod_sel_category').selectpicker('refresh');
            $('#mod_sel_acttype').val(result[0]['ActTypeID']);
            $('#mod_sel_acttype').selectpicker('refresh');
            $('#mod_sel_faculty').val(result[0]['FacultyID']);
            $('#mod_sel_faculty').selectpicker('refresh');
            $('#mod_activity_mame').val(result[0]['ActName']);
            $('#mod_activity_descrip').val(result[0]['ActDescription']).trigger('autosize.resize'); 
        }, 200);
        
        return false;
    });
    
    // bootstrap selectpicker
    $('.selectpicker').selectpicker();
    
    // auto size
    $('#mod_activity_descrip').autosize();
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_activities_list').DataTable({ paging: false, bInfo: false });
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
function getCategoryList() {
    var result = new Array(); 
    result = db_getCategoryList();
    
    $('#mod_sel_category').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        var str_id = result[i]['CategoryID'].replace("<a href=# id='cat_id_", "").replace("'><i class='fa fa-edit'></i></a>", "");
        html += "<option value='" + str_id + "'>" + result[i]['CatName'] + "</option>";
    }
    
    $('#mod_sel_category').append(html);
    $('#mod_sel_category').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function getActTypeList() {
    var result = new Array(); 
    result = db_getActTypeList();
    
    $('#mod_sel_acttype').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        var str_act_type_id = result[i]['ActTypeID'].replace("<a href=# id='acttype_id_", "").replace("'><i class='fa fa-edit'></i></a>", "");
        html += "<option value='" + str_act_type_id + "'>" + result[i]['ActTypeName'] + "</option>";
    }
    
    $('#mod_sel_acttype').append(html);
    $('#mod_sel_acttype').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function getFacultyList() {
    var result = new Array(); 
    result = db_getFacultyList();
    
    $('#mod_sel_faculty').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        var str_faculty_id = result[i]['FacultyID'].replace("<a href=# id='faculty_id_", "").replace("'><i class='fa fa-edit'></i></a>", "");
        html += "<option value='" + str_faculty_id + "'>" + result[i]['FacName'] + "</option>";
    }
    
    $('#mod_sel_faculty').append(html);
    $('#mod_sel_faculty').selectpicker('refresh');
}

////////////////////////////////////////////////////////////////////////////////
function getActivitiesList() {
    var result = new Array();
    result = db_getActivitiesList();
    
    m_table.clear();
    m_table.rows.add(result).draw();
    
    $('.animate-panel').animatePanel();
}