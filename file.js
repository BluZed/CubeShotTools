// ==UserScript==
// @name         CubeShotTools
// @namespace    https://cubeshot.io/
// @version      0.1
// @description  Extra tools for cubeshot.io
// @author       BluZed#9946
// @match        https://cubeshot.io*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cubeshot.io
// ==/UserScript==
window.CubeTools = {
	version: '0.0.1',
	log: (e, c) => {
		console.log(`%cCubeShotTools %c${e}`, 'color: #e4ff00;font-size:1rem', `color: ${c};font-size:1rem`)
	},
	uploadStyles: (e) => {
		document.head.insertAdjacentHTML('afterbegin', "<style>"+e+"</style>")
	},
	set: (key, value) => {
		window.localStorage.setItem(key, value)
	},
	get: (key) => {
		return window.localStorage.getItem(key)
	},
	statsInMenu: () => {
		CubeTools.log('Menu Stats', 'cyan')

		window.CubeTools.uploadStyles(`
            .client-menu {
                color: #a5ff9f!important;
                font-size: 1.1rem!important;
                text-decoration: none!important;
                background: #00000096;
                text-align: center;
            }
            .fps-display-client {
                margin-top: 1rem;
                border-radius: 1rem 1rem 0 0;
            }
            .ping-display-client {
                border-radius: 0 0 1rem 1rem;
            }
        `)

		const fpsDisplay = document.createElement('a')
		fpsDisplay.setAttribute('class', 'svelte-rku8gy client-menu fps-display-client')
		document.querySelector('.topLeft').appendChild(fpsDisplay)

		const pingDisplay = document.createElement('a')
		pingDisplay.setAttribute('class', 'svelte-rku8gy client-menu ping-display-client')
		document.querySelector('.topLeft').appendChild(pingDisplay)

		const stats = document.querySelectorAll('stat-item')
		const fps = stats[0].querySelector('span')
		const ping = stats[1].querySelector('span')
		setInterval(() => {
			fpsDisplay.innerHTML = fps.innerHTML + " FPS"
			pingDisplay.innerHTML = ping.innerHTML + " PING"
		}, 1000)
	},
	menuTimer: () => {
		CubeTools.log('Menu Timer', 'cyan')

		window.CubeTools.uploadStyles(`
            .client-menuTimer {
                position: absolute;
                margin: auto;
                font-size: 1.3rem;
                color: #d5d5d5;
                font-family: fantasy;
                transform: translateY(2.5rem);
            }
        `)
		const timer = document.createElement('div')
		timer.setAttribute('class', 'client-menuTimer')
		document.querySelector('menu-interface').prepend(timer)
		setInterval(() => {
			timer.innerHTML = document.querySelector('game-time').querySelector('span').innerHTML
		}, 1000)
	},
	linkBtns: () => {
		CubeTools.log('Invite & Join Btns', 'cyan')

		const html = `
            <side-item class="svelte-15uerad client-invite"><span class="text svelte-15uerad">Invite</span></side-item>
            <side-item class="svelte-15uerad client-join"><span class="text svelte-15uerad">Join</span></side-item>
        `
		document.querySelector('menu-options').insertAdjacentHTML('beforeend', html)
		const inviteBtn = document.querySelector('.client-invite')
		const joinBtn = document.querySelector('.client-join')

		inviteBtn.onclick = () => {
			navigator.clipboard.writeText(window.location.href)
			window.alert("Link copied on clipboard!")
		}
		joinBtn.onclick = () => {
			const input = window.prompt('Enter Link here')
			if (input.startsWith('https://cubeshot.io/#')) {
				window.location.href = input
			}
		}
	},
	setupCrosshair: (url, width) => {
        CubeTools.log('Custom Crosshair', 'cyan')

		window.CubeTools.uploadStyles(`
            .custom-crosshair-client {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
            }
        `)
		const crossHair = document.createElement('img')
		crossHair.setAttribute('class', 'custom-crosshair-client')
		crossHair.style.width = width + "rem"
		crossHair.src = url
		document.querySelector('game-interface').insertAdjacentElement('afterbegin', crossHair)
		/*
		eg: https://steamuserimages-a.akamaihd.net/ugc/1009312513243995585/3420F7DA31E44C3DC1A4347BDFF66E4F04416095/
		*/
	}
}


CubeTools.log('== Setting Up ==', 'lime')
CubeTools.statsInMenu()
CubeTools.menuTimer()
CubeTools.setupCrosshair('https://steamuserimages-a.akamaihd.net/ugc/1009312513243995585/3420F7DA31E44C3DC1A4347BDFF66E4F04416095/', 2)
CubeTools.linkBtns()
CubeTools.log('===== Done =====', 'lime')


// Updating Part

fetch('https://raw.githubusercontent.com/BluZed/CubeShotTools/main/version').then(res=>res.text()).then((version)=>{
    if(parseInt(version) != parseInt(CubeTools.version)){
        if(window.confirm('New Version of CubeShotTools Availaible! - v'+version + "Press OK to go to repository")){
            window.location.href = ('https://github.com/BluZed/CubeShotTools')
        }
    }
})
