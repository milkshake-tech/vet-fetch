"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;


var Footer = function () {
	return React.createElement(
		"footer",
		{ className: "footer" },
		React.createElement(
			"div",
			{ style: { textAlign: "center" } },
			React.createElement("img", { src: "/assets/images/vetFetch_white_sm.png" }),
			React.createElement(
				"p",
				null,
				"© vetFetch 2017"
			)
		),
		React.createElement(
			"div",
			null,
			React.createElement(
				"p",
				null,
				"About"
			),
			React.createElement(
				"p",
				null,
				"FAQ"
			),
			React.createElement(
				"p",
				null,
				"Privacy Policy"
			)
		),
		React.createElement(
			"div",
			null,
			React.createElement(
				"p",
				null,
				"Follow Us"
			),
			React.createElement(
				"div",
				null,
				React.createElement(
					"a",
					{ href: "https://www.instagram.com/milkshakenyc/" },
					React.createElement("img", { src: "/assets/images/instagram_white.png", style: { marginRight: 1 + "em" } })
				),
				React.createElement(
					"a",
					{ href: "https://www.facebook.com/" },
					React.createElement("img", { src: "/assets/images/facebook_white.png", style: { marginRight: 1 + "em" } })
				),
				React.createElement(
					"a",
					{ href: "https://twitter.com/milkshakeTech" },
					React.createElement("img", { src: "/assets/images/twitter_white.png" })
				)
			)
		)
	);
};

module.exports = Footer;