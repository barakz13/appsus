export default {
    template: `
        <header class="app-header">
            <div class="logo">Appsus</div>
            <nav class="main-nav-container">
                <div v-if="menuStatus === 'regular'" class="main-nav" :class="{hamburger: isMenuOn}" >
                    <router-link class="main-nav-btn" to="/" @click="toggleMenu">Home</router-link> 
                    <router-link class="main-nav-btn" to="/book" @click="toggleMenu">Books</router-link> 
                    <router-link class="main-nav-btn" to="/keep" @click="toggleMenu">Keep</router-link> 
                    <router-link class="main-nav-btn" to="/mail" @click="toggleMenu">Mail</router-link> 
                    <router-link class="main-nav-btn" to="/about" @click="toggleMenu">About</router-link>
                </div>
                <button v-else class="menu-btn" @click="toggleMenu">☰</button>
            </nav>
        </header>
    `,
    data() {
        return {
            menuStatus: 'regular',
            isMenuOn: false
        };
    },
    created() {
        this.updateMenu();
        window.onresize = this.updateMenu
    },
    methods: {
        updateMenu() {
            var width = window.innerWidth;
            if (width <= 750) this.menuStatus = 'hamburger';
            else {
                this.menuStatus = 'regular';
                this.isMenuOn = false;
            }
        },
        toggleMenu() {
            if (window.innerWidth > 750) return;
            if (this.menuStatus === 'regular') this.menuStatus = 'hamburger';
            else this.menuStatus = 'regular';
            this.isMenuOn = !this.isMenuOn;
        }
    },
}