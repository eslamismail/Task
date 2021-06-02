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
      </template>
      <template slot="pagination-bottom">
        <pagination
          class="m-4 pb-4 justify-content-end"
          :data="data"
          @pagination-change-page="fetchData"
        ></pagination>
      </template>
    </vue-good-table>
  </div>
</template>
<script>
export default {
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
      // console.log("object");
      this.$emit("editItem", id);
    },
    deleteItem(id) {
      this.$emit("deleteItem", id);
    },
  },
};
</script>
