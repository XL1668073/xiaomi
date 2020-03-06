<?php

    header("Access-Control-Allow-Origin:*"); // 允许哪些域名请求我
    header("Access-Control-Request-Methods:GET, POST, PUT, DELETE, OPTIONS"); // 允许哪些请求方式
    header('Access-Control-Allow-Headers:x-requested-with,content-type,test-token,test-sessid'); // 允许携带哪些请求头信息


    // 1. 接受前端传递来的参数
    //    因为是 POST 请求, 就在 $_POST 里面获取
    $uname = $_POST['username'];
    $upass = $_POST['password'];

    // 2. 去数据库里面查询有没有这个数据了
    // 2-1. 连接数据库
    $link = mysqli_connect('localhost', 'root', 'root', 'nj1911');

    // 2-2. 执行 sql 语句
    $sql = "SELECT * FROM `userdate` WHERE `username`='$uname' AND `password`='$upass'";
    $res = mysqli_query($link, $sql);

    // 2-3. 解析结果
    //      因为是查询, 所以要解析结果
    $row = mysqli_fetch_assoc($res);

    // 2-4. 断开数据库连接
    mysqli_close($link);

    // 3. 根据有没有数据给前端返回结果
    //    以前, 是浏览器请求后端, 我们直接操作浏览器
    //    现在, 是 js 请求后端, 我们就把结果给回去就可以了
    // if ($row) {
    //   echo '登陆成功';
    // } else {
    //   echo '登录失败';
    // }

    // 如果成功, 我返回一个关联型数组
    // 如果失败, 我也返回一个关联型数组
    if ($row) {
        $arr = array("message" => "登录成功", "code" => 1);
    } else {
        $arr = array("message" => "登录失败", "code" => 0);
    }

    // // 把这关联型数组返回
    print_r(json_encode($arr));


?>
