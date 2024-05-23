<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <div class="card">
                    <div class="card-body">
                        <h1 class="card-title text-center">Register</h1>
                        <form @submit.prevent="register">
                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input type="text" class="form-control" id="username" v-model="user.username" required>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" v-model="user.email" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" v-model="user.password" required>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Register</button>
                            <p class="mt-3 text-center">Already have an account? <router-link
                                    to="/login">Login</router-link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: {
                username: '',
                email: '',
                password: ''
            }
        };
    },
    methods: {
        async register() {
            try {
                await axios.post('http://localhost:3000/register', this.user);
                this.$router.push('/login');
            } catch (error) {
                alert(error.response.data);
            }
        }
    }
};
</script>