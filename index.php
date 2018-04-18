<?php $title = "Sandbox Index"; ?>
<?php $templateType = "demoPage"; ?>
<?php include('src/include/basics/dist/htmlHeader.php'); ?>


	<div class="page">

		<div class="page--main">
			<article class="article-intro">
				<h1>Here be content!</h1>
				<p>And maybe even some Ipsum Dragons, that lorem dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</article>
		</div>

		<aside class="page--marginal">

			<h3>
				Browse Site
				<sup>select a tab</sup>
			</h3>

			<?php
				$demo_tabs = json_decode(file_get_contents('src/patterns/03-organisms/demo-tabs/demo-tabs.json'), true);
				$twig->addGlobal('demo_tabs', $demo_tabs);
			?>
			<?php echo $twig->render('/03-organisms/demo-tabs/demo-tabs.twig'); ?>
			<?php echo $twig->render('/03-organisms/demo-tabs/demo-tabs.twig', [
				'inactive' => true
			] ); ?>
		</aside>

	</div>


<?php include('src/include/basics/dist/htmlFooter.php'); ?>