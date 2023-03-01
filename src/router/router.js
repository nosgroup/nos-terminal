import {createWebHistory, createRouter} from "vue-router";

import ClockScreen from "@/pages/configured/clock-screen";
import SettingsScreen from "@/pages/configured/settings/settings-screen";

const routes = [
    {
        path: '/',
        name: 'Default',
        component: ClockScreen,
    },
    {
        path: '/settings/:card',
        name: 'Settings',
        component: SettingsScreen,
    },
];
const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!localStorage.getItem("session") === undefined) {
            next({name: 'Login'})
        } else {
            next()
        }
    } else {
        next();
    }
})

export default router;