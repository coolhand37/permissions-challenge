

$(function () {

var main = $('#template-main').html();
var mainTpl = Handlebars.compile(main);
var baseUrl = 'http://localhost:3000';

	function renderMain (user, name) {

			var fields = {
				userId: user,
				name: name
			}

			return mainTpl(fields);

		}



	$('button').on('click', function () {
		
		$('.users').show()
		$('.userperms').hide()
		$.get(baseUrl + '/users')
		 .done(function (users) {
			users.forEach(function (user) {
				$('.main').append(renderMain(user.id, user.name));
				
			});
		});
	})

	$('ul').on('click', 'button', function() {

		$('.users').hide()
		$('.userperms').show()
		var uid = $(this).parents('li').data('id')
		var uname = $(this).parents('li').data('name')

		$('.userperms').prepend('<h2>' + uname + ' permissions</h2>')
		

		$.get(baseUrl + '/users')
		 .done(function (users) {
			 	users.forEach(function (user) {
			 		$.get(baseUrl + '/users/' + user.id +'/permissions')
			 		 .done(function (perms) {
			 		 	perms.forEach(function (perm) {
			 		 		if (uid === perm.userId) {
			 		 			$('.perms').append('<li>' + perm.permissions + '</li>')
			 		 		}
			 		 	})
			 		 })
			 	})
		 })

	})



})