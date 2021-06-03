<template>
  <div>
    <div>
      <nav class="m-4 pb-4" v-if="data.last_page > 1" aria-label="...">
        <ul class="pagination justify-content-end mb-0">
          <li :class="resolveClass(item)" v-for="(item, index) in data.links" :key="index">
            <a
              class="page-link"
              @click.prevent="changePage(item)"
              href="#"
              v-html="solveName(item)"
            ></a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    const { last_page } = this.data;
    this.pages = last_page;
  },
  watch: {
    data(val, old) {
      const { last_page } = val;
      this.pages = last_page;
    },
  },
  methods: {
    changePage(page) {
      let { label } = page;
      const { current_page } = this.data;
      if (label == "Next &raquo;") {
        page = current_page + 1;
      } else if (label == "&laquo; Previous") {
        page = current_page - 1;
      } else {
        page = parseInt(label);
      }
      if (
        page > this.data.last_page ||
        page == this.data.current_page ||
        page < 1
      ) {
        return false;
      }

      this.$emit("pagination-change-page", page);
    },
    resolveClass({ active, url }) {
      if (active) {
        return "page-item active";
      } else if (url == null) {
        return "page-item disabled";
      } else {
        return "page-item";
      }
    },
    solveName({ label }) {
      if (label == "Next &raquo;") {
        return "&raquo;";
      } else if (label == "&laquo; Previous") {
        return "&laquo;";
      } else {
        return label;
      }
    },
  },
};
</script>
