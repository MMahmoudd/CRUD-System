<template>
    <div class="login-component">
        <div class="background">
            <img src="../static/images/Web-bg.png" alt="background">
        </div>
        <div class="card">
            <div v-if="loginErrorMessage" class="danger">
            <p><strong>Error! </strong>{{loginErrorMessage}}</p>
        </div>
            <form @submit.prevent="loginSubmit" class="form">
                <div class="imgcontainer">
                    <img src="../static/images/user.png" alt="Avatar" class="avatar">
                </div>

                <div class="form-container">
                    <label>Email</label>
                    <input
                        v-model="form.email"
                        type="email"
                        placeholder="Enter Email"
                        required>
                    <label>Password</label>
                    <input
                        v-model="form.password"
                        type="password"
                        placeholder="Enter Password"
                        required>

                    <button type="submit">Login</button>
                </div>
                </form>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    data() {
    return {
        form: {
            email: "eve.holt@reqres.in",
            password: "cityslicka"
        },
    }
    },
    computed: {
        ...mapState({
        isLoading: state => state.isLoading,
        loginErrorMessage: state => state.loginErrorMessage,
        loginSuccessful: state => state.loggingIn,
      }),
    },
    methods: {
        ...mapActions([
          'doLogin',
        ]),
        loginSubmit () {
          this.$store.dispatch('doLogin',{
            email: this.form.email,
            password: this.form.password,
          })
        },
    }
}
</script>