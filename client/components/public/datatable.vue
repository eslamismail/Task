<template>
  <div>
    <vue-good-table
      styleClass="table align-items-center table-bordered"
      :columns="columns"
      :pagination-options="searchOption"
      :rows="data.data"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'action'">
          <div class="dropdown">
            <button
              class="btn btn-primary dropdown-toggle text-capitalize"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >action</button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a
                class="dropdown-item text-capitalize"
                href="#"
                @click.prevent="editItem(props.row.id)"
              >
                <i class="fa fa-edit"></i>
                edit
              </a>
              <a
                class="dropdown-item text-capitalize"
                @click.prevent="deleteItem(props.row.id)"
                href="#"
              >
                <i class="fa fa-trash"></i>
                delete
              </a>
            </div>
          </div>
        </span>
        <span v-else-if="props.column.field == 'cart_link'">
          <nuxt-link :to="props.row.cart_link" class="btn btn-primary text-capitalize">cart</nuxt-link>
        </span>
      </template>
      <template slot="pagination-bottom">
        <paginate @pagination-change-page="fetchData" :data="data" />
      </template>
    </vue-good-table>
  </div>
</template>
<script>
import paginate from "./paginate";
export default {
  components: { paginate },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    searchOption: {
      type: Object,
      required: false,
    },
  },

  methods: {
    fetchData(page = 1) {
      this.$emit("fetchData", page);
    },
    editItem(id) {
      this.$emit("editItem", id);
    },
    deleteItem(id) {
      this.$emit("deleteItem", id);
    },
  },
};
</script>
