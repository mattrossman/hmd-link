![hmd.link](src/assets/gh-banner.jpg)

*(HMD) = head-mounted display*

Send URLs instantly from a 2D device to an immersive headset on your network, no setup required.

No more typing long URLs with unweildy motion controllers — 8 characters (or 1 bookmark) is all you need! Just type [hmd.link](https://hmd.link) into your VR browser to access your link.


### Basic Usage

- Visit [hmd.link](https://hmd.link) in your headset's web browser (Quest Browser, Wolvic, etc.)
- Visit [hmd.link](https://hmd.link) in your desktop or mobile web browser
- Click "Add link" on the device you want to share from
- Enter a URL and click the send icon

Your link now ready to open on your headset!

The link is deleted after 5 minutes or when you click the trash icon.

Consider bookmarking [hmd.link](https://hmd.link) on your headset's browser for easy access, or simply keep the tab open.

### URL Shortcut

Prefix a URL with `hmd.link/` to automatically share it on load. Use this shortcut to share pages you already have open, or to create prefilled sharing links.

Example: https://hmd.link/https://aframe.io/examples/showcase/helloworld/

### Bookmarklet

Share pages to [hmd.link](https://hmd.link) in a single click!

Create a new bookmark on your desktop or mobile browser with the following code as the URL.

```js
javascript:(function(){window.open('https://hmd.link/'+window.location.href,'_blank')})()
```

### What is this sorcery?

Inspired by the local file sharing app [ShareDrop](https://www.sharedrop.io/), this app uses your public IP address to automatically connect devices on the same network. However, since it's just  text being shared, there's no fancy P2P stuff going on, just a simple database.

### Why use this?

As of July 2020, there is still no easy way to access WebXR content on consumer headsets. Some browsers like Firefox Reality offer a way to sync bookmarks and tabs with their 2D counterpart, but it requires additional setup. Others, like the built-in Oculus Browser don't have such a feature.