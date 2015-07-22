

var baseUrl = 'http://localhost:3000';
var getUsers = $.get(baseUrl + '/users');
var getPermissions = $.get(baseUrl + '/permissions');


$(function () {

	var main = $('#template-main').html();
	var mainTpl = Handlebars.compile(main);
	// var uid = $('li').data('id')

	function usersData (users) {
		return $.get(baseUrl + '/users');
	}

	function getPerms (users) {
		users.forEach(function (user) {
			$.get(baseUrl + '/users/' + user.id + '/permissions')
				.done(function (userPermissions) {
					console.log(userPermissions)
				}).fail(function (xhr) {
					console.log('user ' + user.id + ' request failed', xhr.status)
				})
		})
	}

	usersData()
		.done(getPerms)

		function renderMain (user, name) {

			var fields = {
				userId: user,
				name: name
			}

			return mainTpl(fields);

		}

		console.log(getPermissions.done());

	$('button').one('click', function () {

		getUsers
			.done(function (users) {
				users.forEach(function (user) {

					$('ul').append(renderMain(user.id, user.name));
					
				});
			});

	});

	$('body').on('click', function () {

		


	})





})