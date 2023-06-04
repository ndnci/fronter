== Global informations ==

More configurations are in fronter.js.

All custom codes/files inside of "assets" will be compiled in "build" path with parent directory name. For example
"assets/js/myfile.js" will be "build/js/myfile.js".

All external packages (3rd party packages) must be inside of "vendor" path. You need to create the filename in "vendor" which will be compiled into "build" path and inside of this file you need to call the main file of the package ex: "require("mentorjs.js")". If you need to include their CSS too, you can do something like "require('mentorjs/dist/mentorjs.css')" inside of your package JS file and the CSS will be implemented into compiled JS file directly.

Images in "assets/img" will be minified during compilation.

== Installation / Working ==

Install all 3rd party packages : "npm install" (or if not works "npm i --ignore-script")

If needed to update : "npm update" (check after if everything works)

Compile everything inside of the build path : "gulp"

Watching "assets" file changes for css, js etc: "gulp watch" (dont forget to do "gulp" again to compile vendors too)

If you need to export some files to the "build" path during compilation, for example export languages files from external package, you can look up in the "fronter.js" => "gulpProcess" to replicate the code.
