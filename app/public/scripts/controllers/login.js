    
    $(function() {

        $('#loginButton').on('click', function(event) {
            var _username = $('input[name="username"]').val();
            var _password = $('input[name="password"]').val();

            if (!_username) {
                alert('用户名不能为空!');
                return false;
            }

            if (!_password) {
                alert('密码不能为空!');
                return false;
            }

            $.ajax({
                url: '/api/login',
                type: 'POST',
                data: {
                    username: _username,
                    password: _password
                },
                success: function(data) {
                    if (data.data) {
                        location.href = '/matterInReg';
                    } else {
                        alert(data.message);
                    }
                },
                error: function(err) {
                    alert(err);
                }
            })
        });
    })
