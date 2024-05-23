import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';
import UserDashboard from '@/components/UserDashboard.vue'; 
import CreateContractForm from '@/components/CreateContractForm.vue'; 
import ContractView from '@/components/ContractView.vue';
import IndexPage from '@/components/IndexPage.vue';
const routes = [
  {
    path: '/',
    name: 'IndexPage',
    component: IndexPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterForm
  },
  {
    path: '/dashboard',
    name: 'UserDashboard', 
    component: UserDashboard,
  },
  {
    path: '/create-contract',
    name: 'create-contract',
    component: CreateContractForm
  },
  {
    path: '/edit-contract/:contractId',
    name: 'edit-contract',
    component: CreateContractForm,
    props: route => ({ contractId: Number(route.params.contractId) })
  },
  {
    path: '/contract/:id',
    name: 'ContractView',
    component: ContractView,
    props: route => ({ id: Number(route.params.id) })
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
export default router;