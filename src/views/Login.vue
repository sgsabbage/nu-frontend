<template>
  <div class="container-fluid">
    <div class="row justify-content-center align-content-center vh-100">
      <div class="col-4">
        <BaseWindow title="Login" :active="true" :static="true">
          <div v-if="invalid" class="alert alert-danger"
            >Username/password combination incorrect</div
          >
          <form @submit.prevent="doLogin" class="mt-2">
            <div class="form-group">
              <label for="username">Username</label>
              <input
                id="username"
                class="form-control"
                v-model="form.username"
                type="text"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                id="password"
                class="form-control"
                v-model="form.password"
                type="password"
              />
            </div>
            <div class="btn-toolbar mt-2">
              <button class="btn btn-secondary me-2" type="submit">
                Login
              </button>
              <button class="btn btn-link">Forgotten password?</button>
            </div>
          </form>
        </BaseWindow>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseWindow from "../components/BaseWindow.vue";
import axios from "axios";

import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import * as api from "@/api";

export default defineComponent({
  components: { BaseWindow },
  setup() {
    const form = ref({
      username: "",
      password: "",
    });

    const invalid = ref(false);

    const router = useRouter();

    const doLogin = async () => {
      try {
        await api.doLogin(form.value.username, form.value.password);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 403) {
            invalid.value = true;
          }
        }
        return;
      }
      await router.push({ name: "Home" });
    };

    return {
      form,
      doLogin,
      invalid,
    };
  },
});
</script>

<style scoped></style>
