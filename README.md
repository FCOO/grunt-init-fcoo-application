[grunt-init]: http://gruntjs.com/project-scaffolding
# gruntfile.js

> Version 1.0.3

The gruntfile.js and packages.json for the FCOO [grunt-init][] templates (`grunt-init-fcoo-[NAME]`)

## Including in a grunt-init-template
To include `gruntfile.js` and `package.json` in a new [grunt-init][] template, you must add this repository as a [Git Submodule](https://chrisjean.com/git-submodules-adding-using-removing-and-updating) to the template-repository and include some code in the `template.js` used when [grunt-init][] creating a new repository based on the template

	>git submodule add https://github.com/FCOO/gruntfile.js.git gruntfile


## template.js
In `template.js` (the code building the new repository) include the following code in the end of the file just before `done();`

		//Copy gruntfile.js and package.json from gruntfile/ to root
		var src_path = init.srcpath( '/../gruntfile/' );
		init.copyAndProcess({
		  "package.json": src_path + "package.json", 
		  "gruntfile.js": src_path + "gruntfile.js" 
		}, props );

