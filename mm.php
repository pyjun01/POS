<?php
    // header("Content-Type:application/json");
    $db=new PDO("mysql:host=localhost;dbname=pyjun01;charset=utf8", "root", "");
    $sql= "SELECT * FROM content";
    $row=$db->query($sql)->fetch();
    echo "a";
?>