var pdf;

// set default pdf pg width and height
var page_x = 8.5;
var page_y = 11.0;

// set default x y margin
var margin_x = 0.5;
var margin_y = 0.5;
var column_width = 0.625;
var line_pos = margin_y;
var x_offset = 0;
var text = "";

////////////////////////////////////////////////////////////////////////////////
function createContractPDFfile() {
    pdf = new jsPDF('p', 'in', 'letter');
    pdf.setFont("helvetica");
    pdf.setFontSize(9);
    
    pdf_setStatus();
    pdf_setRequestorInformation();
    pdf_setContractInformation();
    pdf_setTransactionHistory();
    
    var curBrowser = bowser.name;    
    if (curBrowser === "Internet Explorer") {
        pdf.save($('#contract_title').html() + '.pdf');
    }
    else {
        pdf.output('dataurl');
    }
}

////////////////////////////////////////////////////////////////////////////////
function getPDFCenterOffset(pdf, page_width, text) {
    var textWidth = pdf.getStringUnitWidth(text) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    var textOffset = (page_width - textWidth) / 2;
    
    return textOffset;
}

function moveToPDFNextPage() {
    if (line_pos >= 10) {
        pdf.addPage();
        line_pos = margin_y;
    }
}

////////////////////////////////////////////////////////////////////////////////
function pdf_setStatus() {
    pdf.setDrawColor(0);
    pdf.setFillColor(84, 84, 84);
    pdf.rect(margin_x, line_pos, page_x - (margin_x + margin_y), 0.2, 'F');
    text = "Status Information";
    pdf.setTextColor(255, 255, 255);   
    x_offset = getPDFCenterOffset(pdf, page_x, text);
    line_pos += 0.15;
    pdf.text(x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setTextColor(0, 0, 0);
    pdf.text(margin_x, line_pos, 'Status:');
    pdf.setFontType("bold");
    pdf.text(margin_x + (column_width * 2), line_pos, $('#cont_status').html());
    pdf.setFontType("normal");
    pdf.text(margin_x + (column_width * 6), line_pos, 'Approval:');
    pdf.setFontType("bold");
    pdf.text(margin_x + (column_width * 8), line_pos, $('#cont_apl_status').html());
    pdf.setFontType("normal");
}

function pdf_setRequestorInformation() {
    line_pos += 0.15;
    pdf.setDrawColor(0);
    pdf.setFillColor(84, 84, 84);
    pdf.rect(margin_x, line_pos, page_x - (margin_x + margin_y), 0.2, 'F');
    text = "Requestor information";
    pdf.setTextColor(255, 255, 255);   
    x_offset = getPDFCenterOffset(pdf, page_x, text);
    line_pos += 0.15;
    pdf.text(x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setTextColor(0, 0, 0);
    pdf.text(margin_x, line_pos, 'Originator:');
    pdf.text(margin_x + (column_width * 2), line_pos, $('#originator').html());
    pdf.text(margin_x + (column_width * 6), line_pos, 'Date:');
    pdf.text(margin_x + (column_width * 8), line_pos, $('#current_date').html());
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'School/Office:');
    pdf.text(margin_x + (column_width * 2), line_pos, $('#school').html());
    pdf.text(margin_x + (column_width * 6), line_pos, 'Location:');
    pdf.text(margin_x + (column_width * 8), line_pos, $('#location').html());

    var urgent = ($('#urgent').is(':checked') ? true : false);
    line_pos += 0.25;
    pdf.setLineWidth(0.01);
    x_offset = getPDFCenterOffset(pdf, column_width * 2, 'XX');
    if (urgent) {
        pdf.rect(margin_x + x_offset, line_pos - 0.10, 0.10, 0.10, 'F');
    }
    else {
        pdf.rect(margin_x + x_offset, line_pos - 0.10, 0.10, 0.10);
    }
    pdf.setTextColor(255, 0, 0);
    pdf.text(margin_x + (column_width * 2), line_pos, "check the Box if URGENT");
    
    line_pos += 0.25;   
    pdf.setTextColor(0, 0, 0);
    pdf.text(margin_x, line_pos, 'Dept. Manager:');
    pdf.text(margin_x + (column_width * 2), line_pos, $('#dept_manager').html());
    pdf.setFontType("bold");
    pdf.text(margin_x + (column_width * 6), line_pos, $('#dept_manager_status').html());
    pdf.text(margin_x + (column_width * 8), line_pos, $('#dept_manager_dtstamp').html());
    
    line_pos += 0.25;   
    pdf.setFontType("normal");
    pdf.text(margin_x, line_pos, 'Vice President:');
    pdf.text(margin_x + (column_width * 2), line_pos, $('#vice_president').html());
    pdf.setFontType("bold");
    pdf.text(margin_x + (column_width * 6), line_pos, $('#vice_president_status').html());
    pdf.text(margin_x + (column_width * 8), line_pos, $('#vice_president_dtstamp').html());
    
    line_pos += 0.25;   
    pdf.setFontType("normal");
    pdf.text(margin_x, line_pos, 'President:');
    pdf.text(margin_x + (column_width * 2), line_pos, $('#president').html());
    pdf.setFontType("bold");
    pdf.text(margin_x + (column_width * 6), line_pos, $('#president_status').html());
    pdf.text(margin_x + (column_width * 8), line_pos, $('#president_dtstamp').html());
    pdf.setFontType("normal");
}

function pdf_setContractInformation() {
    line_pos += 0.15;
    pdf.setDrawColor(0);
    pdf.setFillColor(84, 84, 84);
    pdf.rect(margin_x, line_pos, page_x - (margin_x + margin_y), 0.2, 'F');
    text = "Contract information";
    pdf.setTextColor(255, 255, 255);   
    x_offset = getPDFCenterOffset(pdf, page_x, text);
    line_pos += 0.15;
    pdf.text(x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setTextColor(0, 0, 0);
    pdf.text(margin_x, line_pos, 'Contract Type:');
    pdf.text(margin_x + (column_width * 2), line_pos, $('#contract_type').html());
    pdf.text(margin_x + (column_width * 6), line_pos, 'Req. Number:');
    pdf.text(margin_x + (column_width * 8), line_pos, $('#req_number').html());
    
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Contact Name:');
    pdf.text(margin_x + (column_width * 2), line_pos, $('#contact_name').html());
    pdf.text(margin_x + (column_width * 6), line_pos, 'Contact Email:');
    pdf.text(margin_x + (column_width * 8), line_pos, $('#contact_email').html());
    
    text = $('#contract_title').html().replace(/<br>/g, '\n').trim();
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Contract Title:');
    var ar_cont_title = pdf.splitTextToSize(text, 6.25);
    for (var i = 0; i < ar_cont_title.length; i++) {        
        if (i === 0) {
            pdf.text(margin_x + (column_width * 2), line_pos, ar_cont_title[i]);
        }
        else {
            line_pos += 0.15;
            pdf.text(margin_x + (column_width * 2), line_pos, ar_cont_title[i]);
        }
    }
    
    text = $('#description').html().replace(/<br>/g, '\n').trim();
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Description:');
    var ar_descrip = pdf.splitTextToSize(text, 6.25);
    for (var i = 0; i < ar_descrip.length; i++) {
        moveToPDFNextPage();  
        if (i === 0) {
            pdf.text(margin_x + (column_width * 2), line_pos, ar_descrip[i]);
        }
        else {
            line_pos += 0.15;
            pdf.text(margin_x + (column_width * 2), line_pos, ar_descrip[i]);
        }
    }
    
    text = $('#fiscal_assessment').html().replace(/<br>/g, '\n').trim();
    line_pos += 0.25;
    pdf.text(margin_x, line_pos, 'Fiscal Assessment:');
    var ar_fiscal = pdf.splitTextToSize(text, 6.25);
    for (var i = 0; i < ar_fiscal.length; i++) {
        moveToPDFNextPage();
        if (i === 0) {
            pdf.text(margin_x + (column_width * 2), line_pos, ar_fiscal[i]);
        }
        else {
            line_pos += 0.15;
            pdf.text(margin_x + (column_width * 2), line_pos, ar_fiscal[i]);
        }
    }
    
    getFileAttachmentList();
    
    if ($('#contract_type').html() === "Hardware" || $('#contract_type').html() === "Software") {
        getContractServices();
    }
}

function getFileAttachmentList() {
    line_pos += 0.25;
    moveToPDFNextPage();
    pdf.setDrawColor(0);
    pdf.setFillColor(84, 84, 84);
    pdf.rect(margin_x, line_pos, page_x - (margin_x + margin_y), 0.2, 'F');
    text = "Attachment List";
    pdf.setTextColor(255, 255, 255);
    x_offset = getPDFCenterOffset(pdf, page_x, text);
    line_pos += 0.15;
    pdf.text(x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setTextColor(0, 0, 0);
    pdf.text(margin_x, line_pos, 'Attachment');
    pdf.text(margin_x + (column_width * 4), line_pos, 'DocuSign Document');
    pdf.text(margin_x + (column_width * 8), line_pos, 'DocuSign Status');
    pdf.text(margin_x + (column_width * 10), line_pos, 'Date Time');
    
    line_pos += 0.10;
    pdf.setFontType("normal");
    pdf.setLineWidth(0.01);
    pdf.line(margin_x, line_pos, (column_width * 12) + margin_x, line_pos);
    
    $('#attach_file_list').children().each(function () {
        line_pos += 0.25;
        moveToPDFNextPage();
        pdf.text(margin_x, line_pos, $('#href_file_link_name').html());
        pdf.text(margin_x + (column_width * 4), line_pos, $('#dcsg_file_link_name').html());
        pdf.text(margin_x + (column_width * 8), line_pos, $('#envelope_status').html());
        pdf.text(margin_x + (column_width * 10), line_pos, $('#dt_stamp').html());
    });
}

function getContractServices() {
    line_pos += 0.25;
    moveToPDFNextPage();
    pdf.setDrawColor(0);
    pdf.setFillColor(84, 84, 84);
    pdf.rect(margin_x, line_pos, page_x - (margin_x + margin_y), 0.2, 'F');
    text = "Contract Service Information";
    pdf.setTextColor(255, 255, 255);
    x_offset = getPDFCenterOffset(pdf, page_x, text);
    line_pos += 0.15;
    pdf.text(x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setTextColor(0, 0, 0);
    pdf.text(margin_x, line_pos, 'Yearly Contract Value:');
    pdf.text(margin_x + (column_width * 2), line_pos, $('#yr_cont_value').html());
    pdf.text(margin_x + (column_width * 6), line_pos, $('#cont_term').html());
    pdf.text(margin_x + (column_width * 8), line_pos, $('#number_term').html());
    
    line_pos += 0.25;
    moveToPDFNextPage();
    pdf.text(margin_x, line_pos, 'Total Contract Value:');
    pdf.text(margin_x + (column_width * 2), line_pos, $('#total_cont_value').html());
    var bot = ($('#needs_bot').is(':checked') ? true : false);
    pdf.setLineWidth(0.01);
    x_offset = getPDFCenterOffset(pdf, column_width, 'XX');
    if (bot) {
        pdf.rect(margin_x + (column_width * 6) + x_offset, line_pos - 0.10, 0.10, 0.10, 'F');
    }
    else {
        pdf.rect(margin_x + (column_width * 6) + x_offset, line_pos - 0.10, 0.10, 0.10);
    }
    pdf.text(margin_x + (column_width * 7), line_pos, "Needs BOT Approval");
    
    line_pos += 0.25;
    moveToPDFNextPage();
    pdf.text(margin_x, line_pos, 'Contract Start Date:');
    pdf.text(margin_x + (column_width * 2), line_pos, $('#start_date').html());
    pdf.text(margin_x + (column_width * 6), line_pos, 'Contract End Date:');
    pdf.text(margin_x + (column_width * 8), line_pos, $('#end_date').html());
}

function pdf_setTransactionHistory() {
    line_pos += 0.15;
    moveToPDFNextPage();
    pdf.setDrawColor(0);
    pdf.setFillColor(84, 84, 84);
    pdf.rect(margin_x, line_pos, page_x - (margin_x + margin_y), 0.2, 'F');
    text = "Transaction History";
    pdf.setTextColor(255, 255, 255);   
    x_offset = getPDFCenterOffset(pdf, page_x, text);
    line_pos += 0.15;
    pdf.text(x_offset, line_pos, text);
    
    line_pos += 0.25;
    pdf.setTextColor(0, 0, 0);
    text = $('#transaction_history').html().replace(/<br>/g, '\n').trim(); 
    var ar_trans_history = pdf.splitTextToSize(text, 8);
    for (var i = 0; i < ar_trans_history.length; i++) {
        moveToPDFNextPage();
        
        if (i === 0) {
            pdf.text(margin_x, line_pos, ar_trans_history[i]);
        }
        else {
            line_pos += 0.15;
            pdf.text(margin_x, line_pos, ar_trans_history[i]);
        }
    }
}