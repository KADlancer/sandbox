<?php $title = "Sandbox Index"; ?>
<?php $templateType = "demoPage"; ?>
<?php include('src/include/basics/dist/htmlHeader.php'); ?>

	<h1>Hello World!</h1>

<?php echo $twig->render('/00-base/demo.twig'); ?>

<?php include('src/include/basics/dist/htmlFooter.php'); ?>