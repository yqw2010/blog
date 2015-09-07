<?php
	if( $_GET['demo'] ){
		echo file_get_contents( $_GET['demo'] );
	}
?>
<form method="get" action="#">
	<input type="text" name="demo" />
	<input type="submit" value="submit" />
</form>

<br />welcome~