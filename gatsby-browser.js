/* eslint-disable */
import Prism from "prismjs"

/**
 * Trust All Scripts
 *
 * This is a dirty little script for iterating over script tags
 * of your Ghost posts and adding them to the document head.
 *
 * This works for any script that then injects content into the page
 * via ids/classnames etc.
 *
 */
var trustAllScripts = function() {
    var scriptNodes = document.querySelectorAll(".load-external-scripts script")

    for (var i = 0; i < scriptNodes.length; i += 1) {
        var node = scriptNodes[i]
        var s = document.createElement("script")
        s.type = node.type || "text/javascript"

        if (node.attributes.src) {
            s.src = node.attributes.src.value
        } else {
            s.innerHTML = node.innerHTML
        }

        document.getElementsByTagName("head")[0].appendChild(s)
    }
}

var initDisqus = function() {
    if (process.env.GATSBY_DISQUS_SHORTNAME) {
        var d = document,
            s = d.createElement(`script`)
        s.src =
            `https://` +
            process.env.GATSBY_DISQUS_SHORTNAME +
            `.disqus.com/embed.js`
        s.setAttribute(`data-timestamp`, +new Date())
        ;(d.head || d.body).appendChild(s)
    } else {
        // Remove Disqus HTML block.
        var disqusBlock = document.getElementById(`disqus-block`)
        if (disqusBlock !== null) {
            disqusBlock.parentNode.removeChild(disqusBlock)
        }
    }
}

/*
 * NOTICE: ES6 module exports are not officially supported because of NodeJs
 * https://github.com/gatsbyjs/gatsby/pull/9239
 *
 * ES6 modules are here used because PrismJS should not work with CommonJs.
 */

export const onRouteUpdate = () => {
    trustAllScripts()
    Prism.highlightAll()
    initDisqus()
}
