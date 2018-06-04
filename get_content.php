<?php
  $db=new PDO("mysql:host=localhost;dbname=pyjun01;charset=utf8", "root", "");

  $sql="SELECT text FROM content WHERE idx='{$_POST['num']}'";
  $row=$db->query($sql)->fetch();
  echo $row[0];
 ?>
