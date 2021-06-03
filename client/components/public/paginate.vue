<template>
  <div>
    <div>
      <nav class="m-4 pb-4" v-if="data.last_page > 1" aria-label="...">
        <ul class="pagination justify-content-end mb-0">
          <!-- <li
            @click.prevent="changePage(data.current_page - 1)"
            :class="`page-item ${data.prev_page_url == null ? 'disabled' : ''}`"
          >
            <a class="page-link" href="#" tabindex="-1">
              <i class="fas fa-angle-left"></i>
              <span class="sr-only">Previous</span>
            </a>
          </li>-->
          <li :class="resolveClass(item)" v-for="(item, index) in data.links" :key="index">
            <a
              class="page-link"
              @click.prevent="changePage(item)"
              href="#"
              v-html="solveName(item)"
            ></a>
          </li>
          <!-- <li :class="`page-item ${data.next_page_url == null ? 'disabled' : ''}`">
            <a @click.prevent="changePage(data.current_page + 1)" class="page-link" href="#">
              <i class="fas fa-angle-right"></i>
              <span class="sr-only">Next</span>
            </a>
          </li>-->
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
  data() {
    return {
      pages: [],
    };
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
      let { url } = page;

      page = url.split("page=")[1];

      if (!page) {
        return false;
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
