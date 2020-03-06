


var errorInfo = document.querySelector('.erro')


// 1-1. 绑定登录事件
$('#login-btn').on('click',function(e){
    e = e || window.event
    e.preventDefault()
    // 2. 获取用户输入的内容
    var uname = $("#username").val()
    var upass = $("#password").val()

    // 3. 表单验证
    if (!uname || !upass) {
    alert('请完整填写表单')
    return
    }
    // 4. 发送请求
    // 4-1. 创建 ajax 对象
    var xhr = new XMLHttpRequest()
    // 4-2. 配置本次请求的信息
    xhr.open('POST', 'http://127.0.0.1/login.php')//放在www里
    // 4-3. 接受响应
    xhr.onload = function () {
        console.log( xhr.responseText);
        var res = JSON.parse(xhr.responseText)
        
        if (res.code === 0) {
            errorInfo.style.display = 'block'
        } else {
            window.location.href = './index.html'
        }
    }
    // 4-4. 设置请求头
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

    // 4-5. 发送请求
    //      在 () 里面携带参数
    // xhr.send('username=' + uname + '&password=' + upass)
    xhr.send(`username=${uname}&password=${upass}`)
})






// 绑定注册事件
$('#signin-btn').on('click',function(e){
    e = e || window.event
    e.preventDefault()
    // 2. 获取用户输入的内容
    var uname = $("#username").val()
    var upass = $("#password").val()
    // 3. 表单验证
    if (!uname || !upass) {
    alert('请完整填写表单')
    return
    }
    // 4. 发送请求
    // 4-1. 创建 ajax 对象
    var xhr = new XMLHttpRequest()
    // 4-2. 配置本次请求的信息
    xhr.open('POST', 'http://127.0.0.1/signin.php')
    // 4-3. 接受响应
    xhr.onload = function () {
        // console.log( xhr.responseText);
        // var res = JSON.parse(xhr.responseText)
        alert('注册成功')
    }
    // 4-4. 设置请求头
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

    // 4-5. 发送请求
    // xhr.send('username=' + uname + '&password=' + upass)
    xhr.send(`username=${uname}&password=${upass}`)
})
