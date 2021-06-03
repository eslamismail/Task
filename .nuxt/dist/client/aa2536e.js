(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{387:function(t,e,r){"use strict";var n={props:{data:{type:Object,required:!0}},mounted:function(){var t=this.data.last_page;this.pages=t},watch:{data:function(t,e){var r=t.last_page;this.pages=r}},methods:{changePage:function(t){var label=t.label,e=this.data.current_page;if((t="Next &raquo;"==label?e+1:"&laquo; Previous"==label?e-1:parseInt(label))>this.data.last_page||t==this.data.current_page||t<1)return!1;this.$emit("pagination-change-page",t)},resolveClass:function(t){var e=t.active,r=t.url;return e?"page-item active":null==r?"page-item disabled":"page-item"},solveName:function(t){var label=t.label;return"Next &raquo;"==label?"&raquo;":"&laquo; Previous"==label?"&laquo;":label}}},o=r(24),c={components:{paginate:Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",[t.data.last_page>1?r("nav",{staticClass:"m-4 pb-4",attrs:{"aria-label":"..."}},[r("ul",{staticClass:"pagination justify-content-end mb-0"},t._l(t.data.links,(function(e,n){return r("li",{key:n,class:t.resolveClass(e)},[r("a",{staticClass:"page-link",attrs:{href:"#"},domProps:{innerHTML:t._s(t.solveName(e))},on:{click:function(r){return r.preventDefault(),t.changePage(e)}}})])})),0)]):t._e()])])}),[],!1,null,null,null).exports},props:{columns:{type:Array,required:!0},data:{type:Object,required:!0},searchOption:{type:Object,required:!1}},methods:{fetchData:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.$emit("fetchData",t)},editItem:function(t){this.$emit("editItem",t)},deleteItem:function(t){this.$emit("deleteItem",t)}}},l=Object(o.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("vue-good-table",{attrs:{styleClass:"table align-items-center table-bordered",columns:t.columns,"pagination-options":t.searchOption,rows:t.data.data},scopedSlots:t._u([{key:"table-row",fn:function(e){return["action"==e.column.field?r("span",[r("div",{staticClass:"dropdown"},[r("button",{staticClass:"btn btn-primary dropdown-toggle text-capitalize",attrs:{type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[t._v("action")]),t._v(" "),r("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdownMenuButton"}},[r("a",{staticClass:"dropdown-item text-capitalize",attrs:{href:"#"},on:{click:function(r){return r.preventDefault(),t.editItem(e.row.id)}}},[r("i",{staticClass:"fa fa-edit"}),t._v("\n              edit\n            ")]),t._v(" "),r("a",{staticClass:"dropdown-item text-capitalize",attrs:{href:"#"},on:{click:function(r){return r.preventDefault(),t.deleteItem(e.row.id)}}},[r("i",{staticClass:"fa fa-trash"}),t._v("\n              delete\n            ")])])])]):"cart_link"==e.column.field?r("span",[r("nuxt-link",{staticClass:"btn btn-primary text-capitalize",attrs:{to:e.row.cart_link}},[t._v("cart")])],1):t._e()]}}])},[t._v(" "),r("template",{slot:"pagination-bottom"},[r("paginate",{attrs:{data:t.data},on:{"pagination-change-page":t.fetchData}})],1)],2)],1)}),[],!1,null,null,null);e.a=l.exports},409:function(t,e,r){"use strict";r.r(e);var n=r(19),o=(r(48),{layout:"dashboard",middleware:"admin",components:{DataTable:r(387).a},data:function(){return{searchOption:{enabled:!0},columns:[{label:"#",field:"id",type:"number",sortable:!0},{label:"name",field:"name",sortable:!0},{label:"email",field:"email",sortable:!0},{label:"view cart",field:"cart_link",sortable:!0},{label:"created at",field:"created_at",sortable:!0},{label:"Action",field:"action",sortable:!0}],users:{data:[]},page:1}},head:function(){return{title:"Task Users"}},created:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getUsers();case 2:case"end":return e.stop()}}),e)})))()},watch:{users:function(t,e){this.users.data.forEach((function(t,e){var r=t.id;t.created_at=moment(t.created_at).format("llll"),t.cart_link="/admin/users/".concat(r,"/cart")}))}},methods:{getUsers:function(){var t=arguments,e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,o;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=t.length>0&&void 0!==t[0]?t[0]:1,e.page=n,r.prev=2,r.next=5,axios.get("/admin/users?page=".concat(n));case 5:o=r.sent,e.users=o.data.users,r.next=12;break;case 9:r.prev=9,r.t0=r.catch(2),r.t0.response?400==r.t0.response.status?e.$notify({group:"foo",text:r.t0.response.data.message,type:"error"}):401==r.t0.response.status?e.$refresh():e.$notify({group:"foo",text:r.t0.response.statusText,type:"error"}):e.$notify({group:"foo",text:"No internet access",type:"error"});case 12:case"end":return r.stop()}}),r,null,[[2,9]])})))()},deleteCustomer:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!confirm("Ary you sure ?")){r.next=13;break}return r.prev=2,r.next=5,axios.delete("/admin/users/".concat(t));case 5:n=r.sent,e.$notify({group:"foo",text:n.data.message,type:"success"}),e.getUsers(e.page),r.next=13;break;case 10:r.prev=10,r.t0=r.catch(2),r.t0.response?400==r.t0.response.status?e.$notify({group:"foo",text:r.t0.response.data.message,type:"error"}):404==r.t0.response.status?(e.getUsers(e.page),e.$notify({group:"foo",text:r.t0.response.data.message,type:"error"})):401==r.t0.response.status?e.$refresh():e.$notify({group:"foo",text:r.t0.response.statusText,type:"error"}):e.$notify({group:"foo",text:"No internet access",type:"error"});case 13:case"end":return r.stop()}}),r,null,[[2,10]])})))()},editCustomer:function(t){this.$router.push("/admin/users/".concat(t,"/edit"))}}}),c=r(24),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"header bg-primary pb-6"},[r("div",{staticClass:"container-fluid"},[r("div",{staticClass:"header-body"},[r("div",{staticClass:"row align-items-center py-4"},[t._m(0),t._v(" "),r("div",{staticClass:"col-lg-6 col-5 text-right"},[r("nuxt-link",{staticClass:"btn btn-sm btn-neutral text-capitalize",attrs:{to:"/admin/users/create"}},[r("i",{staticClass:"fa fa-plus"}),t._v("\n              create new user\n            ")])],1)])])])]),t._v(" "),r("div",{staticClass:"container-fluid mt--6"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col"},[r("div",{staticClass:"card"},[t._m(1),t._v(" "),r("div",{staticClass:"table-responsive"},[r("data-table",{attrs:{searchOption:t.searchOption,columns:t.columns,data:t.users},on:{fetchData:t.getUsers,deleteItem:t.deleteCustomer,editItem:t.editCustomer}})],1)])])])])])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"col-lg-6 col-7"},[r("h6",{staticClass:"h2 text-white d-inline-block mb-0 text-capitalize"},[t._v("users")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"card-header border-0"},[r("h3",{staticClass:"mb-0 text-capitalize"},[t._v("users")])])}],!1,null,null,null);e.default=component.exports}}]);