<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="register">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="user.email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="user.password" required>
            </div>
            <button type="submit">Register</button>
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
        async register() {
            try {
                const response = await axios.post('http://localhost:3000/register', this.user);
                alert(response.data);
                // Handle your registration logic here
            } catch (error) {
                alert(error.response.data);
            }
        }
    }
};
</script>