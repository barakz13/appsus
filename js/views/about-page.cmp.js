export default {
    template: `
        <section class="about-page app-main">
            <h3 class="about-page-title">About Us</h3>
            <nav class="about-page-nav">
                <router-link class="about-page-link about-page-link-creators" to="/about/creators">Barak</router-link>
                <router-link class="about-page-link about-page-link-appsus" to="/about/appsus">Golan</router-link>
            </nav>
            <router-view class="about-page-content"></router-view>
        </section>
    `,
}

export const aboutCreators = {
    template: `
    <div class="about-page-body">
    <p>
                            Barak: Hey! My name is Barak Levav, i am 29 years old software developoer from Haifa, Israel.
                            This is a co-op project made by Golan and myself. we created it as part of our studies
                            at Coding Academy. We are very proud of the output and we hope you enjoy aswell!
    </p>
    <img class="about-page-image" src="https://ca.slack-edge.com/T02L3AYJGN4-U02K73CMTJB-562f4690783c-512">
    </div>
    `
}

export const aboutAppsus = {
    template: `
    <div class="about-page-body">
    <p>
                            Golan: Hey! My name is Golan Itzhak, i am 34 years old software developoer from Petah Tikva, Israel.
                            This is a co-op project made by Barak and myself. we created it as part of our studies
                            at Coding Academy. We are very proud of the output and we hope you enjoy aswell!
    </p>
    <img class="about-page-image" src="https://ca.slack-edge.com/T02L3AYJGN4-U02SF99JH8R-5bcef84c246b-512">
    </div>
    `
}