var m_table;
var faculty_id = "";

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        $('.splash').css('display', 'none');
        adminSetting();
        getLoginInfo();
        getFacultyList();
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
    $('#btn_faculty_add').click(function() {
        faculty_id = "";
        $('#mod_faculty_header').html("New Faculty");
        $('#mod_faculty_mame').val("");
        $('#mod_faculty_email').val("");
        $('#mod_faculty_title').val("");
        $('#mod_faculty_phone').val("");
        $('#mod_faculty_depart').val("");
        $('#mod_faculty_division').val("");
    });
    
    // mod add category save button ////////////////////////////////////////////
    $('#mod_faculty_btn_save').click(function() {
        var fac_name = textReplaceApostrophe($.trim($('#mod_faculty_mame').val()));
        var fac_email = $.trim($('#mod_faculty_email').val());
        var fac_title = textReplaceApostrophe($.trim($('#mod_faculty_title').val()));
        var fac_phone = $.trim($('#mod_faculty_phone').val());
        var fac_depart = textReplaceApostrophe($.trim($('#mod_faculty_depart').val()));
        var fac_division = textReplaceApostrophe($.trim($('#mod_faculty_division').val()));
        
        if (fac_name === "" || fac_email === "") {
            swal({title: "Error", text: "Please enter faculty name and email", type: "error"});
            return false;
        }
        
        if (faculty_id === "") {
            db_insertFaculty(fac_name, fac_email, fac_title, fac_phone, fac_depart, fac_division);
        }
        else {
            db_updateFaculty(faculty_id, fac_name, fac_email, fac_title, fac_phone, fac_depart, fac_division);
        }
        
        $('#mod_add_faculty').modal('hide');
        getFacultyList();
        return false;
    });
    
    // table category edit click event /////////////////////////////////////////
    $('table').on('click', 'a[id^="faculty_id_"]', function() {
        faculty_id = $(this).attr('id').replace("faculty_id_", "");
        var result = db_getFacultyByID(faculty_id);
        $('#mod_faculty_header').html("Edit Faculty");
        $('#mod_faculty_mame').val(result[0]['FacName']);
        $('#mod_faculty_email').val(result[0]['FacEmail']);
        $('#mod_faculty_title').val(result[0]['FacTitle']);
        $('#mod_faculty_phone').val(result[0]['FacPhone']);
        $('#mod_faculty_depart').val(result[0]['FacDepart']);
        $('#mod_faculty_division').val(result[0]['FacDivision']);
        $('#mod_add_faculty').modal('show');
        return false;
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_faculty_list').DataTable({ paging: false, bInfo: false });
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
    var login_name = sessionStorage.getItem('ss_sf_sat_Name');
    $('#login_user').html(login_name);
}

////////////////////////////////////////////////////////////////////////////////
function getFacultyList() {
    var result = new Array();
    result = db_getFacultyList();
    
    m_table.clear();
    m_table.rows.add(result).draw();
    
    $('.animate-panel').animatePanel();
}