<?php
    // header("Content-Type:application/json");
    $db=new PDO("mysql:host=localhost;dbname=pyjun01;charset=utf8", "root", "");
    $sql= "SELECT * FROM content";
    $row=$db->query($sql);
    $a;
    foreach ($row as $key => $value) {
//       echo "idx: {$value[0]}
// ";
//       echo "title: {$value[1]}
// ";
//       echo "content: {$value[2]}
// ";
      $a[$key]=$value;
    }
    echo json_encode($a);
?>
