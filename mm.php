<?php
    // header("Content-Type:application/json");
    $db=new PDO("mysql:host=localhost;dbname=pyjun01;charset=utf8", "root", "");
    $sql= "SELECT * FROM content ORDER BY idx DESC";
    $row=$db->query($sql);
    foreach ($row as $key => $value) {
      $a[$key]=(object) array(
      0=>$value[0],
      1=>$value[1],
      2=>$value[2]
      );
    }
    echo json_encode($a);
?>
