<template>
    <button v-if="googleAuth" type="button" class="btn btn-google btn-icon rounded" @click="login">
        <span class="btn-inner--icon">
            <fa :icon="['fab', 'google']" fixed-width />
        </span>
        <span class="btn-inner--text">
            Google
        </span>
    </button>
</template>

<script>
	let myBody = null

	export default {
		name: 'LoginWithGoogle',

		computed: {
			googleAuth: () => process.env.googleAuth,
			url: () => `${process.env.apiUrl}/oauth/google`
		},

		mounted () {
			window.addEventListener('message', this.onMessage, false)
			myBody = document.getElementsByTagName('body')[0]
		},

		beforeDestroy () {
			window.removeEventListener('message', this.onMessage)
		},

		methods: {

			async login () {
				const newWindow = openWindow('', this.$t('login'))
				const url = await this.$store.dispatch('auth/fetchOauthUrl', {
					provider: 'google'
				})
				newWindow.location.href = url
			},

			/**
			 * @param {MessageEvent} e
			 */
			onMessage (e) {
				if (!process.env.apiUrl.includes(e.origin)) {
					// throw new Error('Origin not matching')
					return
				}
				
				this.$store.dispatch('auth/saveToken', {
					token: e.data.token
				})

				// this.$router.push({ name: 'welcome' })
				myBody.classList.remove('modal-open')
			}
		},
	}

	/**
	 * @param  {Object} options
	 * @return {Window}
	 */
	function openWindow (url, title, options = {}) {

		if (typeof url === 'object') {
			options = url
			url = ''
		}

		options = { url, title, width: 600, height: 720, ...options }
		const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left
		const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top
		const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width
		const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height
		options.left = ((width / 2) - (options.width / 2)) + dualScreenLeft
		options.top = ((height / 2) - (options.height / 2)) + dualScreenTop

		const optionsStr = Object.keys(options).reduce((acc, key) => {
			acc.push(`${key}=${options[key]}`)
			return acc
		}, []).join(',')

		const newWindow = window.open(url, title, optionsStr)

		if (window.focus) {
			newWindow.focus()
		}

		return newWindow
	}
</script>