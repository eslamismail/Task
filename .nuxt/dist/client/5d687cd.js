(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{412:function(t,e,r){"use strict";r.r(e);var n=r(18),o=(r(41),r(40),{layout:"dashboard",middleware:"admin",data:function(){return{columns:[{label:"#",field:"id",type:"number"},{label:"first name",field:"first_name"},{label:"last name",field:"last_name"},{label:"email",field:"email"},{label:"created at",field:"created_at"},{label:"Action",field:"action"}],users:[]}},head:function(){return{title:"Task Customers"}},fetch:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,axios.get("/admin/users").then((function(t){return t.data.users})).catch((function(e){return e.response?400==e.response.status?t.$notify({group:"foo",text:e.response.data.message,type:"error"}):401==e.response.status?t.$refresh():t.$notify({group:"foo",text:e.response.statusText,type:"error"}):t.$notify({group:"foo",text:"No internet access",type:"error"}),[]}));case 2:t.users=e.sent;case 3:case"end":return e.stop()}}),e)})))()},watch:{users:function(t,e){this.users.forEach((function(t,e){t.created_at=moment(t.created_at).format("llll")}))}},methods:{deleteCustomer:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!confirm("Ary you sure ?")){r.next=13;break}return r.prev=2,r.next=5,axios.delete("/admin/users/".concat(t));case 5:n=r.sent,e.$notify({group:"foo",text:n.data.message,type:"success"}),e.users=e.users.filter((function(e){return e.id!=t})),r.next=13;break;case 10:r.prev=10,r.t0=r.catch(2),r.t0.response?400==r.t0.response.status?e.$notify({group:"foo",text:r.t0.response.data.message,type:"error"}):404==r.t0.response.status?(e.users=e.users.filter((function(e){return e.id!=t})),e.$notify({group:"foo",text:r.t0.response.data.message,type:"error"})):401==r.t0.response.status?e.$refresh():e.$notify({group:"foo",text:r.t0.response.statusText,type:"error"}):e.$notify({group:"foo",text:"No internet access",type:"error"});case 13:case"end":return r.stop()}}),r,null,[[2,10]])})))()}}}),c=r(25),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"header bg-primary pb-6"},[r("div",{staticClass:"container-fluid"},[r("div",{staticClass:"header-body"},[r("div",{staticClass:"row align-items-center py-4"},[t._m(0),t._v(" "),r("div",{staticClass:"col-lg-6 col-5 text-right"},[r("nuxt-link",{staticClass:"btn btn-sm btn-neutral text-capitalize",attrs:{to:"/admin/users/create"}},[r("i",{staticClass:"fa fa-plus"}),t._v("\n              create new user\n            ")])],1)])])])]),t._v(" "),r("div",{staticClass:"container-fluid mt--6"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col"},[r("div",{staticClass:"card"},[t._m(1),t._v(" "),r("div",{staticClass:"table-responsive"},[r("vue-good-table",{attrs:{styleClass:"table table-bordered",columns:t.columns,rows:t.users},scopedSlots:t._u([{key:"table-row",fn:function(e){return["action"==e.column.field?r("span",[r("div",{staticClass:"dropdown"},[r("button",{staticClass:"btn btn-primary dropdown-toggle text-capitalize",attrs:{type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[t._v("action")]),t._v(" "),r("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdownMenuButton"}},[r("nuxt-link",{staticClass:"dropdown-item text-capitalize",attrs:{to:"/admin/users/"+e.row.id+"/edit"}},[r("i",{staticClass:"fa fa-edit"}),t._v("\n                        edit\n                      ")]),t._v(" "),r("a",{staticClass:"dropdown-item text-capitalize",attrs:{href:"#"},on:{click:function(r){return r.preventDefault(),t.deleteCustomer(e.row.id)}}},[r("i",{staticClass:"fa fa-trash"}),t._v("\n                        delete\n                      ")])],1)])]):t._e()]}}])})],1)])])])])])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"col-lg-6 col-7"},[r("h6",{staticClass:"h2 text-white d-inline-block mb-0 text-capitalize"},[t._v("users")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"card-header border-0"},[r("h3",{staticClass:"mb-0 text-capitalize"},[t._v("users")])])}],!1,null,null,null);e.default=component.exports}}]);