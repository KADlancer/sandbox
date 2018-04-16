<?php
	define('PATH_LIB_TWIG', 'lib/twig/Twig-1.34.4/lib/Twig/');
	define('PATH_PATTERNS', 'src/patterns');

	require_once(PATH_LIB_TWIG.'Autoloader.php');
	Twig_Autoloader::register();
	$loader = new Twig_Loader_Filesystem(PATH_PATTERNS);
	$twig = new Twig_Environment($loader, array(
		'debug' => true,
	));

	$twig->addExtension(new Twig_Extension_Debug());
