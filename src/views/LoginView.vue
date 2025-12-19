<template>
  <v-container class="pa-0 fill-height ma-0" fluid>
    <v-row class="fill-height pa-0 fill-height ma-0" no-gutters>
      <v-col class="d-flex flex-column align-center justify-center" cols="6">
        <v-card class="mx-auto" flat width="70%">
          <v-card-title class="text-h4 font-weight-bold"> Log in </v-card-title>
          <div class="text-subtitle-1 black--text ml-4 mb-5">
            Enter your credentials to proceed
          </div>
          <v-form ref="loginForm" @submit.prevent="submitLogin">
            <v-container>
              <v-text-field
                color="indigo-accent-2"
                density="compact"
                :placeholder="isFocused ? '' : 'Email*'"
                variant="outlined"
                @focus="isFocused = true"
                @blur="isFocused = false"
                v-model="form.email"
                :rules="[rules.required, rules.email]"
              >
                <template #label>
                  <span class="custom-label">Email*</span>
                </template>
              </v-text-field>
              <v-text-field
                color="indigo-accent-2"
                density="compact"
                :placeholder="isFocused ? '' : 'Password*'"
                variant="outlined"
                @focus="isFocused = true"
                @blur="isFocused = false"
                v-model="form.password"
                :rules="[rules.required]"
              >
                <template #label>
                  <span class="custom-label">Password*</span>
                </template>
              </v-text-field>

              <v-row class="align-center justify-space-between pa-0" no-gutters>
                <v-col cols="auto">
                  <v-checkbox
                    class="d-inline-flex"
                    color="indigo-accent-2"
                    density="compact"
                    hide-details
                    label="Remember me"
                  />
                </v-col>
                <v-col cols="auto">
                  <!-- <v-btn
                    :to="{ name: 'Signup' }"
                    class="d-flex justify-end text-indigo-accent-2 ml-1 cursor-pointer text-decoration-none font-weight-bold"
                    variant="text"
                    >Forgot password?</v-btn
                  > -->
                  <router-link
                    :to="{ name: 'ForgotPassword' }"
                    class="fp-link text-indigo-accent-2 ml-1 cursor-pointer font-weight-bold"
                  >
                    Forgot password?
                  </router-link>
                </v-col>
              </v-row>
              <v-container class="d-flex justify-center">
                <div class="w-65">
                  <v-row dense class="">
                    <v-col cols="12">
                      <v-btn
                        size="large"
                        class="text-capitalize"
                        color="indigo-accent-2"
                        block
                        flat
                        type="submit"
                        >Login</v-btn
                      >
                    </v-col>
                    <v-col cols="12">
                      <div class="d-flex justify-center text-subtitle-1">
                        <span>Don't have an account</span>
                        <router-link
                          :to="{ name: 'Signup' }"
                          class="text-indigo-accent-2 ml-1 cursor-pointer text-decoration-none font-weight-bold"
                        >
                          Sign Up?
                        </router-link>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-container>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
      <v-col class="pa-0" cols="6">
        <v-img
          class="w-100 h-100"
          cover
          src="../assets/whistle-login-animation.svg"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginView",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      isLoading: false,
      isFocused: false,
      rules: {
        required: (value) => !!value || "Required",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail must be valid";
        },
      },
    };
  },
  methods: {
    async submitLogin() {
      console.log(this.form);
      const isValid = await this.$refs.loginForm.validate();
      if (!isValid) return;

      this.isLoading = true;
      try {
        let response = await axios.post(
          "http://127.0.0.1:8080/api/login",
          this.form
        );
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          console.log("Response:", response.data);
          // this.$router.push({ name: "Home" });
        }
      } catch (error) {
        console.log(error.response.data.error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.custom-label-focus .v-field__label {
  color: #9e9e9e;
}
.custom-label.v-field--focused .v-field__label {
  color: #536dfe;
}
.fp-link {
  text-decoration: none;
}
.fp-link:hover {
  text-decoration: underline;
}
</style>
