<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="user.email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="user.password" required>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:3000/login', this.user);
                alert(response.data);
                // Handle your login logic here (e.g., redirect, store token, etc.)
            } catch (error) {
                alert(error.response.data);
            }
        }
    }
};
</script>
  