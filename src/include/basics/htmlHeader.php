<?php require_once('src/include/basics/twig.php'); ?><!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if IE 9 ]><html class="ie ie9" lang="en"> <![endif]-->
<!--[if (gte IE 10)|!(IE)]><!-->
<html lang="de">
<!--<![endif]-->
<head>

	<!-- Basic Page Needs ================================================== -->
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
	<meta name="description" content="">
	<meta name="author" content="">

	<title><?php echo $title ?></title>

	<link rel="icon" type="image/vnd.microsoft.icon" href="../../img/layout/favicon.ico"/>
	<link rel="icon" href="../../img/layout/favicon-32.ico" sizes="32x32" type="image/x-icon" />
	<link rel="shortcut icon" type="image/x-icon" href="../../img/layout/favicon.ico" />

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->

	<!--(if target prod)><!-->
	<link type="text/css" rel="stylesheet" href="../../dist_css/main.min.css">
	<!--<!(endif)-->
	<!--(if target dev)><!-->
	<?php include('src/include/basics/css.includes.php'); ?>
	<!--<!(endif)-->

</head>
<body class="<?php echo $templateType ?>">
