<?php
/**
 * RennClientBase test case.
 */

 $setting = Array(
	"wq" => "248779510",
	"lg" => "339612683",
	"xp" => "240826670",
	"xb" => "432432772"
 );

class Resolve {

	/**
	* @param {Number} userId
	* @return {Array} 
	*/
	public function getUserRes($userId) {
		global $rennClient;

		if(empty($userId)) {
			die('$userId is null');
		}
		// 获得用户接口
		$userService = $rennClient->getUserService ();
		// 获得当前登录用户
		$user = $userService->getUser($userId);

		$avatar = $user['avatar'][2]['url'];
		$name = $user["name"];
		foreach($user["education"] as $key=>$value){
		    if($value["educationBackground"] == "COLLEGE") {
		        $school = $user["education"][$key]["name"] . " " . $user["education"][$key]["department"];
		        break;
		    }
		}
		$job = $user["work"][count($user["work"]) - 1]["name"];

		return Array(
			"id" => $userId,
			"avatar" => $avatar,
			"name" => $name,
			"school" => $school,
			"job" => $job
		);
	}

	public function defaultList(){
		global $setting;
		$arr = Array();

		foreach($setting as $key => $value){
			$arr[] = $this->getUserRes($value);
		}

		return $arr;
	}
}



