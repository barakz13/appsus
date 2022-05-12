import homePage from './views/home-page.cmp.js'
import aboutPage, { aboutCreators, aboutAppsus } from './views/about-page.cmp.js'
import keepApp from './views/keep-app.cmp.js'
import mailApp from './apps/mail/views/mail-app.cmp.js'
import mailDetails from './apps/mail/views/mail-details.cmp.js'
import bookApp from './views/book-app.cmp.js'
import mailCompose from './apps/mail/views/mail-compose.cmp.js'
import noteCompose from './apps/keep/views/note-compose.cmp.js'
//edited!!!!
const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage,
        children: [
            {
                path: 'creators',
                component: aboutCreators,
            },
            {
                path: 'appsus',
                component: aboutAppsus,
            }
        ]
    },
    {
        path: '/keep',
        component: keepApp
    },
    {
        path: '/keep/compose/:note',
        component: noteCompose,
    },
    {
        path: '/mail',
        component: mailApp,
    },
    {
        path: '/mail/:mailId',
        component: mailDetails
    },
    {
        path: '/mail/compose',
        component: mailCompose
    },
    {
        path: '/mail/compose/:note',
        component: mailCompose
    },
    {
        path: '/book',
        component: bookApp
    },
];

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
});