<?php
	/*
	$link = mysql_connect(SAE_MYSQL_HOST_M . ':' . SAE_MYSQL_PORT, SAE_MYSQL_USER, SAE_MYSQL_PASS);
	$link = mysql_connect(SAE_MYSQL_HOST_S . ':' . SAE_MYSQL_PORT, SAE_MYSQL_USER, SAE_MYSQL_PASS);
	if(!$link){
		die("error: " . mysql_error());
	}
	//$link=mysql_connect(SAE_MYSQL_HOST_S.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS);
	mysql_select_db(SAE_MYSQL_DB, $link);
	mysql_close();
	
	header("Content-type:text/html;charset=utf-8");
	echo "用户名   :" . SAE_MYSQL_USER;
	echo "密码     :" . SAE_MYSQL_PASS;
	echo "主库域名:" . SAE_MYSQL_HOST_M;
	echo "从库域名:" . SAE_MYSQL_HOST_S;
	echo "端口     :" . SAE_MYSQL_PORT;
	echo "数据库名:" . SAE_MYSQL_DB;
	*/
	header("Content-type: text/html; charset = utf-8");
	//header("Cache-control: no-cache");
	$mysql = new SaeMysql();
	$mysql->setCharset('gbk');
	//$mysql->runSql("set names utf-8");
	
	$sql = "SELECT * FROM `user`";
	$data = $mysql -> getData($sql);
	
	echo print_r($data);
	
	echo "<table><tr><th>name</th><th>sex</th></tr>";
	while($raw = mysql_fetch_array($data, 1)) {
		echo "<tr><td>" . $raw['name'] . "</td><td>" . $raw['sex'] . "</td></tr>";
	}
	echo "</table>";
	//$name = strip_tags( $_REQUEST['name'] );
	//$age = intval( $_REQUEST['age'] );
	
	//$sql = "INSERT  INTO `user` ( `name` , `age` , `regtime` ) VALUES ( '"  . $mysql->escape( $name ) . "' , '" . intval( $age ) . "' , NOW() ) ";
	//$mysql->runSql( $sql );
	
	//if( $mysql->errno() != 0 ){
		//die( "Error:" . $mysql->errmsg() );
	//}
	$mysql -> closeDb();

?>










