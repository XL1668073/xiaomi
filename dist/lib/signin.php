<?php
    header("Access-Control-Allow-Origin:*"); // 允许哪些域名请求我
    header("Access-Control-Request-Methods:GET, POST, PUT, DELETE, OPTIONS"); // 允许哪些请求方式
    header('Access-Control-Allow-Headers:x-requested-with,content-type,test-token,test-sessid'); // 允许携带哪些请求头信息

    header('content-type: text/html;charset=utf-8;');

    // 1. 接受前端传递来的参数
    //    因为是 POST 请求, 就在 $_POST 里面获取
    $uname = $_POST['username'];
    $upass = $_POST['password'];

    // 2. 去数据库里面查询有没有这个数据了
    // 2-1. 连接数据库
    $link = mysqli_connect('localhost', 'root', 'root', 'nj1911');

    // 2-2. 执行 sql 语句
    $sql = "INSERT INTO `userdate` VALUES(null, '$uname','$upass')";

    // $sql = "insert into sport values(2,'$test','attend')";
    $res = mysqli_query($link, $sql);

    // 2-3. 断开数据库连接
    mysqli_close($link);


    var_dump($res);
?>