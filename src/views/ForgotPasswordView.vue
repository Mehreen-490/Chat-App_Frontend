<template>
  <v-container class="pa-0 fill-height" fluid>
    <v-row class="fill-height" no-gutters>
      <v-col class="d-flex flex-column align-center justify-center" cols="6">
        <v-card class="mx-auto" flat width="65%">
          <v-card-title class="text-h4 font-weight-bold">
            Reset Password
          </v-card-title>
          <div class="subtitle-text text-subtitle-1 ml-4 mb-5">
            Enter the email associated with your account and we'll send an email
            with instructions to reset your password
          </div>

          <v-form
            ref="forgotPasswordForm"
            @submit.prevent="submitForgotPassword"
          >
            <v-container>
              <v-text-field
                color="indigo-accent-2"
                density="compact"
                :placeholder="isFocused ? '' : 'Email*'"
                v-model="form.email"
                :rules="[rules.required, rules.email]"
                variant="outlined"
                @focus="isFocused = true"
                @blur="isFocused = false"
              >
                <template #label>
                  <span class="custom-label"> Email*</span>
                </template>
              </v-text-field>
              <v-container class="d-flex justify-center my-4">
                <v-row dense>
                  <v-col cols="12" class="d-flex justify-center">
                    <v-btn
                      size="x-large"
                      class="text-h6 text-capitalize font-weight-bold pa-2"
                      color="indigo-accent-2"
                      width="350"
                      type="submit"
                      flat
                      >Send Instructions</v-btn
                    >
                  </v-col>
                  <v-col cols="12">
                    <div class="d-flex justify-center text-subtitle-1">
                      <router-link
                        :to="{ name: 'Login' }"
                        class="text-indigo-accent-2 ml-1 cursor-pointer text-decoration-none font-weight-bold"
                      >
                        Back to Login
                      </router-link>
                    </div>
                  </v-col>
                </v-row>
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
  name: "ForgotPasswordView",
  data() {
    return {
      form: {
        email: "",
      },
      isFocused: false,
      isLoading: false,
      rules: {
        required: (value) => !!value || "Required",
        email: (value) => {
          const pattern =
            /^(([^<>()[\],;:\s@"]+(\.[^<>()[\],;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail must be valid";
        },
      },
    };
  },
  methods: {
    async submitForgotPassword() {
      console.log(this.form);
      const isValid = await this.$refs.forgotPasswordForm.validate();
      if (!isValid) return;

      this.isLoading = true;
      try {
        let response = await axios.post(
          "http://127.0.0.1:8080/api/forgot-password",
          this.form
        );
        if (response.status === 200) {
          console.log(response.data);
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
.subtitle-text {
  color: #9e9e9e;
}
</style>
