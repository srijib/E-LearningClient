<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
		<div class="container">
			<router-link :to="{ name: user ? 'home' : 'welcome' }" class="navbar-brand">
				<img src="https://res.cloudinary.com/dl9phqhv0/image/upload/c_scale,w_150/v1573175311/Logos/logo-dark_uaqwbf.png" alt="E-Learning" class="m-t-5 img-fluid" />
			</router-link>

			<button :aria-label="$t('toggle_navigation')" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false">
				<fa icon="bars" fixed-width />
			</button>

			<div id="navbarToggler" class="collapse navbar-collapse">
				<ul class="navbar-nav navbar-nav-hover">
					<li class="nav-item dropdown">
						<a href="#" class="nav-link" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<fa icon="th" fixed-width />
							Categories
						</a>
						<div class="dropdown-menu">
							<template v-if="!isLoading">
								<router-link :to="{ name: 'course.category', params: { slug: tab.slug } }" class="dropdown-item" v-for="tab in categories" :key="tab.id">
									<fa :icon="tab.icon" fixed-width class="text-muted" />
									{{tab.name}}
								</router-link>
							</template>
							<template v-else>
								<div class="mx-lg-4">
									<div class="text-center">
										<img src="https://res.cloudinary.com/dl9phqhv0/image/upload/c_scale,h_20/v1574394025/Loader/ajax-loader_sln1xw.gif" alt="">
									</div>
								</div>
							</template>
						</div>
					</li>
					<!-- <li class="nav-item">
						<a class="nav-link" href="#">Link</a>
					</li> -->
				</ul>

				<form class="mx-2 my-auto d-inline w-47" @submit.prevent="submit" @keydown="form.onKeydown($event)">
					<div class="input-group">
						<input aria-describedby="addon-right addon-left" type="text" v-model="form.search_term" name="search" placeholder="Search for courses" class="form-inline form-control rounded-left">
						<div class="input-group-prepend">
							<a type="button" class="input-group-text btn btn-outline-danger">
								<fa icon="search" fixed-width />
							</a>
						</div>
					</div>
				</form>

				<ul class="navbar-nav ml-auto navbar-nav-hover">
					<li class="nav-item border-right" v-if="!user">
						<router-link :to="{ name: 'teach' }" class="nav-link m-t-1">
							Teach in E-Learning
						</router-link>
					</li>
					<template v-if="user">
						<li class="nav-item border-right">
							<router-link v-if="user.role_id != 3 && user.role_id != 1" :to="{ name: 'teach' }" class="nav-link m-t-1">
								Teach in E-Learning
							</router-link>
							<router-link v-if="user.role_id === 3" :to="{ name: 'instructor.courses' }" class="nav-link m-t-1">
								Instructor Panel
							</router-link>
							<a href="#" v-if="user.role_id === 1" class="nav-link m-t-1">
								Admin Panel
							</a>
						</li>
						<li class="nav-item dropdown">
							<router-link :to="{ name: 'student.courses' }" class="nav-link" role="button" >
								My Courses
							</router-link>
						</li>
						<li class="nav-item dropdown">
							<a href="#" class="nav-link" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<!-- <span v-if="carts.length != 0" class="badge bg-danger text-white rounded-circle" style="float: right; margin-top: -10px; margin-left: -10px; z-index: 10001;">{{carts.length}}</span> -->
								<span style="z-index: 100;"><fa icon="shopping-cart" class="h5 mb-0" fixed-width /></span>
							</a>
							<div class="dropdown-menu dropdown-menu-right">
								<template>
									<div>
										<div class="p-3 text-center">
											<h6>Your cart is empty.</h6>
											<h6 class="mt-2 text-small mb-0"><a href="#">Keep Shopping</a></h6>
										</div>
									</div>
								</template>
							</div>
						</li>
						<li class="nav-item dropdown">
							<a href="#" class="nav-link" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<fa icon="bell" class="h5 mb-0" fixed-width />
							</a>
							<div class="dropdown-menu dropdown-menu-right">
								<div class="p-3 text-center">
									<h6 class="mb-0">You don't have any new notifications.</h6>
								</div>
							</div>
						</li>
						<li class="nav-item dropdown">
							<a class="nav-link"
							href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
							>
								<img v-if="user.avatar == 'users/default.png'" :src="user.photo_url" class="rounded-circle profile-photo mr-1" alt="">
								<client-only v-else>
									<cld-image :publicId="`${user.avatar_public_id}.png`" class="mr-1 profile-photo rounded-circle" alt="">
										<cld-transformation height="30" width="30" crop="fill" radius="100" />
									</cld-image>
								</client-only>
							</a>
							<div class="dropdown-menu dropdown-menu-right">
								<div >
									<a href="#" class="dropdown-item mb-2 dropdown-item-2">
										<div class="row">
											<div class="col-lg-2">
												<img v-if="user.avatar == 'users/default.png'" :src="user.photo_url" class="rounded-circle profile-photo-2 mr-1" alt="">
												<client-only v-else>
													<cld-image :publicId="`${user.avatar_public_id}.png`" class="profile-photo-2" alt="">
														<cld-transformation height="46" width="46" crop="fill" radius="100" />
													</cld-image>
												</client-only>
											</div>
											<div class="col-lg-10"> 
												<div class="ml-2 mt-1">
													<h6 class="font-weight-600 mb-0">{{user.name}}</h6>
													<h6 class="text-muted">{{user.email}}</h6>
												</div>
											</div>
										</div>
									</a>
									<router-link :to="{ name: 'settings.account' }" class="dropdown-item dropdown-item-2" v-if="user.role_id === 2">
										Account
									</router-link>
									<router-link :to="{ name: 'instructor.settings.account' }" class="dropdown-item dropdown-item-2" v-if="user.role_id === 3">
										Account
									</router-link>
									<div class="dropdown-divider"></div>
									<a class="dropdown-item pl-3 dropdown-item-2" href="#" @click.prevent="logout">
										{{ $t('logout') }}
									</a>
								</div>
							</div>
						</li>
					</template>
					<template v-else>
						<li class="nav-item">
							<router-link :to="{ name: 'login' }" class="nav-link" active-class="active">
								{{ $t('login') }}
							</router-link>
						</li>
						<li class="nav-item">
							<router-link :to="{ name: 'register' }" class="btn btn-default text-capitalize text-white" active-class="active">
								{{ $t('register') }}
							</router-link>
						</li>
					</template>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
	import { mapGetters } from 'vuex'
	import LocaleDropdown from './LocaleDropdown'
	import axios from 'axios'

	import Form from 'vform'

	export default {

		components: {
			LocaleDropdown
		},

		data: () => ({
			appName: process.env.appName,
			
			categories: [],

			// Get My Courses
			courses: [],

			isLoading: false,

			form: new Form({
				search_term: '',
			})

		}),
		
		computed: {
			...mapGetters({
				user: 'auth/user'
			}),
		},

		created() {
			this.getCategories()
		},

		methods: {
			async submit() {
				let { data } = await this.form.post('/search/userSearches')
				this.$router.push('/search_query?q=' + this.form.search_term)
            },

			async logout () {
				// Log out the user.
				await this.$store.dispatch('auth/logout')
				// Redirect to login.
				this.$router.push({ name: 'logout' })
			},

			getCategories() {
				this.isLoading = true
				axios.get('/getCategories')
				.then((res) => {
					this.isLoading = false
					this.categories = res.data.categories
				})
			},

		}
	}
</script>

<style scoped>
	@media (min-width: 1200px) { 
		.container {
			max-width: 100% !important;
		}
	}

	.has-courses {
		max-height: 341px;
		overflow-y: auto;
		position: relative;
	}

	.profile-photo {
		width: 2rem;
		height: 2rem;
		margin: -.375rem 0;
	}
	.profile-photo-2 {
		width: 46px;
		height: 46px;
	}
	.container {
		width: 100% !important;
	}
	.navbar-brand img {
		height: 35px;
	}
	.form-group {
		margin-bottom: 0.5rem !important;
	}
	.form-control {
		transition: ease-in;
		background: whitesmoke;
	}
	.form-control:active {
		border: 1px solid #8a92a3;
		background: #fff;
	}
	.form-control:focus {
		border: 1px solid #8a92a3;
		background: #fff;
	}
	.navbar-collapse.collapsing, .navbar-collapse.show {
		margin-top: 70px;
	}
	.nav-link {
		font-size: small;
		padding: 12px 15px;
		font-weight: 400;
	}
	.nav-link:hover {
		background: whitesmoke;
	}
	.w-47 {
		width: 45% !important;
	}
	.dropdown-menu {
		width: 300px !important;
	}
	.dropdown-item-2 {
		font-size: 0.888rem !important;
	}
</style>
