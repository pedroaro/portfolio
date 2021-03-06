var chat_tabs = [];
		
function close_chat_tab () {
	/* Eliminar de DOM */
	closed_chat_tab = $(this).parent().parent();
	closed_chat_tab_id = closed_chat_tab.attr('id');
	closed_chat_tab.remove();
	/* Eliminar de lista de chat tabs abiertas */
	for (i=0; i<chat_tabs.length; i++) {
		if (chat_tabs[i]==closed_chat_tab_id) {
			delete chat_tabs[i];
			break;
		}
	}
};

function send_msg (textarea) {
	var msg = textarea.val();
	msgs_panel = textarea.parent().siblings(".g4_msgs_panel");
	msgs_panel.append('<div class="g4_msg g4_msg_right">'+msg+'</div>');
	textarea.val("");
	setTimeout(function () { msgs_panel.append('<div class="g4_msg g4_msg_left">'+msg+'</div>'); }, 200);
	msgs_panel.scrollTop(msgs_panel.prop("scrollHeight"));
}

$("document").ready(
	function () {
		$(".g4_sidebar_friend").click( function () {
			var clicked_chat_id = $(this).data("id");
			var already_opened = false;
			
			/* Verificando si el chat tab ya esta abierto */
			for (i=0; i<chat_tabs.length; i++) {
				if (chat_tabs[i]==clicked_chat_id) {
					already_opened = true;
				}
			}
			if (already_opened) {
				/* Enfocar el chat tab correspondiente */
			} else {
				/* Desplegar el chat tab correspondiente */
				chat_tabs.push(clicked_chat_id);
				var name = $(this).find(".g4_sidechat_name").text();
				var new_chat_tab = '<div id="'+clicked_chat_id+'" class="g4_chat_tab"><div class="g4_tab_title_container"><span class="g4_tab_title">'+name+'</span><span class="g4_close_chat_icon">&times;</span><div class="g4_chat_style_icon"></div></div><div class="g4_msgs_panel"></div><div class="g4_input_msg_container"><textarea rows="2" class="g4_input_msg"></textarea></div><div class="g4_msg_extras"><div class="g4_icon_container"><div class="g4_input_icon g4_image_icon"></div></div><div class="g4_icon_container"><div class="g4_input_icon g4_emoji_icon"></div></div><div class="g4_icon_container"><div class="g4_input_icon g4_bee_icon"></div></div></div></div>'
				new_chat_tab = $(".g4_chat_tab_container").append(new_chat_tab);
				$(".g4_close_chat_icon").click(close_chat_tab);
				$(".g4_input_msg").keypress(function(e) {
					if(e.which == 13) {
						send_msg($(this));
					}
				});
				$(".g4_input_msg").focus();
			}
		});
		
	}
);
