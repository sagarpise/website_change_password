odoo.define('website_change_password.change_password', function (require) {
    "use strict";

    var ajax = require('web.ajax');
    require('web.dom_ready');

    $('#change_password_submit').on('click', function() {
        var action = $('#change_password_form').attr('action');
        var old_pwd = $('#old_pwd').val();
        var new_password = $('#new_password').val();
        var confirm_pwd = $('#confirm_pwd').val();
        var values = [
            {'name': 'old_pwd', 'value': old_pwd},
            {'name': 'new_password', 'value': new_password},
            {'name': 'confirm_pwd', 'value': confirm_pwd}
        ];
        $('#password_error').addClass('d-none').html('');
        ajax.jsonRpc(action, 'call', {'fields': values}).then(function(result) {
            if ("error" in result) {
                $('#password_error').removeClass('d-none').html(result["error"]);
            } else {
                window.location.replace("/");
            }
        }).fail(function(err, data) {
            var beautified = err.data.message.replace(/\r\n|\n|\r|None/g, '<br/>');
            $('#password_error').removeClass('d-none').html(beautified);
        });
    });

    $('.reveal').on('click', function() {
        var target = $("input[name='" + $(this).data('target') + "']");
        var type = $(target).attr('type') == 'password' ? 'text' : 'password';
        $(target).attr('type', type);
    });
});
