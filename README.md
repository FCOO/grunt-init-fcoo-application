[grunt-init]: http://gruntjs.com/project-scaffolding
[fcoo-web-dev]: https://github.com/FCOO/fcoo-web-dev
[grunt]: https://gruntjs.com
[git]: https://git-scm.com
[github]: https://github.com
[grunt_setup.json]: #grunt_setupjson


# gruntfile.js

> The `gruntfile.js` and `packages.json` used to run [grunt][] commands to  validate, check and build web packages and applications 

Used in the development environment described in [fcoo-web-dev][] and normally installed via the FCOO [grunt-init][] templates (`grunt-init-fcoo-[NAME]`)

This document contains of two sections:

1. [Commands and tasks](#commands): List of and specifications for the different commands available
2. [`grunt_setup.json`](#grunt_setupjson): The setup-file for `gruntfile.js`
2. [Including in a new grunt-init-template](#include): Documentation on how to include `Gruntfile.js` and `package.json` in a **new** FCOO [grunt-init][] template

---
<a name="commands"></a>
## Commands and tasks

To execute a command just run

    	grunt {TASK}
Where there are the following task:
- `grunt check` - Check the syntax of all `.js` and `.scss` files in `\src`
- `grunt dev` - Building a development version in `\demo` or `\dev` 
- `grunt prod` - Building a production version in `\dist`
- `grunt github` - Create a complete new release and push it to GitHub

### *Application* or *Package*
The contents of a repository can eighter be a **web application** or a **packages/plugin** and is defined by setting the `isApplication` options in [grunt_setup.json][] determine if it is a *`Application`* or *`Package`*

### `>grunt check`
- Check the syntax of all `.js` files in `\src` using [JSHint](#jshint)
- Check the syntax of all `.scss` in `\src`


### `>grunt dev`
Building a development version in `\demo` or `\dev`

**You only need to run `grunt dev` when you**
- add or delete a source file from `\src`
- install/uninstall a bower-component
- changes `src\_body.html` or `src\_head.html` (for application only)

To test your package/application, just browse
`\demo\index.html` for *Package*
`\dev\index.html` for *Application*

#### Application
- Check syntax of `.js` and `.scss` files in `\src`
- Update all bower components
- Concat all `.js` and `.css` files in bower components into `\demo\bower_components.js` and `\demo\bower_components.css`
- Copy all images and font files used by bower components to `\demo\images` and `\demo\fonts`   
- Copy all files in `\src\_dist_files` `\dev`
- Create `\dev\index.html` from `\src\_index_TEMPLATE-DEV.html`, `\src\_head.html`, and `\src\_body.html`
- Insert<br>`<script src="..src/PATH_AND_FILENAME.js"></script>` and<br>`<link href="..src/PATH_AND_FILENAME.css" rel="stylesheet">`<br>into `dev\index.html`for all js- and css/scss-files in `\src`

#### Package
- Check syntax of `.js` and `.scss` files in `\src`
- Update all bower components
- Concat all `.js` and `.css` files in bower components into `\demo\bower_components.js` and `\demo\bower_components.css`
- Copy all images and font files used by bower components to `\demo\images` and `\demo\fonts`
- Copy all files in `\src\_dist_files` to `\demo`



### `>grunt prod`
Building a production version in `\dist`

#### Application
- Check syntax of `.js` and `.scss` files in `\src`
- Update all bower components   
- Concat and minify all `.js` files in bower components **AND** in `\src` into one file `\dist\[[APPLICATIONNAME]_[TIMESTAMP].js` and `\dist\[[APPLICATIONNAME]_[TIMESTAMP].min.js`      
- Compile all `.scss` files in `\src` and concat and minify them with all the `.css` files in bower components **AND** in `\src` into one file `\dist\[[APPLICATIONNAME]_[TIMESTAMP].css` and `\dist\[[APPLICATIONNAME]_[TIMESTAMP].min.css`
- Create `\dist\index.html` from `\src\_index_TEMPLATE.html`, `\src\_head.html`, and `\src\_body.html`
- Create `\dist\index-dev.html` as `\dist\index-dev.html` but with the non-minified versions of js- and css-files
- Copy all images and font files used by bower components to `\dist\images` and `\dist\fonts`   
- Copy all images and font files in `\src` to `\dist\images` and `\dist\fonts`
- Copy all files in `\src\_dist_files` to `\dist`


##### Example (application='*fcoo-app*')
	dist/
	  images/
	  fonts/
	  index.html
	  index-dev.html
	  fcoo-app_2015-12-24-13_22_50.js
	  fcoo-app_2015-12-24-13_22_50.min.js
	  fcoo-app_2015-12-24-13_22_50.css
	  fcoo-app_2015-12-24-13_22_50.min.css


 
#### Package
- Check syntax of `.js` and `.scss` files in `\src`
- Concat and minify all `.js` files in `\src` into one file `\dist\[PACKAGENAME].js` and `\dist\[PACKAGENAME].min.js`
- Compile, concat and minify all `.scss` files in `\src` into one file `\dist\PACKAGENAME.css` and `\dist\PACKAGENAME.min.css`
- Copy all images and font files in `\src` to `\dist\images` and `\dist\fonts`
- Copy all files in `\src\_dist_files` to `\dist`


##### Example (packages='*fcoo-plugin*')
	dist/
	  images/
	  fonts/
	  fcoo-plugin.js
	  fcoo-plugin.min.js
	  fcoo-plugin.css
	  fcoo-plugin.min.css

### `>grunt github`
Create a complete new release and push it to [GitHub][]

- Prompt for 
	- new version (patch / minor / major)
	- description of the release
	- update branch `gh-pages` (yes/no)
- Run `grunt prod` *(optional)*
- Update `version` in `bower.json` and `package.json`
- Update `\dist\index.html` and `\dist\index-dev.html` with new version (only *Application*)
- Update `\dist\*.js` with new version (only *Package*)
- Add all files in [Git][]. Includes **all** files except those specified in `.gitignore` 
- Commit all files in [Git][]
- Create a new `TAG` with message "*v1.2.3*"
- Merge branch `'master'` into branch `'gh-pages'` *(optional)*
- Push all branches and tags to [GitHub][]

##### Example (application='*fcoo-app*')
	C:\...\fcoo-app>grunt github

	? Build/compile the application? (Y/n) Yes

	? Current version of "fcoo-app" is 1.2.3. Select new version: (Use arrow keys)
	  Patch : 1.2.4 Backwards-compatible bug fixes.
	> Minor : 1.3.0 Add functionality in a backwards-compatible manner.
	  Major : 2.0.0 Incompatible API changes.
	  None  : No new version. Just commit and push.
	
	? Merge "master" branch into "gh-pages" branch (Y/n) Yes

	? Message/description for new version: This is a new version

Will result in a new release in Github:
![](http://i.imgur.com/Eh2TeGC.png) 


### Credential Helper
 On `Windows` you can use a [credential helper](http://windows.microsoft.com/en-us/windows7/manage-stored-passwords-certificates-and-other-credentials) to tell [Git][] to remember your GitHub username and password every time it talks to GitHub. Just run

    git config --global credential.helper wincred

To stop it run

	git config --global --unset credential.helper

<a name="gruntfile_setup.json"></a>

---
## gruntfile_setup.json
Used by `Gruntfile.js` to define the type of application, extra commands etc.

	{	
	  "isApplication"           : false, //true for stand-alone applications. false for packages/plugins
	  "haveJavaScript"          : true,  //true if the packages have js-files
	  "haveStyleSheet"          : false, //true if the packages have css and/or scss-files

	  minimizeBowerComponentsJS	: true,  //Only for application: Minifies the bower components js-file		
	  minimizeBowerComponentsCSS: true,  //Only for application: Minifies the bower components css-file		

	  "beforeProdCmd"           : "",    //Cmd to be run at the start of prod-task. Multi cmd can be seperated by "&"
	  "beforeDevCmd"            : "",    //Cmd to be run at the start of dev-task
	  "afterProdCmd"            : "",    //Cmd to be run at the end of prod-task
	  "afterDevCmd"				: "",    //Cmd to be run at the end of dev-task

	  "exitOnJSHintError"       : true,  //if false any error in JSHint will not exit the task
	  "cleanUp"                 : true,  //In debug: set to false
	  "bowerCheckExistence"     : true,  //true=all bower components must be pressent. false=allows missing files (only in debug)
	  bowerDebugging            : false  //Set to true in debug
	}



---
<a name="include"></a>
## Including in a new grunt-init-template
To include `gruntfile.js` and `package.json` in a new [grunt-init][] template, you must add this repository as a [Git Subtree]() to the template-repository and include some code in the `template.js` used when [grunt-init][] creating a new repository based on the template

### Git Subtree
	git subtree add --prefix gruntfile https://github.com/FCOO/gruntfile.js.git master --squash


### template.js
In `template.js` (the code building the new repository) include the following code in the end of the file just before `done();`

		//Copy gruntfile.js and package.json from gruntfile/ to root
		var src_path = init.srcpath( '/../gruntfile/' );
		init.copyAndProcess({
		  "package.json": src_path + "package.json", 
		  "gruntfile.js": src_path + "gruntfile.js" 
		}, props );



