module.exports = function(grunt) {
	require('jit-grunt')(grunt, {replace: 'grunt-text-replace'});
	/**
   * basic paths
   */
	var dirSrc = 'src',
		dirDist = dirSrc + '/dist',
		dirSrcPatterns = dirSrc + '/patterns',
		dirSrcVendor = dirSrc + '/vendor',

		dirDistJs = dirDist + '/js',
		dirDistCss = dirDist + '/css';

	// sass & css files array
	var cssFiles = [
		'/patterns/00-base/main.scss',
	];

	// Main JS Files
	var jsFilesMain = [
		'/patterns/00-base/responsive.js',

	];
	// gather all scss files for dev and combine them with their destination paths
	var scssCompilePaths = [];
	for (var i = 0; i < cssFiles.length; i++) {
		var file = cssFiles[i],
			extension = file.substr((file.lastIndexOf('.'))),
			fileName = file.substr(0, file.lastIndexOf('.')),
			newElement = {},
			sourceExtension = '';

		if (extension === '.css') {
			sourceExtension = '.css';
		} else if (extension === '.scss') {
			sourceExtension = '.scss';
		}

		var destination = dirDistCss + fileName + '.css',
			source = dirSrc + fileName + sourceExtension;

		newElement[destination] = source;
		scssCompilePaths.push(newElement);
	}

	// cssFilesFullPath - prepend src/css path
	var cssFilesFullPath = cssFiles.slice();
	for (var i = 0; i < cssFilesFullPath.length; i++) {
		cssFilesFullPath[i] = dirSrc + cssFilesFullPath[i];
	}

	// cssIncludes - prepend dist/css path & add css file extension
	var cssIncludes = cssFiles.slice();
	for (var i = 0; i < cssIncludes.length; i++) {
		var file = cssIncludes[i],
			fileName = file.substr(0, file.lastIndexOf('.'));

		cssIncludes[i] = dirSrc + fileName + '.css';
	}


	// jsFilesMainFullPath - prepend src/js path
	var jsFilesMainFullPath = jsFilesMain.slice();
	for (var i = 0; i < jsFilesMainFullPath.length; i++) {
		jsFilesMainFullPath[i] = dirSrc + jsFilesMainFullPath[i];
	}

	// assetAppend
	grunt.registerMultiTask("assetAppend", "Append JS/CSS assets to a file", function() {
		// var paths = grunt.file.expand( this.data.paths ),
		var paths = this.data.paths,
			out = this.data.output,
			contents = "";

		paths.forEach(function(path) {
			if (/\.js$/i.test(path)) {
				contents += '<script src="' + path + '"></script>\n';
			} else if (/\.css$/i.test(path)) {
				contents += '<link rel="stylesheet" type="text/css" href="' + path + '" />\n';
			}
		});

		grunt.file.write(out, contents);
	});

	// grunt config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// assetAppend
		assetAppend: {
      jsMain: {
          paths: jsFilesMainFullPath,
          output: "src/include/basics/js.includes.main.php"
      },
			css: {
				paths: cssIncludes,
				output: "src/include/basics/css.includes.php"
			}
		},

		sass: {
			production: {
				options: {
					sourceMap: false
				},
				files: [
					{
						'src/dist/css/main.concat.css': 'src/patterns/00-base/main.scss'
					}
				]
			},
			development: {
				options: {
					sourceMap: true
				},
				files: [
					{
						'src/dist/css/main.css': 'src/patterns/00-base/main.scss'
					}
				]
			}
		},
		cssmin: {
			options: {
				keepSpecialComments: "*"
			},
			compress: {
				files: [
					{
						'src/dist/css/main.min.css': ['src/dist/css/main.concat.css']
					}
				]
			}
		},
		concat: {
			jsMain: {
				options: {
					separator: ';\r\n'
				},
				src: [jsFilesMainFullPath],
				dest: 'src/dist/js/main.js'
			}
		},
		uglify: {
			options: {
				preserveComments: require('uglify-save-license')
			},
			jsMain: {
				src: ['src/dist/js/main.js'],
				dest: 'src/dist/js/main.min.js'
			}
		},
		watch: {
			sass: {
				files: [
					dirSrcPatterns + '/**/*.scss',
					dirSrcPatterns + '/**/**/*.scss',
					dirSrcVendor + '/**/*.scss',
					dirSrcVendor + '/**/**/*.scss'
				],
				tasks: ['sass:development']
			},
			targethtml: {
				files: [
					'src/include/basics/htmlHeader.php', 'src/include/basics/htmlFooter.php'
				],
				tasks: ['newer:targethtml:dev']
			}
		},
		clean: [
			'src/dist/css/main.concat.css', 'src/dist/js/main.js'
		],
		targethtml: {
			dev: {
				files: {
					'src/include/basics/dist/htmlHeader.php': 'src/include/basics/htmlHeader.php',
					'src/include/basics/dist/htmlFooter.php': 'src/include/basics/htmlFooter.php'
				}
			},
			prod: {
				files: {
					'src/include/basics/dist/htmlHeader.php': 'src/include/basics/htmlHeader.php',
					'src/include/basics/dist/htmlFooter.php': 'src/include/basics/htmlFooter.php'
				}
			}
		},
		browserSync: {
			bsFiles: {
				src: ['src/dist/css/main.css']
			},
			options: {
				watchTask: true,
				proxy: '<%= grunt.file.readJSON("userSettings.json").browserSyncProxy %>'
			}
		},
		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer')({
						browsers: ["> 1%", "last 2 versions"]
					})
				]
			},
			dist: {
				src: 'src/dist/css/main.min.css'
			}
		},

	});

	grunt.registerTask('default', ['sass:development', 'assetAppend',  'targethtml:dev', 'watch']);
	grunt.registerTask('dev',     ['sass:development', 'assetAppend',  'targethtml:dev', 'watch']);
	grunt.registerTask('prod',    ['sass:production',  'cssmin', 'postcss:dist', 'concat', 'uglify', 'clean', 'targethtml:prod']);
};
