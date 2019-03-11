# Busyness

This is a loaders library for Angular 6+, it's based con loaders.css, so, you'll dispose of many beautiful loaders out of the box; however, busyness give the chance to make your very own custom component to be shown when the web app it's "busy".

[See Busyness In Action!](https://busyness-69.firebaseapp.com/)

### Why Busyness?

Busyness is a fully automated solution, you don't have to manage any services or directives to block the screen, just leave to busyness the work!

### What's the magic?

Behind the scenes busyness is using HttpInterceptors, it captures the http-requests and manage them to block the screen during the call is being resolved; no matter how many requests you are making, busyness will block the screen until every request has been resolved, without glitching, of course :wink:

### Getting Started

First you should to install busyness and loaders.css libraries with npm/yarn, that's your choice:

```bash
npm install --save busyness loaders.css
```

Once it's installed, it's time to implement busyness' module on your app.module.ts using the ``forRoot``:

```ts
import { NgModule } from '@angular/core';
import { BusynessModule, LoaderType } from 'busyness';

@NgModule({
	imports: [
		...
		BusynessModule.forRoot({
			loaderType: LoaderType.BALL_SCALE_MULTIPLE
		}),
		...
	]
})
export class AppModule {
}
```

The option ``loaderType`` lets you choose a loader from loaders.css, each one of the loaders has a name, just look for the best suited for you and the put it on ``loaderType``.

After the module implementation you have to use the busyness` component in the app.component.html, putting it on the top of the file:

```html
<bs-busyness></bs-busyness>

<!--> All your code after that <!-->
```

Finally, you ought to make some additions on your styles.scss (if you aren't using sass in your project, you could import it in the angular.json file).

As the first step, we need to import the loaders.css style sheet in the top of the file:

```sass
@import "~loaders.css/loaders.min.css";
```

Next, just style the appearance of the busyness component:

```sass
// BUSYNESS
.loader  {
	position:  fixed;
	width:  100%;
	height:  100%;
	top:  0;
	background-color:  rgba(255,  255,  255,  .8);
	z-index:  999999;

	.loader-inner  {
		margin-top:  50vh;
		margin-left:  calc(50vw  -  50px);

		div {
			background-color:  #337ab7;
		}
	}

	.ball-scale-multiple  {
		div {
			width:  100px;
			height:  100px;
		}
	}
}
```

The last styles were made to show busyness component on the top of the entire web-app and styling the ``ball-scale-multiple`` loader specifically; if you have chosen other loader, you should style it properly as you like.