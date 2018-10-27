var $ = jQuery;

$( document ).on( 'ready', function() {
    if($('div#butterbean-control-oh_hook_php')){
        init_editor();
        
        $('input[type=radio][name=butterbean_oceanwp_mb_settings_setting_oh_hook_php]').change(function() {
            init_editor();
        });
        
        $('input[type=radio][name=butterbean_oceanwp_mb_settings_setting_oh_enable_hook]').change(function() {
            init_editor();
        });
    }
    if($('div#butterbean-control-oh_hook_cond_logic').length > 0 && $('div#butterbean-control-oh_hook_user_roles').length > 0){
        var hookId = $( "input[name='post_ID']" ).val();
        var activeCond = 0;
        var activeRoles = 0;
        if($( "input[name='butterbean_oceanwp_mb_settings_setting_oh_hook_cond_logic']" ).is(':checked')){
            activeCond = 1;
        }
        if($( "input[name='butterbean_oceanwp_mb_settings_setting_oh_hook_user_roles']" ).is(':checked')){
            activeRoles = 1;
        }
        var data = {
            'action': 'get_hook_conditional_rules',
            'activeCond': activeCond,
            'activeRoles': activeRoles,
            'hookId': hookId
        };
        //alert(data.toSource());
        $.post(ajaxurl, data, function(response) {
            //alert('Got this from the server: ' + response);
            console.log(response);
            var obj = JSON.parse(response);
            if (obj.status) {
                $('div#butterbean-control-oh_hook_cond_logic').after(obj.condHTML);
                $('div#butterbean-control-oh_hook_user_roles').after(obj.rolesHTML);
            }
        });
        
        $(document).on('change', "input[name='butterbean_oceanwp_mb_settings_setting_oh_hook_cond_logic']", function(){
            var checkbox = $(this);
            if(checkbox.is(':checked')){
                $('div.options-cond').show();
            }else{
                $('div.options-cond').hide();
            }
        });
        
        $(document).on('change', "input[name='butterbean_oceanwp_mb_settings_setting_oh_hook_user_roles']", function(){
            var checkbox = $(this);
            if(checkbox.is(':checked')){
                $('div.options-roles').show();
            }else{
                $('div.options-roles').hide();
            }
        });
        
        // Remove Display 
        $( document ).on( 'click', '.display-on-remove', function() {
            $( this ).closest( '.dispaly-on' ).remove();
        } );

        $( document ).on( 'click', '.hide-on-remove', function() {
            $( this ).closest( '.hide-on' ).remove();
        } );

        // Remove User Roles
         $( document ).on( 'click', '.roles-remove', function() {
            $( this ).closest( '.roles-selector' ).remove();
        } );
    }
});

/* ==============================================
ADD/REMOVE DISPLAY ON
============================================== */
function add_display_on() {
    var template = wp.template( 'dispaly-on-field' );
    $( '.display-on-fields' ).append( template() );
}

/* ==============================================
ADD/REMOVE HIDE ON
============================================== */
function add_hide_on() {
    
    var template = wp.template('hide-on-field' );
    
    $( '.hide-on-fields' ).append( template() );
}

/* ==============================================
ADD/REMOVE USER ROLES
============================================== */
function add_user_roles() {
     var template = wp.template('roles-field' );
     $( '.roles-fields' ).append( template() );
}

function remove_user_roles( obj ) {
     $( obj ).closest('.roles-selector' ).remove();
}

/* ==============================================
Toggle editor and code editor
============================================== */
function init_editor(){
    if($('input[type=radio][name=butterbean_oceanwp_mb_settings_setting_oh_enable_hook]:checked').val() == 'enable' && $('input[type=radio][name=butterbean_oceanwp_mb_settings_setting_oh_hook_php]:checked').val() == 'enable' ){
        $('body').addClass( 'ocean-hook-php-enabled' );
    }else{
        $('body').removeClass( 'ocean-hook-php-enabled' );
    }
}