const colorArray = [
	"aliceblue",
	"antiquewhite",
	"aqua",
	"aquamarine",
	"azure",
	"beige",
	"bisque",
	"blanchedalmond",
	"blue",
	"blueviolet",
	"brown",
	"burlywood",
	"cadetblue",
	"chartreuse",
	"chocolate",
	"coral",
	"cornflowerblue",
	"cornsilk",
	"crimson",
	"cyan",
	"darkblue",
	"darkcyan",
	"darkgoldenrod",
	"darkgray",
	"darkgreen",
	"darkgrey",
	"darkkhaki",
	"darkmagenta",
	"darkolivegreen",
	"darkorange",
	"darkorchid",
	"darkred",
	"darksalmon",
	"darkseagreen",
	"darkslateblue",
	"darkslategray",
	"darkslategrey",
	"darkturquoise",
	"darkviolet",
	"deeppink",
	"deepskyblue",
	"dimgray",
	"dimgrey",
	"dodgerblue",
	"firebrick",
	"floralwhite",
	"forestgreen",
	"fuchsia",
	"gainsboro",
	"ghostwhite",
	"gold",
	"goldenrod",
	"gray",
	"green",
	"greenyellow",
	"grey",
	"honeydew",
	"hotpink",
	"indianred",
	"indigo",
	"ivory",
	"khaki",
	"lavender",
	"lavenderblush",
	"lawngreen",
	"lemonchiffon",
	"lightblue",
	"lightcoral",
	"lightcyan",
	"lightgoldenrodyellow",
	"lightgray",
	"lightgreen",
	"lightgrey",
	"lightpink",
	"lightsalmon",
	"lightseagreen",
	"lightskyblue",
	"lightslategray",
	"lightslategrey",
	"lightsteelblue",
	"lightyellow",
	"lime",
	"limegreen",
	"linen",
	"magenta",
	"maroon",
	"mediumaquamarine",
	"mediumblue",
	"mediumorchid",
	"mediumpurple",
	"mediumseagreen",
	"mediumslateblue",
	"mediumspringgreen",
	"mediumturquoise",
	"mediumvioletred",
	"midnightblue",
	"mintcream",
	"mistyrose",
	"moccasin",
	"navajowhite",
	"navy",
	"oldlace",
	"olive",
	"olivedrab",
	"orange",
	"orangered",
	"orchid",
	"palegoldenrod",
	"palegreen",
	"paleturquoise",
	"palevioletred",
	"papayawhip",
	"peachpuff",
	"peru",
	"pink",
	"plum",
	"powderblue",
	"purple",
	"red",
	"rosybrown",
	"royalblue",
	"saddlebrown",
	"salmon",
	"sandybrown",
	"seagreen",
	"seashell",
	"sienna",
	"silver",
	"skyblue",
	"slateblue",
	"slategray",
	"slategrey",
	"snow",
	"springgreen",
	"steelblue",
	"tan",
	"teal",
	"thistle",
	"tomato",
	"turquoise",
	"violet",
	"wheat",
	"whitesmoke",
	"yellow",
	"yellowgreen",
];
/**
 * this generator function will accept optional key, and will return list of color filled as the key object upon call
 * @param key
 */
export function* colorFiller(key?: string[]) {
	const startIndex = Math.floor(Math.random() * colorArray.length);
	let index = startIndex;
	while (true) {
		const color = colorArray[index % (colorArray.length - 1)];
		index++;
		if (key) {
			yield key.reduce((accum, curr) => {
				accum[curr] = color;
				return accum;
			}, {} as Record<string, string>);
		} else {
			yield color;
		}
	}
}
