import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router/router";
import {ErpTool} from "@/erp/erp-tool";

import TerminalAlert from '@/components/terminal-alert';
import StaffCard from '@/components/staff-card';
import mitt from 'mitt';

let app = createApp(App);
app.use(router);

let emitter = mitt();
app.use(emitter);

app.mount('#app');


app.component('terminal-alert', TerminalAlert);
app.component('staff-card', StaffCard);

app.config.globalProperties.$erp = new ErpTool(emitter);
