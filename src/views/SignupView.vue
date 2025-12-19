<template>
  <v-container class="pa-0 fill-height" fluid>
    <v-row class="fill-height" no-gutters>
      <v-col class="d-flex flex-column align-end justify-center" cols="6">
        <v-card class="mx-auto" flat width="70%">
          <v-card-title class="text-h4 font-weight-bold">
            Create Account
          </v-card-title>
          <div class="text-subtitle-1 black--text ml-4 mb-5">
            Fill the form below to create an account
          </div>

          <v-form ref="signupForm" @submit.prevent="submitSignup">
            <v-container>
              <!-- Name Field -->
              <v-text-field
                color="indigo-accent-2"
                density="compact"
                :placeholder="isFocused ? '' : 'Name*'"
                variant="outlined"
                v-model="form.name"
                :rules="[rules.required]"
                @focus="isFocused = true"
                @blur="isFocused = false"
              >
                <template #label>
                  <span class="custom-label">Name*</span>
                </template>
              </v-text-field>
              <!-- Email Field -->
              <v-text-field
                color="indigo-accent-2"
                density="compact"
                :placeholder="isFocused ? '' : 'Email Address*'"
                variant="outlined"
                v-model="form.email"
                :rules="[rules.required, rules.email]"
                @focus="isFocused = true"
                @blur="isFocused = false"
              >
                <template #label>
                  <span class="custom-label">Email Address*</span>
                </template>
              </v-text-field>
              <!-- Password Field -->
              <v-text-field
                color="indigo-accent-2"
                density="compact"
                :placeholder="isFocused ? '' : 'Password*'"
                variant="outlined"
                v-model="form.password"
                :rules="[rules.required]"
                @focus="isFocused = true"
                @blur="isFocused = false"
              >
                <template #label>
                  <span class="custom-label">Password*</span>
                </template>
              </v-text-field>
              <v-container class="d-flex justify-center">
                <div class="w-65">
                  <v-row dense class="">
                    <v-col cols="12">
                      <v-btn
                        size="large"
                        class="text-h6 text-capitalize font-weight-bold py-6"
                        color="indigo-accent-1"
                        width="65"
                        type="submit"
                        block
                        flat
                        >Create Account</v-btn
                      >
                    </v-col>
                    <v-col cols="12">
                      <div class="d-flex justify-center text-subtitle-1">
                        <span>Already have an account?</span>
                        <router-link
                          :to="{ name: 'Login' }"
                          class="text-indigo-accent-2 ml-1 cursor-pointer text-decoration-none font-weight-bold"
                        >
                          Login
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
  name: "SignupView",
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail must be valid";
        },
      },
      form: {
        name: "",
        email: "",
        password: "",
      },
      isLoading: false,
      isFocused: false,
    };
  },
  methods: {
    async submitSignup() {
      console.log(this.form);
      const isValid = await this.$refs.signupForm.validate();
      console.log("Form valid?", isValid);
      if (!isValid) return;

      this.isLoading = true;
      try {
        let response = await axios.post(
          "http://127.0.0.1:8080/api/signup",
          this.form
        );
        if (response.status === 201) {
          console.log("Response:", response.data);
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
</style>
