Wiktionary
==========

Written at Mozfest 2012 Games without Graphics session, a simple LAN game of guessing Wikipedia articles (to narrow the choice down!) obliquely only using Internet links while others scramble to foil you!

Paste links into the input box and they show up on everyone connected's machine while pulling down the image to show as well. Be sure to try it with more than a few people ;)

Maybe you can try other modes, how long can someone keep the channel on a particular theme?

- Runs on Node.js and in any modern browser.

Caveats
-------

- Received no security checks whatsoever, so running this on an Internet server with no scrutiny would be quite dumb.
- No protection against people gaming the system, a lot of checks are client-side JS. You know everyone in the room right?

Possible Improvements
---------------------

- When WebRTC standards make it a bit more mainstream it could be worth trying to remove the websockets bit and doing something over LAN, so the server could be chopped out.
- Integrating a image search into the left pane so that clicking would automatically paste into the chat.