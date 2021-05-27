(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{411:function(t,e,r){"use strict";r.r(e);var n=r(18),o=(r(41),r(40),{layout:"dashboard",middleware:"admin",head:function(){return{title:"Task Products"}},data:function(){return{products:{data:[]},page:1,columns:[{label:"#",field:"id",type:"number"},{label:"name",field:"name"},{label:"description",field:"description"},{label:"price",field:"price",type:"number"},{label:"created on",field:"created_at"},{label:"action",field:"action"}]}},mounted:function(){var t=this;document.addEventListener("scroll",Object(n.a)(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=$(".table-responsive").height(),!($(document).scrollTop()>=r)){e.next=8;break}if(!(t.page<=t.products.last_page)){e.next=8;break}return e.next=6,t.getProducts(t.page+1);case 6:(n=e.sent).data.length>0&&(t.products.data=t.products.data.concat(n.data));case 8:case"end":return e.stop()}}),e)}))))},fetch:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getProducts();case 2:t.products=e.sent;case 3:case"end":return e.stop()}}),e)})))()},watch:{products:function(t,e){this.products.data.forEach((function(t){t.created_at=moment(t.created_at).format("llll"),t.comission="".concat(t.comission,"%")}))}},methods:{getProducts:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t||(t=1),e.page=t,r.next=4,axios.get("/admin/products?page=".concat(t)).then((function(t){var e;return null!==(e=t.data.products)&&void 0!==e?e:{data:{}}})).catch((function(t){return t.response?400==t.response.status?e.$notify({group:"foo",text:t.response.data.message,type:"error"}):401==t.response.status?e.$refresh():e.$notify({group:"foo",text:t.response.statusText,type:"error"}):e.$notify({group:"foo",text:"No internet access",type:"error"}),{data:[]}}));case 4:return(data=r.sent).last_page<=e.page&&(e.page=data.last_page),r.abrupt("return",data);case 7:case"end":return r.stop()}}),r)})))()},deleteProduct:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!confirm("Are you sure ?")){r.next=13;break}return r.prev=2,r.next=5,axios.delete("/admin/products/".concat(t));case 5:n=r.sent,e.$notify({group:"foo",text:n.data.message,type:"success"}),e.products=e.products.filter((function(e){return e.id!=t})),r.next=13;break;case 10:r.prev=10,r.t0=r.catch(2),r.t0.response?400==r.t0.response.status?e.$notify({group:"foo",text:r.t0.response.data.message,type:"error"}):404==r.t0.response.status?(e.products=e.products.filter((function(e){return e.id!=t})),e.$notify({group:"foo",text:r.t0.response.data.message,type:"error"})):401==r.t0.response.status?e.$refresh():e.$notify({group:"foo",text:r.t0.response.statusText,type:"error"}):e.$notify({group:"foo",text:"No internet access",type:"error"});case 13:case"end":return r.stop()}}),r,null,[[2,10]])})))()}}}),c=r(25),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"header bg-primary pb-6"},[r("div",{staticClass:"container-fluid"},[r("div",{staticClass:"header-body"},[r("div",{staticClass:"row align-items-center py-4"},[t._m(0),t._v(" "),r("div",{staticClass:"col-lg-6 col-5 text-right"},[r("nuxt-link",{staticClass:"btn btn-sm btn-neutral text-capitalize",attrs:{to:"/admin/products/create"}},[r("i",{staticClass:"fa fa-plus"}),t._v("\n              create new product\n            ")])],1)])])])]),t._v(" "),r("div",{staticClass:"container-fluid mt--6"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col"},[r("div",{staticClass:"card"},[t._m(1),t._v(" "),r("div",{staticClass:"table-responsive"},[r("vue-good-table",{attrs:{styleClass:"table align-items-center table-bordered",columns:t.columns,rows:t.products.data},scopedSlots:t._u([{key:"table-row",fn:function(e){return["action"==e.column.field?r("span",[r("div",{staticClass:"dropdown"},[r("button",{staticClass:"btn btn-primary dropdown-toggle text-capitalize",attrs:{type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[t._v("action")]),t._v(" "),r("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdownMenuButton"}},[r("nuxt-link",{staticClass:"dropdown-item text-capitalize",attrs:{to:"/admin/products/"+e.row.id+"/edit"}},[r("i",{staticClass:"fa fa-edit"}),t._v("\n                        edit\n                      ")]),t._v(" "),r("a",{staticClass:"dropdown-item text-capitalize",attrs:{href:"#"},on:{click:function(r){return r.preventDefault(),t.deleteProduct(e.row.id)}}},[r("i",{staticClass:"fa fa-trash"}),t._v("\n                        delete\n                      ")])],1)])]):t._e()]}}])})],1)])])])])])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"col-lg-6 col-7"},[r("h6",{staticClass:"h2 text-white d-inline-block mb-0 text-capitalize"},[t._v("products")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"card-header border-0"},[r("h3",{staticClass:"mb-0 text-capitalize"},[t._v("products")])])}],!1,null,null,null);e.default=component.exports}}]);