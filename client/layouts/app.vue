<template>
  <div>
    <notifications style="margin:10px;" group="foo" />
    <userHeader />
    <nuxt />
  </div>
</template>

<script>
import userHeader from "../components/includes/userHeader";
export default {
  components: { userHeader },
};
</script>
