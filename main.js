$(document).ready(function() {
    let fieldCount = 0;
    let fieldNames = []; 

    $('#customForm button[type="submit"]').hide();

    function updateSaveButton() {
        if (fieldCount > 0) {
            $('#customForm button[type="submit"]').show();
        } else {
            $('#customForm button[type="submit"]').hide();
        }
    }

    $('#addTextField').click(function() {
        const fieldName = $('#newFieldTextName').val().trim();

        if (fieldName !== "") {
            fieldCount++;
            fieldNames.push(fieldName); 
            
            $('#customForm').append(`
                <div class="field-group" id="field${fieldCount}">
                    <label>${fieldName}:</label>
                    <input type="text" name="${fieldName}" />
                </div>
            `);

            $('#newFieldTextName').val('');
            updateSaveButton();
            $('#customForm button[type="submit"]').appendTo('#customForm');
        } else {
            alert("Please enter a field name.");
        }
    });

    $('#addSelectField').click(function() {
        const fieldName = $('#newSelectTextName').val().trim();

        if (fieldName !== "") {
            fieldCount++;
            fieldNames.push(fieldName); 
            
            $('#customForm').append(`
                <div class="field-group" id="field${fieldCount}">
                    <label>${fieldName}:</label>
                    <select name="${fieldName}" data-type="select">
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                    </select>
                </div>
            `);
            $('#newSelectTextName').val('');
            updateSaveButton();
            $('#customForm button[type="submit"]').appendTo('#customForm');
        } else {
            alert("Please enter a field name");
        }
    });

    $('#removeLastField').click(function() {
        if (fieldCount > 0) {
            const lastFieldName = fieldNames.pop();
            $(`#field${fieldCount}`).remove();
            fieldCount--;

            updateTableOnRemove(lastFieldName);
            updateSaveButton();
            $('#customForm button[type="submit"]').appendTo('#customForm');
        }
    });

    function updateTableOnRemove(fieldName) {
        let headerIndexToRemove = -1;
        
        $('#dataTable thead th').each(function(index) {
            if ($(this).text() === fieldName) {
                headerIndexToRemove = index; 
                $(this).remove(); 
                return false; 
            }
        });

        $('#dataTable tbody tr').each(function() {
            $(this).find('td').eq(headerIndexToRemove).remove(); 
        });
    }

    $('#customForm').submit(function(e) {
        e.preventDefault();
        let headers = [];
        let data = [];

        $('.field-group').each(function() {
            let label = $(this).find('label').text().replace(':', '');
            let value = $(this).find('input, select').val();
            headers.push(label);
            data.push(value);
        });
        
        if (headers.length > 0) {
            $('#dataTable thead').empty();
            let headerRow = '<tr>';
            headers.forEach(header => {
                headerRow += `<th>${header}</th>`;
            });
            headerRow += '</tr>';
            
            $('#dataTable thead').append(headerRow);
            let dataRow = '<tr>';
            data.forEach(item => {
                dataRow += `<td>${item}</td>`;
            });
            dataRow += '</tr>';
            $('#dataTable tbody').append(dataRow);
        }

        $('#customForm')[0].reset();
    });
});
