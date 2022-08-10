---
title: "Plugin Update Checkers"
date: 2022-08-09T22:33:10-04:00
draft: false
layout: post
---
I have a decent chunk of plugins that I created for Minecraft. One feature I really like in them are update checkers. Server admins usually get lazy and don't check themselves, so having the plugin automatically tell them is easier. There's a few ways to achieve this.

<h2 id="subtitle">SpigotMC API</h2>
<p>One of the main methods is to use the SpigotMC's API in order to check the latest version of a resource. This is used by many, and even has a wiki page dedicated to it <a href="https://www.spigotmc.org/wiki/creating-an-update-checker-that-checks-for-updates/">here</a>.</p>

For example, calling the URL <span id="code">https://api.spigotmc.org/legacy/update.php?resource=99606</span> will show the latest version on SpigotMC for my plugin ToolStats.

This method is extremely easy to setup. All you have to do is read the contents of a URL, and see if it matches your current plugin's version. If it doesn't, then the plugin is outdated. This can have some problems. SpigotMC sometimes goes down, it doesn't tell you how many versions behind you are, or how old your version is.

<h2 id="subtitle">GitHub API</h2>
<p>I eventually found out about GitHub's API, specifically it's <a href="https://docs.github.com/en/rest/releases">API for releases</a>. Once I found out about this, I got to work converting my plugins over. I use GitHub releases in order to publish my plugins, so this is perfect.</p>

Because I am reusing code, I eventually figured it would be better to make a library that my plugins can use. Instead of copying a bunch of annoying code, I can make a library to simplify the process. And thus, <a href="https://github.com/hyperdefined/GitHubReleaseAPI">GitHubReleaseAPI</a> was born.

GitHubReleaseAPI is simply a JSON reader that converts all information about releases into <span id="code">GitHubRelease</span> objects. This is how you first access the API.

{{< highlight java>}}
GitHubReleaseAPI api = new GitHubReleaseAPI("ToolStats", "hyperdefined");

// Gets all of the releases on the repo.
api.getAllReleases();

// Gets how many releases behind a certain release is.
// Pass it a GitHubRelease object.
api.getBuildsBehind(release);

// Gets the latest release.
api.getLatestVersion();

// Gets a release by the tag.
// Pass it a string of said tag.
api.getReleaseByTag(tag);
{{< / highlight >}}

For each GitHubRelease object, you can access a lot of information.

{{< highlight java>}}
// Gets the tag.
release.getTagVersion();

// Gets the GitHub release notes.
release.getReleaseNotes();

// Gets when the release was published.
release.getPublishedDate();

// Gets when the released was first created.
release.getCreatedDate();

// Gets the attached files on the release.
// These are direct links to attached files.
release.getReleaseAssets();

// Is the release a draft?
release.isDraft();

// Is the release a pre-release?
release.isPreRelease();

//Gets the "regular" link to the GitHub release page.
release.getRegularLink();
{{< / highlight >}}

This can solve the problem above, I can tell a server owner when a release came out. I can tell them how many versions behind they are, I can even send them the direct download link to the release. I am very happy with how this library turned out, even if it's extremely simple. This library is on Maven Central if you wish to use it!

Both methods work great for their own purposes (yes this was a subtle advertisement for my library).